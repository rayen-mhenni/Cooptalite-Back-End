import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import mongoose, { Document } from 'mongoose';
import { Offer } from 'src/offer/offer.schema';
import { User } from 'src/user/user.schema';

export type CooptationDocument = Cooptation & Document;

@Schema()
export class Cooptation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  member: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  candidat: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
  })
  offer: Offer;

  @Prop({
    required: true,
    type: String,
    default: moment().format('MMMM Do, YYYY, h:mma'),
  })
  date: string;

  @Prop()
  cvs: string[];

  @Prop()
  type: string;
}

export const CooptationSchema = SchemaFactory.createForClass(Cooptation);
