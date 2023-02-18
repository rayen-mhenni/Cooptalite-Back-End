// import { Controller } from '@nestjs/common';

// @Controller('flow')
// export class FlowController {}
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreateFlowDTO } from './dtos/flow.dto';

import { FlowService } from './flow.service';

@Controller('api/flow')
export class FlowController {
  constructor(private flowService: FlowService) {}
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async addFlow(@Body() CreateFlowDTO: CreateFlowDTO) {
    const flow = await this.flowService.addFlow(CreateFlowDTO);
    return flow;
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  async UpdateFlow(
    @Param('id') id: string,
    @Body() CreateFlowDTO: CreateFlowDTO,
  ) {
    const flow = await this.flowService.updateFlow(id, CreateFlowDTO);
    if (!flow) throw new NotFoundException('Flow does not exixt');
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async deleteFlow(@Param('id') id: string) {
    const flow = await this.flowService.deleteFlow(id);
    if (!flow) throw new NotFoundException('flow does not exist!');
    return { message: 'flow DELETED ' };
  }

  @Get('/')
  async findFlows() {
    const flow = await this.flowService.findFlows();
    if (!flow) throw new NotFoundException('flow does not exist!');
    return flow;
  }
  @Get('/:id')
  async findFlowById(@Param('id') id: string) {
    const flow = await this.flowService.findFlowById(id);
    if (!flow) throw new NotFoundException('flow does not exist!');
    return flow;
  }
  @Get('/company/:companyId')
  async findFlowByCompanyId(@Param('companyId') companyId: string) {
    const flow = await this.flowService.findFlowByCompanyId(companyId);
    if (!flow) throw new NotFoundException('flow does not exist!');

    return flow;
  }
}
