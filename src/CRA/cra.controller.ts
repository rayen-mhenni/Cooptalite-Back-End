import { Controller } from '@nestjs/common';
import {
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  NotFoundException,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { activity, craDTO } from './dtos/craDTO';
import { CRAService } from './cra.service';

@Controller('api/cra')
export class CRAController {
  constructor(private CRAService: CRAService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/')
  async AddCRA(@Body() craDTO: craDTO) {
    const cra = await this.CRAService.addcra(craDTO);
    return cra;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/')
  async getCRA() {
    const cra = await this.CRAService.findAllCRA();
    return cra;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/:id')
  async UpdateCRA(@Param('id') id: string, @Body() craDTO: craDTO) {
    const cra = await this.CRAService.updatecra(id, craDTO);
    if (!cra) throw new NotFoundException('CRA does not exist!');
    return cra;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/status/:id/:status')
  async updatecrastatus(
    @Param('id') id: string,
    @Param('status') status: string,
  ) {
    const cra = await this.CRAService.updatecrastatus(id, status);
    if (!cra) throw new NotFoundException('CRA does not exist!');
    return cra;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:userId')
  async getCRAByUserId(@Param('userId') userId: string) {
    const cra = await this.CRAService.findCRAByUserId(userId);
    if (!cra) throw new NotFoundException('CRA does not exist!');
    return cra;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Delete('/:id')
  async DeleteCRA(@Param('id') id: string) {
    const cra = await this.CRAService.deleteCRA(id);
    if (!cra) throw new NotFoundException('CRA does not exist!');
    return { message: 'CRA DELETED ' };
  }
}
