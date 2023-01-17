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
  ) { }

  async addEmail(EmailDTO: EmailDTO): Promise<any> {
    const email = await this.EmailModel.create(EmailDTO);
    return email.save();
  }

  async getSentEmail(email: string): Promise<Email> {
    const myemail = await this.EmailModel.find({ 'from.email': email }).populate([{
      path: 'replies', strictPopulate: false,
    }]);

    if (!myemail[0]) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return myemail[0];
    }
  }

  async getMyEmail(email: string): Promise<Email> {
    const myemail = await this.EmailModel.find({ 'to.email': email }).populate([{
      path: 'replies', strictPopulate: false,
    }]);

    if (!myemail[0]) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return myemail[0];
    }
  }

  async updateEmail(id: string, EmailDTO: EmailDTO): Promise<Email> {
    const email = await this.EmailModel.findByIdAndUpdate(id, { ...EmailDTO });

    if (!email) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }


  async updateEmailLabel(id: string, label: string[]): Promise<Email> {
    const email = await this.EmailModel.findByIdAndUpdate(id, { label: label });

    if (!email) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }


  async getEmail(id: string): Promise<Email> {
    const email = await this.EmailModel.findById(id).populate([{
      path: 'replies', strictPopulate: false,
    }]);

    if (!email) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }

  async getAllEmail(): Promise<Email[]> {
    const email = await this.EmailModel.find().populate([{
      path: 'replies', strictPopulate: false,
    }]);

    if (!email) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }


  async deleteEmail(id: string): Promise<Email | undefined> {
    const email = await this.EmailModel.findOneAndDelete({ _id: id });
    if (!email) {
      throw new HttpException('Interview Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }



}
