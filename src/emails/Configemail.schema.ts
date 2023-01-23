import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ConfigemailDocument = Configemail & Document;
@Schema()
export class Configemail {
  @Prop()
  core: string;
  @Prop()
  name: string;
  @Prop({ default: 'active' })
  status: string;
}

export const ConfigemailSchema = SchemaFactory.createForClass(Configemail);
