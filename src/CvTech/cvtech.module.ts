import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CvtechController } from './cvtech.controller';
import { CvtechSchema } from './cvtech.schema';
import { CvtechService } from './cvtech.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cvtech', schema: CvtechSchema }]),
  ],
  providers: [CvtechService],
  controllers: [CvtechController],
  exports: [CvtechService],
})
export class CvtechModule {}
