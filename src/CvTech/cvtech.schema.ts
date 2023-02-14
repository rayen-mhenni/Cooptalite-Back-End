import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Education, Experience, Language, media } from './dtos/cvtech-dtos';

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
  media: media[];

  @Prop({})
  phone: string;
  @Prop([
    {
      type: Experience,
    },
  ])
  experience: Experience[];

  @Prop([
    {
      type: Education,
    },
  ])
  education: Education[];

  @Prop([
    {
      type: Language,
    },
  ])
  languages: Language[];

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
