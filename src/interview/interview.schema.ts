import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose,{ Document } from 'mongoose';
import { User } from 'src/user/user.schema';

export type InterviewDocument = Interview & Document;
@Schema()
export class Interview {
    @Prop(
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      )
      candidate: String;
      
      @Prop(
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      )
      interviewer: String;

    @Prop({
        required: true,
        type: String,
    })
    title: string;

    @Prop({
        required: true,
    })
    description: string;

    @Prop({
        required: true,
    })
    dateInterview: string;

    @Prop({
        required: true,
    })
    heureInterview: string;
    

    @Prop({
        required: true,
    })
    status: string;



}

export const InterviewSchema = SchemaFactory.createForClass(Interview);