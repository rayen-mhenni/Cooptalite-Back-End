import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Interview, InterviewDocument } from './interview.schema';
import { CreateInterviewDTO } from './dtos/interview-dtos';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class InterviewService {
    constructor(
        @InjectModel('Interview')
        private readonly InterviewModel: Model<InterviewDocument>,

    ) { }



    async addInterview(createInterviewDTO: CreateInterviewDTO): Promise<any> {
        const OldOffer = await this.InterviewModel.findOne({
            title: createInterviewDTO.title,
            description: createInterviewDTO.description,
            linkedUsers: createInterviewDTO.linkedUsers,
            heureInterview: createInterviewDTO.heureInterview,
            dateInterview: createInterviewDTO.dateInterview,
            status: createInterviewDTO.status,


        });

        if (!OldOffer) {
            const newUser = await this.InterviewModel.create(createInterviewDTO);

            return newUser.save();
        } else {
            throw new HttpException('Interview already exist', HttpStatus.BAD_REQUEST);
        }
    }

  
    
  
    async findInterview(): Promise<any | undefined> {
        const Offer = await this.InterviewModel.find();
        if (!Interview) {
            throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
        } else {
            return Interview;
        }
    }
   



}