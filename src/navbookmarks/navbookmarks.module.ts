import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavBookMarksController } from './navbookmarks.controller';
import { FavoriteSchema } from './navbookmarks.schema';
import { NavBookService } from './navbookmarks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Favorite', schema: FavoriteSchema }]),
  ],
  providers: [NavBookService],
  controllers: [NavBookMarksController],
  exports: [NavBookService],
})
export class NavBookMarksModule {}
