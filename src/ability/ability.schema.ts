import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AbilityDocument = Ability & Document;

@Schema()
export class Ability {
  @Prop({
    required: true,
    type: String,
  })
  action: string;

  @Prop({
    required: true,
    type: String,
  })
  subject: string;

  @Prop({
    required: true,
    type: Boolean,
    default: true,
  })
  status: boolean;
}

export const AbilitySchema = SchemaFactory.createForClass(Ability);
