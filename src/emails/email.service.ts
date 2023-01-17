import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Email, EmailDocument } from './email.schema';
import { EmailDTO } from './dtos/email-dtos';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('Email')
    private readonly EmailModel: Model<EmailDocument>,
  ) {}

  async addEmail(EmailDTO: EmailDTO): Promise<any> {
    const email = await this.EmailModel.create(EmailDTO);
    return email.save();
  }

  async getSentEmail(email: string): Promise<Email> {
    const myemail = await this.EmailModel.find({ 'from.email': email });

    if (!myemail[0]) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return myemail[0];
    }
  }

  async getMyEmail(email: string): Promise<Email> {
    const myemail = await this.EmailModel.find({ 'to.email': email });

    if (!myemail[0]) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return myemail[0];
    }
  }

  // async findInterview(): Promise<any | undefined> {
  //     const Interview = await this.InterviewModel.find().populate([{
  //         path: 'candidate',
  //         select: 'profileData'

  //     }, {
  //         path: 'interviewer',
  //         select: 'profileData'
  //     }]);
  //     if (!Interview) {
  //         throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
  //     } else {
  //         return Interview;
  //     }
  // }

  // async deleteInterview(id: string): Promise<Interview | undefined> {
  //     const Interview = await this.InterviewModel.findOneAndDelete({ _id: id });
  //     if (!Interview) {
  //         throw new HttpException('Interview Not Found ', HttpStatus.NOT_FOUND);
  //     } else {
  //         return Interview;
  //     }
  // }

  // async findInterviewById(id: string): Promise<any | undefined> {
  //     const Interview = await this.InterviewModel.findById({ _id: id });
  //     if (!Interview) {
  //         throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
  //     } else {
  //         return Interview;
  //     }
  // }

  // async findInterviewByuserid(id: string): Promise<any | undefined> {
  //     const Interview = await this.InterviewModel.find({ $or: [{ candidate: id }, { interviewer: id }] }
  //     );
  //     if (!Interview) {
  //         throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
  //     } else {
  //         return Interview;
  //     }
}
