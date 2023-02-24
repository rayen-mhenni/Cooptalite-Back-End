import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNil } from 'lodash';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Personalclander, PersonalcalanderDocument } from './personalcalander.schema';
import { event, calendarDTO } from './dtos/personalcalander.dto';

@Injectable()
export class PersonalcalanderService {
  constructor(
    @InjectModel('Personalcalander')
    private readonly personalcalanderModule: Model<PersonalcalanderDocument>,
  ) {}

  async addPersonalcalander(calendarDTO: calendarDTO): Promise<any> {
    const { date, userId } = calendarDTO;
    const calander = await this.personalcalanderModule.findOne({
      userId: userId,
      date: date,
    });
    if (!calander) {
      const newcalander = await this.personalcalanderModule.create({
        ...calendarDTO,
        date: String(moment().format('YYYY-MM')),
       
      });
      return newcalander.save();
    } else {
      const newcalander = await this.personalcalanderModule.findByIdAndUpdate(calander._id, {
        userId: calendarDTO.userId ?? calander.userId,
        date: calendarDTO.date ?? calander.date,
        listOfActivity: calendarDTO.listOfActivity ?? calander.listOfActivity,
      });
      return newcalander;
    }}
    async updatepersonalcalander(id: string, calendarDTO: calendarDTO): Promise<any> {
        let calander = await this.personalcalanderModule.findById(id);
    
        if (calander) {
            calander = await this.personalcalanderModule.findByIdAndUpdate(calander._id, {
            userId: calendarDTO.userId ?? calander.userId,
            date: calendarDTO.date ?? calander.date,
            listOfActivity: calendarDTO.listOfActivity ?? calander.listOfActivity,
          });
    
          return calander;
        } else {
          throw new HttpException('calander Not exist', HttpStatus.NOT_FOUND);
        }
      }
    
      async findCalendarByUserId(userId: string): Promise<any | undefined> {
        const calander = await this.personalcalanderModule.findOne({
          userId: userId,
          date: String(moment().format('YYYY-MM')),
        });
    
        if (!calander) {
          throw new HttpException('CRA Not Found ', HttpStatus.NOT_FOUND);
        } else {
          return calander;
        }
      }
    
      async findAllcalander(): Promise<any | undefined> {
        const calander = await this.personalcalanderModule.find().populate({
          path: 'userId',
          model: 'User',
          select: ['profileData.header', 'profileData.userAbout'],
        });
        if (!calander) {
          throw new HttpException('No calander is Found ', HttpStatus.NOT_FOUND);
        } else {
          return calander;
        }
      }
    
      async deletecalander(id: string): Promise<any | undefined> {
        const calander = await this.personalcalanderModule.findOneAndDelete({ _id: id });
        if (!calander) {
          throw new HttpException('CRA Not Found ', HttpStatus.NOT_FOUND);
        } else {
          return calander;
        }
      }
  }