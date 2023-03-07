import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { searchbarController } from './searchbar.controller';
import { SearchNavBarSchema } from './searchbar.schema';
import { SearchNavBarService } from './searchbar.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SearchNavBar', schema: SearchNavBarSchema },
    ]),
  ],
  providers: [SearchNavBarService],
  controllers: [searchbarController],
  exports: [SearchNavBarService],
})
export class SearchNavBarModule {}
