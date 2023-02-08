import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNil } from 'lodash';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';
import { CommentsService } from 'src/comments/comments.service';
import { User } from 'src/user/user.schema';
import { cra, craDocument } from './cra.schema';
import { activity, craDTO } from './dtos/craDTO';

@Injectable()
export class CRAService {
  constructor(
    @InjectModel('CRA')
    private readonly craModule: Model<craDocument>,
  ) {}

  async addcra(craDTO: craDTO): Promise<any> {
    const { date, userId } = craDTO;
    const cra = await this.craModule.findOne({
      userId: userId,
      date: date,
    });
    if (!cra) {
      const newCRA = await this.craModule.create({
        ...craDTO,
        date: String(moment().format('YYYY-MM')),
        status: 'WACT',
      });
      return newCRA.save();
    } else {
      const newCRA = await this.craModule.findByIdAndUpdate(cra._id, {
        status: craDTO.status ?? cra.status,
        userId: craDTO.userId ?? cra.userId,
        date: craDTO.date ?? cra.date,
        listOfActivity: craDTO.listOfActivity ?? cra.listOfActivity,
      });
      return newCRA;
    }
  }

  async updatecrastatus(id: string, status: string): Promise<any> {
    let cra = await this.craModule.findById(id);

    if (cra) {
      cra = await this.craModule.findByIdAndUpdate(cra._id, {
        status: status || cra.status,
      });

      return cra;
    } else {
      throw new HttpException('CRA Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updatecra(id: string, craDTO: craDTO): Promise<any> {
    let cra = await this.craModule.findById(id);

    if (cra) {
      cra = await this.craModule.findByIdAndUpdate(cra._id, {
        status: craDTO.status ?? cra.status,
        userId: craDTO.userId ?? cra.userId,
        date: craDTO.date ?? cra.date,
        listOfActivity: craDTO.listOfActivity ?? cra.listOfActivity,
      });

      return cra;
    } else {
      throw new HttpException('CRA Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async findCRAByUserId(userId: string): Promise<cra | undefined> {
    const cra = await this.craModule.findOne({
      userId: userId,
      date: String(moment().format('YYYY-MM')),
    });

    if (!cra) {
      throw new HttpException('CRA Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return cra;
    }
  }

  async findAllCRA(): Promise<cra[] | undefined> {
    const cra = await this.craModule.find().populate({
      path: 'userId',
      model: 'User',
      select: 'profileData.header',
    });
    if (!cra) {
      throw new HttpException('No CRA is Found ', HttpStatus.NOT_FOUND);
    } else {
      return cra;
    }
  }

  async deleteCRA(id: string): Promise<cra | undefined> {
    const cra = await this.craModule.findOneAndDelete({ _id: id });
    if (!cra) {
      throw new HttpException('CRA Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return cra;
    }
  }
}
