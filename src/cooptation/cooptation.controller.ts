import {
  Controller,
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
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard.ts';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CooptationService } from './Cooptation.service';
import { CooptationDto } from './CooptationDto';

@Controller('api/cooptation')
export class CooptationController {
  constructor(private cooptationService: CooptationService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Post('/')
  async addCooptation(@Body() Cooptation: CooptationDto) {
    const role = await this.cooptationService.addCooptation(Cooptation);
    return role;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Delete('/:id')
  async DeleteCooptation(@Param('id') id: string) {
    const Cooptation = await this.cooptationService.deleteCooptation(id);
    if (!Cooptation) throw new NotFoundException('Cooptation does not exist!');
    return { message: 'Cooptation DELETED ' };
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)

  @Get('/:id')
  async findCooptationByUserId(@Param('id') id: string) {
    const Cooptation = await this.cooptationService.findCooptationByUserId(id);
    if (!Cooptation) throw new NotFoundException('Cooptation does not exist!');
    return Cooptation;
  }

  @Get('coopt/:id')
  async findCooptationByCooptedId(@Param('id') id: string) {
    const Cooptation = await this.cooptationService.findCooptationByCooptedId(
      id,
    );
    if (!Cooptation) throw new NotFoundException('Cooptation does not exist!');
    return Cooptation;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Get('/')
  async findCooptation() {
    const Cooptation = await this.cooptationService.findCooptation();
    if (!Cooptation) throw new NotFoundException('Cooptation does not exist!');
    return Cooptation;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Put('/:id')
  async updateCooptation(
    @Param('id') id: string,
    @Body() Cooptation: CooptationDto,
  ) {
    const uCooptation = await this.cooptationService.updateCooptation(
      id,
      Cooptation,
    );
    if (!uCooptation) throw new NotFoundException('Cooptation does not exist!');
    return uCooptation;
  }

  @Put('/:id/:task')
  async updateCooptationTask(
    @Param('id') id: string,
    @Param('task') task: string,
  ) {
    const uCooptation = await this.cooptationService.updateCooptationTask(
      id,
      task,
    );
    if (!uCooptation) throw new NotFoundException('Cooptation does not exist!');
    return uCooptation;
  }
}
