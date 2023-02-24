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
import { event, calendarDTO } from './dtos/personalcalander.dto';

import { PersonalcalanderService } from './personalcalander.service';

@Controller('api/calander')
export class PersonalcalanderController {
  constructor(private PersonalcalanderService: PersonalcalanderService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/')
  async Addcalander(@Body() calendarDTO: calendarDTO) {
    const calander = await this.PersonalcalanderService.addPersonalcalander(calendarDTO);
    return calander;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/')
  async getcalander() {
    const calander = await this.PersonalcalanderService.findAllcalander();
    return calander;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/:id')
  async updatepersonalcalander(@Param('id') id: string, @Body() calendarDTO: calendarDTO) {
    const calander = await this.PersonalcalanderService.updatepersonalcalander(id, calendarDTO);
    if (!calander) throw new NotFoundException('calander does not exist!');
    return calander;
  }


  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:userId')
  async getCalendarByUserId(@Param('userId') userId: string) {
    const calander = await this.PersonalcalanderService.findCalendarByUserId(userId);
    if (!calander) throw new NotFoundException('CRA does not exist!');
    return calander;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Delete('/:id')
  async DeleteCRA(@Param('id') id: string) {
    const calander = await this.PersonalcalanderService.deletecalander(id);
    if (!calander) throw new NotFoundException('calander does not exist!');
    return { message: 'calander DELETED ' };
  }
}
