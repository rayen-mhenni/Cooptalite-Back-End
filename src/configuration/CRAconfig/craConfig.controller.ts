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
import { CraConfigService } from './craConfig.service';
import { craConfigDTO } from './dtos/craConfigDTO';

@Controller('api/craconfig')
export class craConfigController {
  constructor(private craConfigService: CraConfigService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Post('/')
  async AddcraConfig(@Body() craConfigDTO: craConfigDTO) {
    const craConfig = await this.craConfigService.addcraConfig(craConfigDTO);
    return craConfig;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/')
  async getcraConfig() {
    const craConfig = await this.craConfigService.findAllCraConfig();
    return craConfig;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/:id')
  async UpdatecraConfig(
    @Param('id') id: string,
    @Body() craConfigDTO: craConfigDTO,
  ) {
    const craConfig = await this.craConfigService.updatecraConfig(
      id,
      craConfigDTO,
    );
    if (!craConfig) throw new NotFoundException('craConfig does not exist!');
    return craConfig;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:userid')
  async getcraConfigByuserid(@Param('userid') userid: string) {
    const craConfig = await this.craConfigService.findCraConfigByUserId(userid);
    if (!craConfig) throw new NotFoundException('craConfig does not exist!');
    return craConfig;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Delete('/:id')
  async DeletecraConfig(@Param('id') id: string) {
    const craConfig = await this.craConfigService.deleteCraConfig(id);
    if (!craConfig) throw new NotFoundException('craConfig does not exist!');
    return { message: 'craConfig DELETED ' };
  }
}
