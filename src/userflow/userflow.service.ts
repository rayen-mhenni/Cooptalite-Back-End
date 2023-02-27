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
import * as _ from 'lodash';
import { CooptationDocument } from 'src/cooptation/cooptation.schema';
@Injectable()
export class UserflowService {
  constructor(
    @InjectModel('Userflow')
    private readonly UserflowModel: Model<UserflowDocument>,
    @InjectModel('Flow')
    private readonly FlowModel: Model<FlowDocument>,
    @InjectModel('cooptation')
    private readonly cooptationModule: Model<CooptationDocument>,
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

  async addOrUpdateUserflowByOfferId(
    cooptaionId: string,
    companyId: string,
    userId: string,
  ): Promise<any> {
    const ExistUserFlow = await this.UserflowModel.findOne({
      userId: userId,
    });

    if (!ExistUserFlow) {
      //addnewFlow...
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
          const Stortedflows = _.orderBy(useflow, 'order', 'asc');

          const newUserFlow = await this.UserflowModel.create({
            userId,
            cooptationId: cooptaionId,
            userFlow: Stortedflows,
          });

          newUserFlow.save();
          //update cooptation currentTask
          await this.cooptationModule.findByIdAndUpdate(cooptaionId, {
            data: moment().format('MMMM Do, YYYY, hh:mm a'),
            currentTask: Stortedflows[0].taskName,
          });

          return `The UserFlows insected and cooptation updated`;
        } else {
          throw new HttpException(
            'No flow for this Company',
            HttpStatus.NOT_FOUND,
          );
        }
      } else {
        throw new HttpException(
          'No flow for this Company',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      const coopt = await this.cooptationModule.findById(cooptaionId);
      if (coopt) {
        const cooptFlow = await this.UserflowModel.find({
          cooptationId: cooptaionId,
        });

        if (cooptFlow) {
          const currentFlow = cooptFlow[0].userFlow.find(
            (elm) => elm.taskName === coopt.currentTask,
          );
          if (currentFlow) {
            if (currentFlow.status === 'done') {
              //update userFlowbyOrder
              const FlowtoUpdate = cooptFlow[0].userFlow.find(
                (elm) => Number(elm.order) === Number(currentFlow.order) + 1,
              );
              if (FlowtoUpdate) {
                const FlowUpdate = {
                  ...FlowtoUpdate,
                  order: String(Number(currentFlow.order) + 1),
                  status: 'inprogress',
                  statusDate: moment().format('MMMM Do, YYYY, hh:mm a'),
                };
                const Userflow = await this.UserflowModel.updateOne(
                  { cooptationId: cooptaionId },
                  { $set: { 'userFlow.$[t]': FlowUpdate } },
                  {
                    arrayFilters: [
                      { 't.order': String(Number(currentFlow.order) + 1) },
                    ],
                  },
                );
                //upadte cooptaion (currentTask)
                await this.cooptationModule.findByIdAndUpdate(cooptaionId, {
                  data: moment().format('MMMM Do, YYYY, hh:mm a'),
                  currentTask: FlowtoUpdate.taskName,
                });
                return `the current flow is ${FlowtoUpdate.taskName}`;
              } else {
                throw new HttpException(
                  'No Flow To Run the current flow is the last one ',
                  HttpStatus.NOT_FOUND,
                );
              }
            } else {
              return `the current flow ${currentFlow.taskName} is in ${currentFlow.status}`;
            }
          } else {
            throw new HttpException(
              'No Flow for this Cooptation hint:TaskName',
              HttpStatus.NOT_FOUND,
            );
          }
        } else {
          throw new HttpException(
            'No Flow for this Cooptation',
            HttpStatus.NOT_FOUND,
          );
        }
      } else {
        throw new HttpException('No Cooptation Found ', HttpStatus.NOT_FOUND);
      }
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
          userFlow: CreateUserflowDTO.userFlow || Userflow.userFlow,
        },
      );

      return newUserflow;
    } else {
      throw new HttpException('Userflow Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateUserflowByOrderandName(
    cooptationId: string,
    taskname: string,
    order: string,
    flow: flow,
  ): Promise<any> {
    const Userflow = await this.UserflowModel.updateOne(
      { cooptationId: cooptationId },
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
    }).sort({ order: -1 });

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
