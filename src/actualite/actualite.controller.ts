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
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard.ts';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { actualiteDTO } from './dtos/actualiteDTO';
import { ActualiteService } from './actualite.service';

@Controller('api/actualite')
export class ActualiteController {
  constructor(private ActualiteService: ActualiteService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/')
  async AddActualite(@Body() actualiteDTO: actualiteDTO) {
    const role = await this.ActualiteService.addactualites(actualiteDTO);
    return role;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/')
  async getActualite() {
    const actualite = await this.ActualiteService.findAllActualite();
    return actualite;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/valid')
  async getActualiteValid() {
    const actualite = await this.ActualiteService.findAllActualiteValid();
    return actualite;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/:id')
  async UpdateActualite(
    @Param('id') id: string,
    @Body() actualiteDTO: actualiteDTO,
  ) {
    const actualite = await this.ActualiteService.updateactualites(
      id,
      actualiteDTO,
    );
    if (!actualite) throw new NotFoundException('Actualite does not exist!');
    return actualite;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/favorite/:id')
  async UpdateFavorite(
    @Param('id') id: string,
    @Body() body: { favorite: string[] },
  ) {
    const actualite = await this.ActualiteService.updateFavorite(
      id,
      body.favorite,
    );
    if (!actualite) throw new NotFoundException('Actualite does not exist!');
    return actualite;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:title')
  async getActualiteByTitle(@Param('title') title: string) {
    const actualite = await this.ActualiteService.findActualite(title);
    if (!actualite) throw new NotFoundException('Actualite does not exist!');
    return actualite;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Delete('/:id')
  async DeleteActualite(@Param('id') id: string) {
    const actualite = await this.ActualiteService.deleteActualite(id);
    if (!actualite) throw new NotFoundException('Actualite does not exist!');
    return { message: 'Actualite DELETED ' };
  }
}
