import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


export type AbilityDocument = Ability & Document;


@Schema()
export class Ability {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  action: string;


  @Prop({
    required: true,
    type: String,
    default: true
  })
  subject: string;


}

export const AbilitySchema = SchemaFactory.createForClass(Ability);
