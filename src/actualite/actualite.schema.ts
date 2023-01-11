import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type actualiteDocument = actualite & Document;

@Schema()
export class actualite {
  @Prop({
    required: true,
    type: String,
  })
  imgUrl: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  desc: string;

  @Prop({
    required: true,
    type: Boolean,
  })
  status: boolean;

  @Prop({
    type: Array,
  })
  tags: string[];

  @Prop([
    {
      type: Array,
    },
  ])
  favorite: string[];
}

export const actualiteSchema = SchemaFactory.createForClass(actualite);
