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
      lastname: createCvtechDTO.lastname,
      cvname: createCvtechDTO.cvname,
    });

    if (!OldCvtech) {
      const newUser = await this.CvtechModule.create({
        ...createCvtechDTO,
        status: 'INIT',
      });

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
    const dataBuffer = fs.readFileSync('./src/uploads/' + cvname);
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
        { value: 'skills', key: 'COMPETENCES' },
        { value: 'profile', key: 'PROFILE' },
        { value: 'profile', key: 'SUMMARY' },
        { value: 'profile', key: 'PROFIL' },
        { value: 'experience', key: 'PROFESSIONAL' },
        { value: 'experience', key: 'NALEXPERIENCE' }, //do not change !
        { value: 'experience', key: 'CAREER' },
        { value: 'experience', key: 'NALEXPERIENCES' }, //do not change !
        { value: 'experience', key: 'PROFESSIONNELLE' },
        { value: 'education', key: 'EDUCATION' },
        { value: 'education', key: 'EDUCATION' },
        { value: 'education', key: 'ACADEMIQUE' },
        { value: 'certificates', key: 'CERTIFICATES' },
        { value: 'certificates', key: 'CERTIFICATS' },
        { value: 'languages', key: 'LANGUAGES' },
        { value: 'languages', key: 'LANGUES' },
      ];
      const obj: any = {};
      let i = 0;
      while (i < lines.length) {
        const line = _.upperCase(_.camelCase(_.deburr(lines[i])));
        if (!isEmpty(line) && !isNil(line)) {
          if (!isNil(extractEmails(lines[i]))) {
            Object.assign(obj, { email: extractEmails(lines[i])[0] });
          }
          if (!isNil(extractPhone(lines[i]))) {
            Object.assign(obj, { phone: extractPhone(lines[i])[0] });
          }
          /* *************************************V1 was searching by first word *********************************** */
          // const array = line.split(' ');
          // const firstWord = _.upperCase(
          //   _.camelCase(_.deburr(line.split(' ')[0])),
          // ); //enhancement => we ca map the line to search for keyWord
          /* *************************************V1 was searching by first word *********************************** */

          const res = keyWord.find((el) => line.includes(el.key));
          //Checkk if that line is a start of section
          if (res && !Object.keys(obj).find((key) => key === res.value)) {
            //start taking line by line until last line (another section appear)
            let j = i + 1;
            let data = '';
            if (lines[i].split(' ').length > 2) {
              lines[i]
                .split(' ')
                .slice(2, lines[i].split(' ').length)
                .forEach((word) => {
                  data = data + word + ' ';
                });
            } else {
              data = '';
            }
            while (j < lines.length) {
              const linej = lines[j];
              /* *************************************V1 was searching by first word *********************************** */

              // const firstWordj = _.upperCase(
              //   _.camelCase(_.deburr(linej.split(' ')[0])),
              // ); //enhancement => we ca map the line to search for keyWord
              /* *************************************V1 was searching by first word *********************************** */

              const resj = keyWord.find((el) => linej.includes(el.key));

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
      const nameKey = obj.email?.slice(
        1,
        obj.email?.indexOf('@') - 2 < 3 ? obj.email?.indexOf('@') - 2 : 3,
      );
      const nameLine = lines.find((ln) =>
        _.upperCase(_.camelCase(_.deburr(ln))).includes(
          _.upperCase(_.camelCase(_.deburr(nameKey))),
        ),
      );
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
