import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cvtech, CvtechDocument } from './cvtech.schema';
import { CreateCvtechDTO } from './dtos/cvtech-dtos';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as fs from 'fs';
import * as pdf from 'pdf-parse';
import { isEmpty, isNil } from 'lodash';
import * as _ from 'lodash';

@Injectable()
export class CvtechService {
  constructor(
    @InjectModel('Cvtech')
    private readonly CvtechModule: Model<CvtechDocument>,
  ) {}

  async addCvtech(createCvtechDTO: CreateCvtechDTO): Promise<any> {
    const OldCvtech = await this.CvtechModule.findOne({
      firstname: createCvtechDTO.firstname,
      lasname: createCvtechDTO.lastname,
      profile: createCvtechDTO.profile,
      email: createCvtechDTO.email,
      media: createCvtechDTO.media,
      phone: createCvtechDTO.phone,
      post: createCvtechDTO.post,
      skills: createCvtechDTO.skills,
      experience: createCvtechDTO.experience,
      education: createCvtechDTO.education,
      languages: createCvtechDTO.languages,
      status: createCvtechDTO.status,
      categorie: createCvtechDTO.categorie,
      cvname: createCvtechDTO.cvname,
      imgUrl: createCvtechDTO.imgUrl,
      certificates: createCvtechDTO.certificates,
    });

    if (!OldCvtech) {
      const newUser = await this.CvtechModule.create(createCvtechDTO);

      return newUser.save();
    } else {
      throw new HttpException('CVtech already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async updateCvtech(
    id: string,
    CreateCvtechDTO: CreateCvtechDTO,
  ): Promise<any> {
    const Cvtech = await this.CvtechModule.findById(id);

    if (Cvtech) {
      const newCvtech = await this.CvtechModule.findByIdAndUpdate(Cvtech._id, {
        firstname: CreateCvtechDTO.firstname || Cvtech.firstname,
        lastname: CreateCvtechDTO.lastname || Cvtech.lastname,
        email: CreateCvtechDTO.email || Cvtech.email,
        media: CreateCvtechDTO.media || Cvtech.media,
        phone: CreateCvtechDTO.phone || Cvtech.phone,
        skills: CreateCvtechDTO.skills || Cvtech.skills,
        post: CreateCvtechDTO.post || Cvtech.post,
        experience: CreateCvtechDTO.experience || Cvtech.experience,
        education: CreateCvtechDTO.education || Cvtech.education,
        languages: CreateCvtechDTO.languages || Cvtech.languages,
        status: CreateCvtechDTO.status || Cvtech.status,
        categorie: CreateCvtechDTO.categorie || Cvtech.categorie,
        cvname: CreateCvtechDTO.cvname || Cvtech.cvname,
        imgUrl: CreateCvtechDTO.imgUrl || Cvtech.imgUrl,
        profile: CreateCvtechDTO.profile || Cvtech.profile,
        certificates: CreateCvtechDTO.certificates || Cvtech.certificates,
      });

      return newCvtech;
    } else {
      throw new HttpException('Cvtech Not exist', HttpStatus.NOT_FOUND);
    }
  }
  async deleteCvtech(id: string): Promise<Cvtech | undefined> {
    const Cvtech = await this.CvtechModule.findOneAndDelete({ _id: id });
    if (!Cvtech) {
      throw new HttpException('Cvtech Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Cvtech;
    }
  }
  async findCvtech(): Promise<any | undefined> {
    const Cvtech = await this.CvtechModule.find();
    if (!Cvtech) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Cvtech;
    }
  }
  async findCvtechById(id: string): Promise<any | undefined> {
    const Cvtech = await this.CvtechModule.findById({ _id: id });
    if (!Cvtech) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Cvtech;
    }
  }
  async getCVData(cvname: string): Promise<any | undefined> {
    const dataBuffer = fs.readFileSync('./src/uploads/' + cvname + '.pdf');
    const extractEmails = (text: string) => {
      return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    };
    const extractPhone = (text: string) => {
      return text.match(/(\d+){7,13}/);
    };
    return pdf(dataBuffer).then(function (data) {
      const lines = data.text.split('\n');

      const keyWord = [
        { value: 'skills', key: 'SKILLS' },
        { value: 'skills', key: 'SKILL' },
        { value: 'skills', key: 'COMPETENCE' },
        { value: 'profile', key: 'PROFILE' },
        { value: 'profile', key: 'SUMMARY' },
        { value: 'profile', key: 'PROFIL' },
        { value: 'experience', key: 'PROFESSIONAL' },
        { value: 'experience', key: 'EXPERIENCE' },
        { value: 'experience', key: 'EXPÉRIENCE' },
        { value: 'experience', key: 'PROFESSIONNELLE' },
        { value: 'education', key: 'EDUCATION' },
        { value: 'education', key: 'ÉDUCATION' },
        { value: 'certificates', key: 'CERTIFICATES' },
        { value: 'certificates', key: 'CERTIFICATS' },
        { value: 'languages', key: 'LANGUAGES' },
        { value: 'languages', key: 'LANGUES' },
      ];
      const obj: any = {};
      let i = 0;
      while (i < lines.length) {
        const line = lines[i];
        if (!isEmpty(line) && !isNil(line)) {
          if (!isNil(extractEmails(line))) {
            Object.assign(obj, { email: extractEmails(line)[0] });
          }
          if (!isNil(extractPhone(line))) {
            Object.assign(obj, { phone: extractPhone(line)[0] });
          }

          // const array = line.split(' ');
          const firstWord = line.split(' ')[0]; //enhancement => we ca map the line to search for keyWord

          const res = keyWord.find((el) => el.key == _.upperCase(firstWord));
          if (res && !Object.keys(obj).find((key) => key === res.value)) {
            let j = i + 1;
            let data = '';
            while (j < lines.length) {
              const linej = lines[j];
              const firstWordj = linej.split(' ')[0]; //enhancement => we ca map the line to search for keyWord
              const resj = keyWord.find(
                (el) => el.key == _.upperCase(firstWordj),
              );
              if (resj) break;
              else {
                j = j + 1;
                data = data + linej;
              }
            }

            Object.assign(obj, { [res.value]: data });
          }
          i++;
        } else i++;
      }
      const nameKey = obj.email?.slice(2, obj.email?.indexOf('@'));
      const nameLine = lines.find((ln) => ln.includes(nameKey));
      nameLine.split(' ').forEach((el) => {
        if (/^[a-zA-Z]+$/.test(el) && isNil(obj.firstname))
          Object.assign(obj, { firstname: el });
        else if (/^[a-zA-Z]+$/.test(el) && isNil(obj.lastname)) {
          Object.assign(obj, { lastname: el });
        }
      });
      const media: any = [];
      lines.forEach((ln) => {
        if (
          !isEmpty(
            ln.match(
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            ),
          ) &&
          !isNil(ln)
        ) {
          media.push(
            ln.match(
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            )[0],
          );
        }
      });

      Object.assign(obj, { media });
      return obj;
    });
  }
  async updateCvtechstatus(id: string, status: string): Promise<any> {
    let Cvtech = await this.CvtechModule.findById(id);

    if (Cvtech) {
      Cvtech = await this.CvtechModule.findByIdAndUpdate(Cvtech._id, {
        status: status || Cvtech.status,
      });

      return Cvtech;
    } else {
      throw new HttpException('Cv Not exist', HttpStatus.NOT_FOUND);
    }
  }
}
