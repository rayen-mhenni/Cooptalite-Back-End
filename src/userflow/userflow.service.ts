// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class FlowService {}
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Userflow, UserflowDocument } from './userflow.schema';
import { CreateUserflowDTO, flow } from './dtos/userflow.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { FlowDocument } from 'src/flow/flow.schema';
import * as moment from 'moment';
@Injectable()
export class UserflowService {
  constructor(
    @InjectModel('Userflow')
    private readonly UserflowModel: Model<UserflowDocument>,
    @InjectModel('Flow')
    private readonly FlowModel: Model<FlowDocument>,
  ) {}

  async addUserflow(CreateUserflowDTO: CreateUserflowDTO): Promise<any> {
    const OldUserflow = await this.UserflowModel.findOne({
      userId: CreateUserflowDTO.userId,
      userFlow: CreateUserflowDTO.userFlow,
    });

    if (!OldUserflow) {
      const newUser = await this.UserflowModel.create(CreateUserflowDTO);

      return newUser.save();
    } else {
      throw new HttpException('UserFlow already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async addUserflowByOfferId(companyId: string, userId: string): Promise<any> {
    //getFlowByCompanyId
    const Flow = await this.FlowModel.findOne({ companyId: companyId });
    if (Flow) {
      const useflow = [];

      Flow.flow.map((f) => {
        useflow.push({
          ...f,
          status: 'pending',
          statusDate: moment().format('MMMM Do, YYYY, hh:mm a'),
        });
      });

      if (useflow.length > 0) {
        const newUserFlow = await this.UserflowModel.create({
          userId,
          userFlow: useflow,
        });

        return newUserFlow.save();
      } else {
        throw new HttpException(
          'No flow for this Company',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException('No flow for this Company', HttpStatus.NOT_FOUND);
    }
  }

  async updateUserflow(
    id: string,
    CreateUserflowDTO: CreateUserflowDTO,
  ): Promise<any> {
    const Userflow = await this.UserflowModel.findById(id);

    if (Userflow) {
      const newUserflow = await this.UserflowModel.findByIdAndUpdate(
        Userflow._id,
        {
          userId: CreateUserflowDTO.userId || Userflow.userId,
          userFlow: CreateUserflowDTO.userFlow || Userflow.userFlow,
        },
      );

      return newUserflow;
    } else {
      throw new HttpException('Userflow Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateUserflowByOrderandName(
    id: string,
    taskname: string,
    order: string,
    flow: flow,
  ): Promise<any> {
    const Userflow = await this.UserflowModel.updateOne(
      { _id: id },
      { $set: { 'userFlow.$[t]': flow } },
      { arrayFilters: [{ 't.taskName': taskname, 't.order': order }] },
    );

    if (Userflow) {
      return Userflow;
    } else {
      throw new HttpException('Userflow not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUserflow(id: string): Promise<Userflow | undefined> {
    const Userflow = await this.UserflowModel.findOneAndDelete({ _id: id });
    if (!Userflow) {
      throw new HttpException('Userflow Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Userflow;
    }
  }

  async findUserflows(): Promise<any | undefined> {
    const Userflow = await this.UserflowModel.find().populate({
      path: 'userId',
    });
    if (!Userflow) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Userflow;
    }
  }

  async findUserflowByCompanyId(companyId: string): Promise<any | undefined> {
    const Userflow = await this.UserflowModel.find({
      company: companyId,
    }).sort({ date: -1 });

    if (!Userflow) {
      throw new HttpException('Userflow Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Userflow;
    }
  }

  async findUserflowByUserId(userId: string): Promise<any | undefined> {
    const Userflow = await this.UserflowModel.find({
      userId: userId,
    }).sort({ date: -1 });

    if (!Userflow) {
      throw new HttpException('Userflow Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Userflow;
    }
  }

  async findUserflowById(id: string): Promise<any | undefined> {
    const Userflow = await this.UserflowModel.findById({ _id: id });
    if (!Userflow) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Userflow;
    }
  }
}
