import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CvtechDocument = Cvtech & Document;

@Schema()
export class Cvtech {
  @Prop({})
  firstname: string;

  @Prop({})
  lastname: string;

  @Prop({})
  email: string;

  @Prop({
    type: Array,
  })
  skills: string[];
  @Prop({
    type: Array,
  })
  certificates: string[];

  @Prop({})
  media: string[];

  @Prop({})
  phone: string;
  @Prop([
    {
      type: String,
    },
  ])
  experience: string;

  @Prop([
    {
      type: String,
    },
  ])
  education: string;

  @Prop([
    {
      type: String,
    },
  ])
  languages: string;

  @Prop({})
  status: string;
  @Prop({})
  categorie: string;
  @Prop({ required: true })
  cvname: string;
  @Prop({
    type: String,
  })
  imgUrl: string;
  @Prop({
    type: String,
  })
  post: string;
  @Prop({
    type: String,
  })
  profile: string;
}

export const CvtechSchema = SchemaFactory.createForClass(Cvtech);
