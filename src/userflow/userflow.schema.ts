import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { flow } from './dtos/userflow.dto';

export type UserflowDocument = Userflow & Document;

@Schema()
export class Userflow {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop()
  userFlow: flow[];
}

export const UserflowSchema = SchemaFactory.createForClass(Userflow);
