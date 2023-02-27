import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CooptEngineSettingsDocument = CooptEngineSettings & Document;

@Schema()
export class CooptEngineSettings {
  @Prop({
    type: Number,
    required: true,
  })
  maxLevel: number;
  @Prop({
    type: String,
    required: true,
  })
  name: string;
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  status: boolean;
}

export const CooptEngineSettingsSchema =
  SchemaFactory.createForClass(CooptEngineSettings);
