import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cvtech, CvtechDocument } from './cvtech.schema';
import { CreateCvtechDTO } from './dtos/cvtech-dtos';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as fs from 'fs';
import * as pdf from 'pdf-parse';
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
      email: createCvtechDTO.email,
      linkedin: createCvtechDTO.linkedin,
      phonenum: createCvtechDTO.phonenum,
      post: createCvtechDTO.post,
      skills: createCvtechDTO.skills,
      experience: createCvtechDTO.experience,
      education: createCvtechDTO.education,
      languages: createCvtechDTO.languages,
      status: createCvtechDTO.status,
      categorie: createCvtechDTO.categorie,
      cvname: createCvtechDTO.cvname,
      imgUrl: createCvtechDTO.imgUrl,
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
        linkedin: CreateCvtechDTO.linkedin || Cvtech.linkedin,
        phonenum: CreateCvtechDTO.phonenum || Cvtech.phonenum,
        skills: CreateCvtechDTO.skills || Cvtech.skills,
        post: CreateCvtechDTO.post || Cvtech.post,
        experience: CreateCvtechDTO.experience || Cvtech.experience,
        education: CreateCvtechDTO.education || Cvtech.education,
        languages: CreateCvtechDTO.languages || Cvtech.languages,
        status: CreateCvtechDTO.status || Cvtech.status,
        categorie: CreateCvtechDTO.categorie || Cvtech.categorie,
        cvname: CreateCvtechDTO.cvname || Cvtech.cvname,
        imgUrl: CreateCvtechDTO.imgUrl || Cvtech.imgUrl,
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

    pdf(dataBuffer).then(function (data) {
      // number of pages
      console.log(data.numpages);
      // number of rendered pages
      console.log(data.numrender);
      // PDF info
      console.log(data.info);
      // PDF metadata
      console.log(data.metadata);
      // PDF.js version
      // check https://mozilla.github.io/pdf.js/getting_started/
      console.log(data.version);
      // PDF text
      console.log(data.text);
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
