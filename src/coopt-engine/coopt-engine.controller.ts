import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CooptEngineService } from './coopt-engine.service';

@Controller('api/coopt-engine')
export class CooptEngineController {
  constructor(private CooptEngineService: CooptEngineService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Delete('/:userId')
  async RemoveNoeud(@Param('userId') userId: string) {
    const CooptEngine = await this.CooptEngineService.removeNoeud(userId);
    if (!CooptEngine) throw new NotFoundException('Noeud does not exist!');
    return { message: 'Noeud DELETED ' };
  }

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/')
  async AddNoeud(@Body() body: { userId: string; parentId: string }) {
    const cooptEngine = await this.CooptEngineService.addNoeud(body);
    return cooptEngine;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/')
  async GetTree() {
    const CooptEngine = await this.CooptEngineService.getTree();
    return CooptEngine;
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:userId')
  async GetNoeud(@Param('userId') userId: string) {
    const CooptEngine = await this.CooptEngineService.getNoeud(userId);
    return CooptEngine;
  }
}
