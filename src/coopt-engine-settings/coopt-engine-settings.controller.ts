import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CooptEngineSettingsService } from './coopt-engine-settings.service';
import { CooptEngineSettingsDTO } from './dtos/coopt-engine-settings.DTO';

@Controller('api/coopt-engine-settings')
export class CooptEngineSettingsController {
  constructor(private CooptEngineSettingsService: CooptEngineSettingsService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/')
  async AddCooptEngineSettings(
    @Body() CooptEngineSettingsDTO: CooptEngineSettingsDTO,
  ) {
    const settings =
      await this.CooptEngineSettingsService.addCooptEngineSettings(
        CooptEngineSettingsDTO,
      );
    return settings;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/')
  async getCooptEngineSettings() {
    const CooptEngineSettings =
      await this.CooptEngineSettingsService.findAllCooptEngineSetting();
    return CooptEngineSettings;
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/name/:name')
  async getCooptEngineSettingsByName(@Param('name') name: string) {
    const CooptEngineSettings =
      await this.CooptEngineSettingsService.findCooptEngineSetting(name);
    return CooptEngineSettings;
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:id')
  async getCooptEngineSettingsById(@Param('id') id: string) {
    const CooptEngineSettings =
      await this.CooptEngineSettingsService.findCooptEngineSettingById(id);
    return CooptEngineSettings;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/valid')
  async getCooptEngineSettingsValid() {
    const CooptEngineSettings =
      await this.CooptEngineSettingsService.findValidSetting();
    return CooptEngineSettings;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/:id')
  async UpdatecooptEngineSettings(
    @Param('id') id: string,
    @Body() CooptEngineSettingsDTO: CooptEngineSettingsDTO,
  ) {
    const cooptEngineSettings =
      await this.CooptEngineSettingsService.updatecooptEngineSettings(
        id,
        CooptEngineSettingsDTO,
      );
    return cooptEngineSettings;
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Delete('/:id')
  async DeleteCooptEngineSetting(@Param('id') id: string) {
    const CooptEngineSetting =
      await this.CooptEngineSettingsService.deleteCooptEngineSetting(id);
    if (!CooptEngineSetting)
      throw new NotFoundException('CooptEngineSetting does not exist!');
    return { message: 'CooptEngineSetting DELETED ' };
  }
}
