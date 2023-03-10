import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Cooptation, CooptationDocument } from './Cooptation.schema';

import * as moment from 'moment';
import { CooptationDto } from './CooptationDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CooptationService {
  constructor(
    @InjectModel('cooptation')
    private readonly CooptationModule: Model<CooptationDocument>,
    private readonly userService: UserService,
  ) {}

  async addCooptation(Cooptation: CooptationDto): Promise<any> {
    const score = await this.userService.calculateScoreCoopt(Cooptation.member);
    if (Cooptation.cvs && Cooptation.cvs.length > 0) {
      Cooptation.cvs.map(async (cv) => {
        const newRole = await this.CooptationModule.create({
          ...Cooptation,
          cv: cv,
          description: Cooptation.description,
          trustrate: Cooptation.trustrate,
          currentMemberScore: score,
          data: moment().format('MMMM Do, YYYY, h:mma'),
        });
        newRole.save();
      });
      return Cooptation;
    } else {
      const newRole = await this.CooptationModule.create({
        ...Cooptation,
        trustrate: Cooptation.trustrate,
        currentMemberScore: score,
        data: moment().format('MMMM Do, YYYY, h:mma'),
      });
      return newRole.save();
    }
  }

  async updateCooptation(id: string, Cooptation: CooptationDto): Promise<any> {
    const Cooptations = await this.CooptationModule.findById(id);

    if (Cooptations) {
      await this.CooptationModule.findByIdAndUpdate(Cooptations._id, {
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

  async updateCooptationstatus(id: string, status: string): Promise<any> {
    const Cooptations = await this.CooptationModule.findById(id);

    if (Cooptations) {
      await this.CooptationModule.findByIdAndUpdate(Cooptations._id, {
        data: moment().format('MMMM Do, YYYY, hh:mm a'),
        status: status,
      });

      return Cooptations;
    } else {
      throw new HttpException('Cooptations Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateCooptationTask(id: string, task: string): Promise<any> {
    const Cooptations = await this.CooptationModule.findById(id);

    if (Cooptations) {
      await this.CooptationModule.findByIdAndUpdate(Cooptations._id, {
        data: moment().format('MMMM Do, YYYY, hh:mm a'),
        currentTask: task,
      });

      return Cooptations;
    } else {
      throw new HttpException('Cooptations Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async deleteCooptation(id: string): Promise<any> {
    const Cooptations = await this.CooptationModule.findOneAndDelete({
      _id: id,
    });
    if (!Cooptations) {
      throw new HttpException('Cooptations Not Found', HttpStatus.NOT_FOUND);
    } else {
      return Cooptations;
    }
  }

  async findCooptation(): Promise<Cooptation[] | undefined> {
    const Cooptations = await this.CooptationModule.find().populate([
      {
        path: 'member',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.TJM',
        ],
      },
      {
        path: 'candidat',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.role',
          'profileData.TJM',
        ],
      },
      {
        path: 'offer',
      },
      ,
      {
        path: 'cvtech',
      },
    ]);
    if (!Cooptations) {
      throw new HttpException('No Cooptations is Found ', HttpStatus.NOT_FOUND);
    } else {
      return Cooptations;
    }
  }

  async findCooptationByUserId(id: string): Promise<Cooptation[] | undefined> {
    const Cooptations = await this.CooptationModule.find({
      member: id,
    }).populate([
      {
        path: 'member',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.TJM',
        ],
      },
      {
        path: 'candidat',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.role',
          'profileData.TJM',
        ],
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
  async findCooptationById(id: string): Promise<Cooptation | undefined> {
    const Cooptations = await this.CooptationModule.findOne({
      _id: id,
    }).populate([
      {
        path: 'member',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.TJM',
        ],
      },
      {
        path: 'candidat',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.role',
          'profileData.TJM',
        ],
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

  async findCooptationByCooptedId(id: string): Promise<Cooptation | undefined> {
    const Cooptations = await this.CooptationModule.find({
      candidat: id,
      status: 'done',
    }).populate([
      {
        path: 'member',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.TJM',
        ],
      },
      {
        path: 'candidat',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.role',
          'profileData.TJM',
        ],
      },
      {
        path: 'offer',
      },
      {
        path: 'cvtech',
      },
    ]);
    if (!Cooptations) {
      throw new HttpException(
        'No Cooptations Done is Found for this User ',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return Cooptations[0];
    }
  }
}
