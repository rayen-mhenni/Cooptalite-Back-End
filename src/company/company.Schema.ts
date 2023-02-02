import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
  })
  branding: string;

  @Prop()

  field: string;

  @Prop({
    required: true,
  })
  nbemployees: string;

  @Prop({
    required: true,
  })
  about: string;

  @Prop()
  logo: string;

  @Prop()
  cover: string;


}

export const CompanySchema = SchemaFactory.createForClass(Company);
