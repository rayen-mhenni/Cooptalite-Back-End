import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from 'src/company/company.Schema';

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
  requiredSkills: string[];

  @Prop({
    required: true,
  })
  expYears: string;

  @Prop({
    required: true,
  })
  type: string;

  @Prop({
    required: true,
  })
  contract: string;

  @Prop({
    required: true,
  })
  Address: string;

  @Prop({
    required: true,
  })
  startDate: string;

  @Prop({
    required: true,
  })
  duration: string;

  @Prop({
    required: true,
  })
  status: string;

  @Prop({
    required: true,
  })
  category: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  company: Company;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
