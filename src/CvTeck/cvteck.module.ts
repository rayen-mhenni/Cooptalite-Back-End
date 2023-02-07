import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CvteckController } from './cvteck.controller';
import { CvteckSchema } from './cvteck.schema';
import { CvteckService } from './cvteck.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Cvteck', schema: CvteckSchema }]),
    ],
    providers: [CvteckService],
    controllers: [CvteckController],
    exports: [CvteckService],
})
export class CvteckModule { }
