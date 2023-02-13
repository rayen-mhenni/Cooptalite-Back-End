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
import { CreateCvtechDTO } from './dtos/cvtech-dtos';

import { CvtechService } from './cvtech.service';

@Controller('api/cvtech')
export class CvtechController {
  constructor(private cvtechservice: CvtechService) {}
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/addcv')
  async addCvtech(@Body() CreateCvtechDTO: CreateCvtechDTO) {
    const cvtech = await this.cvtechservice.addCvtech(CreateCvtechDTO);
    return cvtech;
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/updatecv/:id')
  async UpdateCvtech(
    @Param('id') id: string,
    @Body() CvtechDTO: CreateCvtechDTO,
  ) {
    const Cvtech = await this.cvtechservice.updateCvtech(id, CvtechDTO);
    if (!Cvtech) throw new NotFoundException('Cvtech does not exixt');
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/deletecv/:id')
  async DeleteCvtech(@Param('id') id: string) {
    const Cvtech = await this.cvtechservice.deleteCvtech(id);
    if (!Cvtech) throw new NotFoundException('Cvtech does not exist!');
    return { message: 'Cvtech DELETED ' };
  }
  @Get('/')
  async findCvtech() {
    const cvtech = await this.cvtechservice.findCvtech();
    if (!cvtech) throw new NotFoundException('CvTech does not exist!');
    return cvtech;
  }
  @Get('/:id')
  async findCvtechById(@Param('id') id: string) {
    const cvtech = await this.cvtechservice.findCvtechById(id);
    if (!cvtech) throw new NotFoundException('Cvtech does not exist!');
    return cvtech;
  }

  @Get('/normalize/:cvname')
  async getCVData(@Param('cvname') cvname: string) {
    const cvtech = await this.cvtechservice.getCVData(cvname);
    if (!cvtech) throw new NotFoundException('Cvtech does not exist!');
    return cvtech;
  }

  @Put('/status/:id/:status')
  async updateCvtechstatus(
    @Param('id') id: string,
    @Param('status') status: string,
  ) {
    const cra = await this.cvtechservice.updateCvtechstatus(id, status);
    if (!cra) throw new NotFoundException('Cvtech does not exist!');
    return cra;
  }
}
