import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cvteck, CvteckDocument } from './cvteck.schema';
import { CreateCvteckDTO } from './dtos/cvteck-dtos';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';


@Injectable()
export class CvteckService {
    constructor(
        @InjectModel('Cvteck')
        private readonly CvteckModule: Model<CvteckDocument>,
    ) { }

    async addCvteck(createCvteckDTO: CreateCvteckDTO): Promise<any> {
        const OldCvteck = await this.CvteckModule.findOne({
            firstname: createCvteckDTO.firstname,
            lasname: createCvteckDTO.lastname,
            email: createCvteckDTO.email,
            linkedin: createCvteckDTO.linkedin,
            phonenum: createCvteckDTO.phonenum,

            skills: createCvteckDTO.skills,
            experience: createCvteckDTO.experience,
            education: createCvteckDTO.education,
            languages: createCvteckDTO.languages,
            status: createCvteckDTO.status,
            categorie: createCvteckDTO.categorie,
            cvname: createCvteckDTO.cvname,
            imgUrl: createCvteckDTO.imgUrl,


        });

        if (!OldCvteck) {
            const newUser = await this.CvteckModule.create(createCvteckDTO);

            return newUser.save();
        } else {
            throw new HttpException('CVteck already exist', HttpStatus.BAD_REQUEST);
        }
    }

    async updateCvteck(id: string, CreateCvteckDTO: CreateCvteckDTO): Promise<any> {
        const Cvteck = await this.CvteckModule.findById(id);

        if (Cvteck) {
            const newCvteck = await this.CvteckModule.findByIdAndUpdate(Cvteck._id, {
                firstname: CreateCvteckDTO.firstname || Cvteck.firstname,
                lastname: CreateCvteckDTO.lastname || Cvteck.lastname,
                email: CreateCvteckDTO.email || Cvteck.email,
                linkedin: CreateCvteckDTO.linkedin || Cvteck.linkedin,
                phonenum: CreateCvteckDTO.phonenum || Cvteck.phonenum,
                skills: CreateCvteckDTO.skills || Cvteck.skills,

                experience: CreateCvteckDTO.experience || Cvteck.experience,
                education: CreateCvteckDTO.education || Cvteck.education,
                languages: CreateCvteckDTO.languages || Cvteck.languages,
                status: CreateCvteckDTO.status || Cvteck.status,
                categorie: CreateCvteckDTO.categorie || Cvteck.categorie,
                cvname: CreateCvteckDTO.cvname || Cvteck.cvname,
                imgUrl: CreateCvteckDTO.imgUrl || Cvteck.imgUrl,

            });

            return newCvteck;
        } else {
            throw new HttpException('Cvteck Not exist', HttpStatus.NOT_FOUND);
        }
    }
    async deleteCvteck(id: string): Promise<Cvteck | undefined> {
        const Cvteck = await this.CvteckModule.findOneAndDelete({ _id: id });
        if (!Cvteck) {
            throw new HttpException('Cvteck Not Found ', HttpStatus.NOT_FOUND);
        } else {
            return Cvteck;
        }
    }
    async findCvteck(): Promise<any | undefined> {
        const Cvteck = await this.CvteckModule.find();
        if (!Cvteck) {
            throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
        } else {
            return Cvteck;
        }
    }
    async findCvteckById(id: string): Promise<any | undefined> {
        const Cvteck = await this.CvteckModule.findById({ _id: id });
        if (!Cvteck) {
            throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
        } else {
            return Cvteck;
        }
    }
    async updateCvteckstatus(id: string, status: string): Promise<any> {
        let Cvteck = await this.CvteckModule.findById(id);

        if (Cvteck) {
            Cvteck = await this.CvteckModule.findByIdAndUpdate(Cvteck._id, {
                status: status || Cvteck.status,
            });

            return Cvteck;
        } else {
            throw new HttpException('Cv Not exist', HttpStatus.NOT_FOUND);
        }
    }
}