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
import { actualiteDTO, comment } from './dtos/actualiteDTO';
import { ActualiteService } from './actualite.service';

@Controller('api/actualite')
export class ActualiteController {
  constructor(private ActualiteService: ActualiteService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/')
  async AddActualite(@Body() actualiteDTO: actualiteDTO) {
    const actualite = await this.ActualiteService.addactualites(actualiteDTO);
    return actualite;
  }

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/comment/:id')
  async AddComment(@Param('id') id: string, @Body() comment: comment) {
    const actualite = await this.ActualiteService.addComment(id, comment);
    return actualite;
  }

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/comment/reply/:idcom')
  async ReplyComment(@Param('idcom') idcom: string, @Body() comment: comment) {
    const actualite = await this.ActualiteService.replyComment(idcom, comment);
    return actualite;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Delete('/comment/:idact/:idcom')
  async DeleteComment(
    @Param('idact') idact: string,
    @Param('idcom') idcom: string,
  ) {
    const actualite = await this.ActualiteService.deleteComment(idact, idcom);
    if (!actualite) throw new NotFoundException('Actualite does not exist!');
    return actualite;
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
  @Get('/title/:title')
  async getActualiteByTitle(@Param('title') title: string) {
    const actualite = await this.ActualiteService.findActualite(title);
    if (!actualite) throw new NotFoundException('Actualite does not exist!');
    return actualite;
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:id')
  async getActualiteById(@Param('id') id: string) {
    const actualite = await this.ActualiteService.findActualiteById(id);
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
