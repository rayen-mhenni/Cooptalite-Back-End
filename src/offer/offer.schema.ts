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
  companyDescription: string;

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
  startDate: string;

  @Prop({
    required: true,
  })
  duration: string;


  @Prop({
    required: true,

  })
  status: string;

}

export const OfferSchema = SchemaFactory.createForClass(Offer);
