import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewController } from './email.controller';
import { EmailSchema } from './email.schema';
import { EmailService } from './email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Email', schema: EmailSchema }]),
  ],
  providers: [EmailService],
  controllers: [InterviewController],
  exports: [EmailService],
})
export class EmailModule {}
