import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Cooptation, CooptationDocument } from './cooptation.schema';

import moment from 'moment';
import { CooptationDto } from './CooptationDto';

@Injectable()
export class cooptationService {
  constructor(
    @InjectModel('cooptation')
    private readonly cooptationModule: Model<CooptationDocument>,
  ) {}

  async addCooptation(Cooptation: CooptationDto): Promise<any> {
    const newRole = await this.cooptationModule.create({
      ...Cooptation,
      data: moment().format('MMMM Do, YYYY, h:mma'),
    });
    return newRole.save();
  }

  async updateCooptation(id: string, Cooptation: CooptationDto): Promise<any> {
    const Cooptations = await this.cooptationModule.findById(id);

    if (Cooptations) {
      await this.cooptationModule.findByIdAndUpdate(Cooptations._id, {
        data: moment().format('MMMM Do, YYYY, h:mma'),
        cvs: Cooptation.cvs,
        type: Cooptation.type,
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
    const Cooptations = await this.cooptationModule.find();
    {
    }
    if (!Cooptations) {
      throw new HttpException('No Cooptations is Found ', HttpStatus.NOT_FOUND);
    } else {
      return Cooptations;
    }
  }
}
