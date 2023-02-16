// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class FlowService {}
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Flow, FlowDocument } from './flow.schema';
import { CreateFlowDTO } from './dtos/flow.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
@Injectable()
export class FlowService {
  constructor(
    @InjectModel('Flow')
    private readonly FlowModel: Model<FlowDocument>,
  ) {}

  async addFlow(CreateFlowDTO: CreateFlowDTO): Promise<any> {
    const OldFlow = await this.FlowModel.findOne({
      companyId: CreateFlowDTO.companyId,
      flow: CreateFlowDTO.flow,
    });

    if (!OldFlow) {
      const newUser = await this.FlowModel.create(CreateFlowDTO);

      return newUser.save();
    } else {
      throw new HttpException('Flow already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async updateFlow(id: string, CreateFlowDTO: CreateFlowDTO): Promise<any> {
    const Flow = await this.FlowModel.findById(id);

    if (Flow) {
      const newFlow = await this.FlowModel.findByIdAndUpdate(Flow._id, {
        companyId: CreateFlowDTO.companyId || Flow.companyId,
        flow: CreateFlowDTO.flow || Flow.flow,
      });

      return newFlow;
    } else {
      throw new HttpException('Flow Not exist', HttpStatus.NOT_FOUND);
    }
  }
  async deleteFlow(id: string): Promise<Flow | undefined> {
    const Flow = await this.FlowModel.findOneAndDelete({ _id: id });
    if (!Flow) {
      throw new HttpException('Flow Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Flow;
    }
  }
  async findFlows(): Promise<any | undefined> {
    const Flow = await this.FlowModel.find().populate({
      path: 'companyId',
    });
    if (!Flow) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Flow;
    }
  }
  async findFlowByCompanyId(companyId: string): Promise<any | undefined> {
    const Flow = await this.FlowModel.find({
      company: companyId,
    }).sort({ date: -1 });

    if (!Flow) {
      throw new HttpException('Flow Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Flow;
    }
  }
  async findFlowById(id: string): Promise<any | undefined> {
    const Flow = await this.FlowModel.findById({ _id: id });
    if (!Flow) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Flow;
    }
  }
}
