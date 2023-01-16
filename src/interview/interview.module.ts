import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewController } from './interview.controller';
import { InterviewSchema } from './interview.schema';
import { InterviewService } from './interview.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Interview', schema: InterviewSchema }])],
    providers: [InterviewService],
    controllers: [InterviewController],
    exports: [InterviewService],
})
export class InterviewModule { }
