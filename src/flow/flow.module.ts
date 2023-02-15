import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';
import { FlowSchema} from './flow.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Flow', schema: FlowSchema }]),
  ],
  providers: [FlowService],
  controllers: [FlowController],
  exports: [FlowService],
})
export class FlowModule {}
