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
import { SearchnavbarDTO, SearchObj } from './dtos/searchnavbar.dtos';

import { SearchNavBarService } from './searchbar.service';

@Controller('api/searchbar')
export class searchbarController {
  constructor(private searchNavBarService: SearchNavBarService) {}
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/addsearchbar')
  async addSearchNavBar(@Body() searchnavbarDTO: SearchnavbarDTO) {
    const SearchNavBar = await this.searchNavBarService.addSearchNavBar(
      searchnavbarDTO,
    );
    return SearchNavBar;
  }

  @Get('/')
  async findsearchNav() {
    const SearchNavBar = await this.searchNavBarService.findsearchNav();
    if (!SearchNavBar) throw new NotFoundException('interview does not exist!');
    return SearchNavBar;
  }

  @Delete('/delete/:id')
  async DeleteSearchNavBar(@Param('id') id: string) {
    const SearchNavBar = await this.searchNavBarService.deletesearchnavbar(id);
    if (!SearchNavBar)
      throw new NotFoundException('SearchNavBar does not exist!');
    return { message: 'SearchNavBar DELETED ' };
  }

  @Put('/UpDateSearchNavBarByTitle/:id/:title')
  async UpdateSearchNavBarByTitle(
    @Param('id') id: string,
    @Param('title') title: string,
    @Body() searchObj: SearchObj,
  ) {
    const SearchNavBar =
      await this.searchNavBarService.updatesearchnavbarByTitle(
        id,
        title,
        searchObj,
      );
    if (!SearchNavBar)
      throw new NotFoundException('SearchNavBar does not exixt');
    return SearchNavBar;
  }

  @Delete('/deletebyTitle/:id/:title')
  async DeleteSearchNavBarByTitle(
    @Param('id') id: string,
    @Param('title') title: string,
  ) {
    const SearchNavBar =
      await this.searchNavBarService.deletesearchnavbarByTitle(id, title);
    if (!SearchNavBar)
      throw new NotFoundException('SearchNavBar does not exist!');
    return { message: 'SearchNavBar DELETED ' };
  }

  @Post('/addsearchbarOBJ/:id')
  async addDataObj(@Param('id') id: string, @Body() searchObj: SearchObj) {
    const SearchNavBar = await this.searchNavBarService.addDataObj(
      id,
      searchObj,
    );
    if (!SearchNavBar)
      throw new NotFoundException('SearchNavBar does not exixt');
    return SearchNavBar;
  }

  @Get('/getfilterbypages')
  async findsearchNavByPages() {
    const SearchNavBar =
      await this.searchNavBarService.findSearchNavfilterpages();
    if (!SearchNavBar)
      throw new NotFoundException('SearchNavBar does not exist!');
    return SearchNavBar;
  }
}
