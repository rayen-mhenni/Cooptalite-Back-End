import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigemailSchema } from './Configemail.schema';
import { InterviewController } from './email.controller';
import { EmailSchema } from './email.schema';
import { EmailService } from './email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Email', schema: EmailSchema }]),
    MongooseModule.forFeature([
      { name: 'Configemail', schema: ConfigemailSchema },
    ]),
  ],
  providers: [EmailService],
  controllers: [InterviewController],
  exports: [EmailService],
})
export class EmailModule {}
