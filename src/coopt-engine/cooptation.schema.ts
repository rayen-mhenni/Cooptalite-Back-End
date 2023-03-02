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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  level: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
  })
  offer: Offer;

  @Prop({ default: '' })
  currentTask: string;

  @Prop({
    required: true,
    type: String,
    default: moment().format('MMMM Do, YYYY, hh:mm a'),
  })
  date: string;

  @Prop()
  cv: string;

  @Prop()
  type: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  trustrate: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cvtech',
  })
  cvtech: Cvtech;

  @Prop()
  currentMemberScore: string;
}

export const CooptEngineSchema = SchemaFactory.createForClass(CooptEngine);
