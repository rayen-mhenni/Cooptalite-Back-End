import { Module } from '@nestjs/common';
import { ParListService } from './parList.service';
import { ParListController } from './parList.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { parListSchema } from './parList.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ParList',
        schema: parListSchema,
      },
    ]),
  ],
  providers: [ParListService],
  controllers: [ParListController],
  exports: [ParListService],
})
export class ParListModule {}
