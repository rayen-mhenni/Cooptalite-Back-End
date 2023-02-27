import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Cooptation, CooptationDocument } from './cooptation.schema';

import * as moment from 'moment';
import { CooptationDto } from './CooptationDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class cooptationService {
  constructor(
    @InjectModel('cooptation')
    private readonly cooptationModule: Model<CooptationDocument>,
    private readonly userService: UserService,
  ) {}

  async addCooptation(Cooptation: CooptationDto): Promise<any> {
    const score = await this.userService.calculateScoreCoopt(Cooptation.member);
    if (Cooptation.cvs && Cooptation.cvs.length > 0) {
      Cooptation.cvs.map(async (cv) => {
        const newRole = await this.cooptationModule.create({
          ...Cooptation,
          cv: cv,
          trustrate: Cooptation.trustrate,
          currentMemberScore: score,
          data: moment().format('MMMM Do, YYYY, h:mma'),
        });
        newRole.save();
      });
      return Cooptation;
    } else {
      const newRole = await this.cooptationModule.create({
        ...Cooptation,
        trustrate: Cooptation.trustrate,
        currentMemberScore: score,
        data: moment().format('MMMM Do, YYYY, h:mma'),
      });
      return newRole.save();
    }
  }

  async updateCooptation(id: string, Cooptation: CooptationDto): Promise<any> {
    const Cooptations = await this.cooptationModule.findById(id);

    if (Cooptations) {
      await this.cooptationModule.findByIdAndUpdate(Cooptations._id, {
        data: moment().format('MMMM Do, YYYY, hh:mm a'),
        cvtech: Cooptation.cvtech || Cooptations.cvtech,
        trustrate: Cooptation.trustrate || Cooptations.trustrate,
        currentMemberScore: Cooptation.currentMemberScore,
      });

      return Cooptations;
    } else {
      throw new HttpException('Cooptations Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateCooptationTask(id: string, task: string): Promise<any> {
    const Cooptations = await this.cooptationModule.findById(id);

    if (Cooptations) {
      await this.cooptationModule.findByIdAndUpdate(Cooptations._id, {
        data: moment().format('MMMM Do, YYYY, hh:mm a'),
        currentTask: task,
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

  async findCooptationByUserId(id: string): Promise<Cooptation[] | undefined> {
    const Cooptations = await this.cooptationModule
      .find({
        member: id,
      })
      .populate([
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
