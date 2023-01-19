import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Email, EmailDocument } from './email.schema';
import { EmailDTO } from './dtos/email-dtos';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ConfigemailDocument } from './Configemail.schema';
import { EmailConfigDTO } from './dtos/Configemail-dtos';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('Email')
    private readonly EmailModel: Model<EmailDocument>,
    @InjectModel('Configemail')
    private readonly ConfigemailModel: Model<ConfigemailDocument>,
  ) {}

  async addEmail(EmailDTO: EmailDTO): Promise<any> {
    const email = await this.EmailModel.create(EmailDTO);
    return email.save();
  }

  async getSentEmail(email: string): Promise<Email> {
    const myemail = await this.EmailModel.find({
      'from.email': email,
    }).populate([
      {
        path: 'replies',
        strictPopulate: false,
      },
    ]);

    if (!myemail[0]) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return myemail[0];
    }
  }

  async getMyEmail(email: string): Promise<Email> {
    const myemail = await this.EmailModel.find({ 'to.email': email }).populate([
      {
        path: 'replies',
        strictPopulate: false,
      },
    ]);

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

  async updateEmailAddReplay(id: string, EmailDTO: EmailDTO): Promise<any> {
    const newReplayMail = await this.EmailModel.create(EmailDTO);

    if (newReplayMail) {
      const email = await this.EmailModel.findById(id);
      if (email) {
        const replay = email?.replies;
        replay.push(newReplayMail?._id);
        email.replies = replay;
        email.save();
      }
    } else {
      throw new HttpException(
        'EmailReplay can not be created ',
        HttpStatus.BAD_REQUEST,
      );
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

  async updateEmailsLabel(ids: any, labeltoadd: string): Promise<any> {
    ids?.emailIds.map(async (id: any) => {
      const email = await this.EmailModel.findById(id);
      const labelIndex = email.labels.indexOf(labeltoadd);
      if (labelIndex === -1) email.labels.push(labeltoadd);
      else email.labels.splice(labelIndex, 1);
      email.save();
    });

    if (!ids) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return ids;
    }
  }

  async updateEmailsStatus(ids: any): Promise<any> {
    ids?.emailIds.map(async (id: any) => {
      const email = await this.EmailModel.findByIdAndUpdate(id, {
        isRead: true,
      });
    });

    if (!ids) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return ids;
    }
  }

  async getEmail(id: string): Promise<Email> {
    const email = await this.EmailModel.findById(id).populate([
      {
        path: 'replies',
        strictPopulate: false,
      },
    ]);

    if (!email) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }

  async getAllEmail(): Promise<Email[]> {
    const email = await this.EmailModel.find({ isReplay: false }).populate([
      {
        path: 'replies',
        strictPopulate: false,
      },
    ]);

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

  async deleteAllEmail(ids: any): Promise<any | undefined> {
    ids?.emailIds.map(async (id: any) => {
      const email = await this.EmailModel.findOneAndDelete({ _id: id });
    });

    if (!ids) {
      throw new HttpException('Email Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return ids;
    }
  }

  //***************** Confg ****************************************/

  async addconfigEmail(EmailConfigDTO: EmailConfigDTO): Promise<any> {
    const email = await this.ConfigemailModel.create(EmailConfigDTO);
    return email.save();
  }

  async deleteconfigEmail(id: string): Promise<any> {
    const email = await this.ConfigemailModel.findByIdAndDelete(id);
    if (!email) {
      throw new HttpException('Email Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }

  async getconfigEmail(): Promise<any> {
    const email = await this.ConfigemailModel.find();
    if (!email) {
      throw new HttpException('Email Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }

  async getconfigEmailbyid(id: string): Promise<any> {
    const email = await this.ConfigemailModel.findById(id);
    if (!email) {
      throw new HttpException('Email Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }

  async UpdateconfigEmail(
    id: string,
    EmailConfigDTO: EmailConfigDTO,
  ): Promise<any> {
    const email = await this.EmailModel.findByIdAndUpdate(id, {
      core: EmailConfigDTO.core,
      name: EmailConfigDTO.name,
      status: EmailConfigDTO.status,
    });
    if (!email) {
      throw new HttpException('Email Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return email;
    }
  }
}
