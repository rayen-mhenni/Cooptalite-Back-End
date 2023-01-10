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

@Controller('api/parroles')
export class parRolesController {
  constructor(private parRolesService: parRolesService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/')
  async AddRole(@Body() parRolesDTO: parRolesDTO) {
    const role = await this.parRolesService.addParRoles(parRolesDTO);
    return role;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/')
  async getRoles() {
    const role = await this.parRolesService.findRoles();
    return role;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/:id')
  async UpdateRole(@Param('id') id: string, @Body() parRolesDTO: parRolesDTO) {
    const role = await this.parRolesService.updateParRoles(id, parRolesDTO);
    if (!role) throw new NotFoundException('Role does not exist!');
    return role;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:name')
  async getRole(@Param('name') name: string) {
    const role = await this.parRolesService.findRole(name);
    if (!role) throw new NotFoundException('Role does not exist!');
    return role;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Delete('/:id')
  async DeleteRole(@Param('id') id: string) {
    const user = await this.parRolesService.deleteRole(id);
    if (!user) throw new NotFoundException('Role does not exist!');
    return { message: 'ROLE DELETED ' };
  }
}
