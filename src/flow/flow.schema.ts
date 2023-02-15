import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { flowData }from './dtos/flow.dto';

export type FlowDocument = Flow & Document;

@Schema()
export class Flow {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
      })
    companyId: string;

  
    @Prop([{
        required: true,
        type: flowData,

    }])
    flow: flowData[];

   


}

export const FlowSchema = SchemaFactory.createForClass(Flow);