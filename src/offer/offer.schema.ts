import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  modedemploi: string;

  @Prop()
  companyDescription: string;

  @Prop()
  requiredSkills: string[];

  @Prop()
  expYears: string;

  @Prop()
  company: string;

  @Prop()
  startDate: string;

  @Prop()
  duration: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
