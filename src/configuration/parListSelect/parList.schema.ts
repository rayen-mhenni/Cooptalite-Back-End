import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type parListDocument = parList & Document;

@Schema()
export class parList {
  @Prop({
    required: true,
    type: String,
  })
  parcode: string;

  @Prop({
    required: true,
    type: String,
  })
  parvalue: string;

  @Prop({
    required: true,
    type: String,
  })
  parvaluelabel: string;

  @Prop({
    type: String,
  })
  parent: string;
}

export const parListSchema = SchemaFactory.createForClass(parList);
