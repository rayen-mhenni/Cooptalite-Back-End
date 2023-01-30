import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { activity } from './dtos/craDTO';

export type craDocument = cra & Document;

@Schema()
export class cra {
  @Prop({
    required: true,
    type: String,
  })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
    type: String,
  })
  date: string;

  @Prop([
    {
      type: activity,
    },
  ])
  listOfActivity: activity[];
}

export const craSchema = SchemaFactory.createForClass(cra);
