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
    required: false,
  })
  modedemploi: string;

  @Prop()
  companyDescription: string;

  @Prop()
  requiredSkills: string[];

  @Prop()
  expYears: string;



  @Prop()
  startDate: string;

  @Prop()
  duration: string;
  @Prop({
    type: Array,
  })
  status: string[];

}

export const OfferSchema = SchemaFactory.createForClass(Offer);
