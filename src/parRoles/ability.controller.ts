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
import { ability, parRolesDTO } from './dtos/parRoleDto';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard.ts';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { parRolesService } from './parRoles.service';

@Controller('api/ability')
export class abilityController {
  constructor(private parRolesService: parRolesService) {}

  //************************************ ability ******************************************************* */

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Post('/')
  async addAbility(@Body() ability: ability) {
    const role = await this.parRolesService.addAbility(ability);
    return role;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Delete('/:id')
  async DeleteAbility(@Param('id') id: string) {
    const Ability = await this.parRolesService.deleteAbility(id);
    if (!Ability) throw new NotFoundException('Ability does not exist!');
    return { message: 'Ability DELETED ' };
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Get('/')
  async findAbility() {
    const role = await this.parRolesService.findAbility();
    if (!role) throw new NotFoundException('Ability does not exist!');
    return role;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Put('/:id')
  async updateAbility(@Param('id') id: string, @Body() ability: ability) {
    const role = await this.parRolesService.updateAbility(id, ability);
    if (!role) throw new NotFoundException('Ability does not exist!');
    return role;
  }
}
