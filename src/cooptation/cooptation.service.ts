import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Cooptation, CooptationDocument } from './cooptation.schema';

import * as moment from 'moment';
import { CooptationDto } from './CooptationDto';

@Injectable()
export class cooptationService {
  constructor(
    @InjectModel('cooptation')
    private readonly cooptationModule: Model<CooptationDocument>,
  ) {}

  async addCooptation(Cooptation: CooptationDto): Promise<any> {
    if (Cooptation.cvs && Cooptation.cvs.length > 0) {
      Cooptation.cvs.map(async (cv) => {
        const newRole = await this.cooptationModule.create({
          ...Cooptation,
          cv: cv.name,
          trustrate: cv.trustrate,
          currentMemberScore: cv.currentMemberScore,
          data: moment().format('MMMM Do, YYYY, hh:mm a'),
        });
        newRole.save();
      });
    } else {
      const newRole = await this.cooptationModule.create({
        ...Cooptation,
        data: moment().format('MMMM Do, YYYY, hh:mm a'),
      });
      newRole.save();
    }

    return Cooptation;
  }

  async updateCooptation(id: string, Cooptation: CooptationDto): Promise<any> {
    const Cooptations = await this.cooptationModule.findById(id);

    if (Cooptations) {
      await this.cooptationModule.findByIdAndUpdate(Cooptations._id, {
        data: moment().format('MMMM Do, YYYY, hh:mm a'),
        type: Cooptation.type,
        trustrate: Cooptation.trustrate,
        currentMemberScore: Cooptation.currentMemberScore,
      });

      return Cooptations;
    } else {
      throw new HttpException('Cooptations Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async deleteCooptation(id: string): Promise<any> {
    const Cooptations = await this.cooptationModule.findOneAndDelete({
      _id: id,
    });
    if (!Cooptations) {
      throw new HttpException('Cooptations Not Found', HttpStatus.NOT_FOUND);
    } else {
      return Cooptations;
    }
  }

  async findCooptation(): Promise<Cooptation[] | undefined> {
    const Cooptations = await this.cooptationModule.find().populate([
      {
        path: 'member',
        select: ['profileData.header', 'profileData.userAbout'],
      },
      {
        path: 'candidat',
        select: ['profileData.header', 'profileData.userAbout'],
      },
      {
        path: 'offer',
      },
    ]);
    if (!Cooptations) {
      throw new HttpException('No Cooptations is Found ', HttpStatus.NOT_FOUND);
    } else {
      return Cooptations;
    }
  }
}
