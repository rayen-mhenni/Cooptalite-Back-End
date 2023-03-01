import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Step } from './dtos/coopt-engine-settings.DTO';

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
  @Prop({
    type: String,
  })
  amount: string;
  @Prop({
    type: String,
  })
  percentage: string;
  @Prop({
    type: String,
  })
  mode: string;
  @Prop([
    {
      type: Step,
    },
  ])
  manualSteps: Step[];
}

export const CooptEngineSettingsSchema =
  SchemaFactory.createForClass(CooptEngineSettings);
