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
import { parListDTO } from './dtos/parListDTO';
import { ParListService } from './parList.service';

@Controller('api/parlist')
export class ParListController {
  constructor(private ParListService: ParListService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/')
  async AddParList(@Body() parListDTO: parListDTO) {
    const parList = await this.ParListService.addparList(parListDTO);
    return parList;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/')
  async getParList() {
    const parList = await this.ParListService.findAllParList();
    return parList;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/:id')
  async UpdateParList(@Param('id') id: string, @Body() parListDTO: parListDTO) {
    const parList = await this.ParListService.updateparLists(id, parListDTO);
    if (!parList) throw new NotFoundException('ParList does not exist!');
    return parList;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:parcode')
  async getParListByParcode(@Param('parcode') parcode: string) {
    const parList = await this.ParListService.findParListByParcode(parcode);
    if (!parList) throw new NotFoundException('ParList does not exist!');
    return parList;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Delete('/:id')
  async DeleteParList(@Param('id') id: string) {
    const parList = await this.ParListService.deleteParList(id);
    if (!parList) throw new NotFoundException('ParList does not exist!');
    return { message: 'ParList DELETED ' };
  }
}
