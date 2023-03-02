import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import mongoose, { Document } from 'mongoose';
import { Cvtech } from 'src/CvTech/cvtech.schema';
import { Offer } from 'src/offer/offer.schema';
import { User } from 'src/user/user.schema';

export type CooptEngineDocument = CooptEngine & Document;

@Schema()
export class CooptEngine {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;

  @Prop({
    type: Number,
  })
  level: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  parentId: User;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ])
  listOfChildId: User[];

  @Prop()
  percentage: string;

  @Prop()
  amount: string;

  @Prop()
  TJM: string;
}

export const CooptEngineSchema = SchemaFactory.createForClass(CooptEngine);
