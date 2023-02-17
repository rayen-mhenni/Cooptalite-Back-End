import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserflowService } from './userflow.service';
import { UserflowController } from './userflow.controller';
import { UserflowSchema} from './userflow.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Userflow', schema: UserflowSchema }]),
  ],
  providers: [UserflowService],
  controllers: [UserflowController],
  exports: [UserflowService],
})
export class UserflowModule {}
