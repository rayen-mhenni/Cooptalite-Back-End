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
  ) {}

  async addInterview(createInterviewDTO: CreateInterviewDTO): Promise<any> {
    const ancienInterview = await this.InterviewModel.findOne({
      title: createInterviewDTO.title,
      description: createInterviewDTO.description,
      candidate: createInterviewDTO.candidate,
      interviewer: createInterviewDTO.interviewer,
      heureInterview: createInterviewDTO.heureInterview,
      dateInterview: createInterviewDTO.dateInterview,
      status: createInterviewDTO.status,
    });

    if (!ancienInterview) {
      const newInterview = await this.InterviewModel.create(createInterviewDTO);

      return newInterview.save();
    } else {
      throw new HttpException(
        'Interview already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //kifech tjib attribut mn type object lna user comme exemple
  async findInterview(): Promise<any | undefined> {
    const Interview = await this.InterviewModel.find().populate([
      {
        path: 'candidate',
        select: 'profileData',
      },
      {
        path: 'interviewer',
        select: 'profileData',
      },
    ]);
    if (!Interview) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Interview;
    }
  }

  async updateInterview(
    id: string,
    createInterviewDTO: CreateInterviewDTO,
  ): Promise<any> {
    const Interview = await this.InterviewModel.findById(id);

    if (Interview) {
      const newInterview = await this.InterviewModel.findByIdAndUpdate(
        Interview._id,
        {
          title: createInterviewDTO.title || Interview.title,
          description: createInterviewDTO.description || Interview.description,
          candidate: createInterviewDTO.candidate || Interview.candidate,
          interviewer: createInterviewDTO.interviewer || Interview.interviewer,
          heureInterview:
            createInterviewDTO.heureInterview || Interview.heureInterview,
          dateInterview:
            createInterviewDTO.dateInterview || Interview.dateInterview,
          status: createInterviewDTO.status || Interview.status,
        },
      );

      return newInterview;
    } else {
      throw new HttpException('Interview Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async deleteInterview(id: string): Promise<Interview | undefined> {
    const Interview = await this.InterviewModel.findOneAndDelete({ _id: id });
    if (!Interview) {
      throw new HttpException('Interview Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Interview;
    }
  }

  async findInterviewById(id: string): Promise<any | undefined> {
    const Interview = await this.InterviewModel.findById({ _id: id });
    if (!Interview) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Interview;
    }
  }

  async findInterviewByuserid(id: string): Promise<any | undefined> {
    const Interview = await this.InterviewModel.find({
      $or: [{ candidate: id }, { interviewer: id }],
    });
    if (!Interview) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Interview;
    }
  }
}
