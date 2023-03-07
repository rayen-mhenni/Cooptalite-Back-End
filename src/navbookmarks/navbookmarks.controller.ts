import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';

import { CreateFavoriteDTO, NavobjData } from './dtos/navbookmarks-dto';
import { Favorite } from './navbookmarks.schema';
import { NavBookService } from './navbookmarks.service';

@Controller('api/favorite')
export class NavBookMarksController {
  constructor(private NavBookService: NavBookService) {}
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async addFavorite(@Body() CreateFavoriteDTO: CreateFavoriteDTO) {
    const Favorite = await this.NavBookService.addFavorite(CreateFavoriteDTO);
    return Favorite;
  }
  @Get('/:userId')
  async findFavoritebyUserId(@Param('userId') userId: string) {
    const Favorite = await this.NavBookService.findFavoritebyUserId(userId);
    if (!Favorite) throw new NotFoundException('favorite does not exist!');
    return Favorite;
  }

  @Delete('/delete/:id')
  async deleteFavorite(@Param('id') id: string) {
    const Favorite = await this.NavBookService.deleteFavorite(id);
    if (!Favorite) throw new NotFoundException('NavBookMarks does not exist!');
    return { message: 'Favorite DELETED ' };
  }

  // @Get('/:id')
  // async findFavoriteById(@Param('id') id: string) {
  //   const Favorite = await this.NavBookService.findFavoriteById(id);
  //   if (!Favorite) throw new NotFoundException('flow does not exist!');
  //   return Favorite;
  // }
  @Get('/')
  async findFavoriteList() {
    const favorite = await this.NavBookService.findFavoriteList();
    if (!favorite) throw new NotFoundException('favorite does not exist!');
    return favorite;
  }

  @Post('/:id')
  async addFavoriteByID(
    @Param('id') id: string,
    @Body() NavobjData: NavobjData,
  ) {
    const Favorite = await this.NavBookService.addFavoriteByID(id, NavobjData);
    if (!Favorite) throw new NotFoundException('Favorite does not exixt');
    return Favorite;
  }
}
