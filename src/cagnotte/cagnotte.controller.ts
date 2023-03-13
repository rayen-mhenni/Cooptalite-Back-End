import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CagnotteService } from './cagnotte.service';
import { Cagnotte } from './dtos/cagnotte.DTO';

@Controller('api/cagnotte')
export class CagnotteController {
  constructor(private CagnotteService: CagnotteService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Put('/:userId/:month')
  async UpdateCagnotte(
    @Param('userId') userId: string,
    @Param('month') month: string,
    @Body() body: Cagnotte,
  ) {
    const Cagnotte = await this.CagnotteService.updateCagnotte(
      userId,
      month,
      body,
    );
    return Cagnotte;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SuperAdmin)
  @Get('/:userId/:month')
  async GetCagnotteByUserid(
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    const Cagnotte = await this.CagnotteService.getCagnotteByUserId(
      userId,
      month,
    );
    return Cagnotte;
  }
}
