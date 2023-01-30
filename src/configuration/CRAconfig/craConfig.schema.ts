import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { field } from './dtos/craConfigDTO';

export type craConfigDocument = craConfig & Document;

@Schema()
export class craConfig {
  @Prop({
    required: true,
    type: String,
  })
  parcodecategorie: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: string;

  @Prop({
    required: true,
    type: String,
  })
  parcodeactivity: string;

  @Prop([
    {
      type: field,
    },
  ])
  extendedProps: field[];
}

export const craConfigSchema = SchemaFactory.createForClass(craConfig);
