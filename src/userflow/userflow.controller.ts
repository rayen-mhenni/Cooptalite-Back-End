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
import { CreateUserflowDTO, flow } from './dtos/userflow.dto';

import { UserflowService } from './userflow.service';

@Controller('api/userflow')
export class UserflowController {
  constructor(private userflowService: UserflowService) {}
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async addUserflow(@Body() CreateUserflowDTO: CreateUserflowDTO) {
    const Userflow = await this.userflowService.addUserflow(CreateUserflowDTO);
    return Userflow;
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  async updateUserflow(
    @Param('id') id: string,
    @Body() CreateUserflowDTO: CreateUserflowDTO,
  ) {
    const Userflow = await this.userflowService.updateUserflow(
      id,
      CreateUserflowDTO,
    );
    if (!Userflow) throw new NotFoundException('Userflow does not exixt');
  }
  @Put('/run/:cooptationId/:taskname/:order')
  async updateUserflowByOrderandName(
    @Param('cooptationId') cooptationId: string,
    @Param('taskname') taskname: string,
    @Param('order') order: string,
    @Body() flow: flow,
  ) {
    const Userflow = await this.userflowService.updateUserflowByOrderandName(
      cooptationId,
      taskname,
      order,
      flow,
    );
    if (!Userflow) throw new NotFoundException('Userflow does not exixt');
    return Userflow;
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async deleteUserflow(@Param('id') id: string) {
    const Userflow = await this.userflowService.deleteUserflow(id);
    if (!Userflow) throw new NotFoundException('Userflow does not exist!');
    return { message: 'Userflow DELETED ' };
  }

  @Get('/')
  async findUserflows() {
    const Userflow = await this.userflowService.findUserflows();
    if (!Userflow) throw new NotFoundException('Userflow does not exist!');
    return Userflow;
  }
  @Post('/addCompany/:companyId/:userId/:cooptationId')
  async addOrUpdateUserflowByOfferId(
    @Param('cooptationId') cooptationId: string,
    @Param('companyId') companyId: string,
    @Param('userId') userId: string,
  ) {
    const Userflow = await this.userflowService.addOrUpdateUserflowByOfferId(
      cooptationId,
      companyId,
      userId,
    );
    if (!Userflow) throw new NotFoundException('Userflow does not exist!');
    return Userflow;
  }
  @Get('/:id')
  async findUserflowById(@Param('id') id: string) {
    const Userflow = await this.userflowService.findUserflowById(id);
    if (!Userflow) throw new NotFoundException('Userflow does not exist!');
    return Userflow;
  }
  @Get('/company/:companyId')
  async findUserflowByCompanyId(@Param('companyId') companyId: string) {
    const Userflow = await this.userflowService.findUserflowByCompanyId(
      companyId,
    );
    if (!Userflow) throw new NotFoundException('Userflow does not exist!');

    return Userflow;
  }
  @Get('/coopt/:cooptId')
  async findUserflowByCoopId(@Param('cooptId') cooptId: string) {
    const Userflow = await this.userflowService.findUserflowByCoopId(cooptId);
    if (!Userflow) throw new NotFoundException('Userflow does not exist!');

    return Userflow;
  }
  @Get('/user/:userId')
  async findUserflowByUserId(@Param('userId') userId: string) {
    const Userflow = await this.userflowService.findUserflowByUserId(userId);
    if (!Userflow) throw new NotFoundException('Userflow does not exist!');

    return Userflow;
  }
}
