import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

export type actualiteDocument = actualite & Document;

@Schema()
export class actualite {
  @Prop({
    required: true,
    type: String,
  })
  imgUrl: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  desc: string;

  @Prop({
    required: true,
    type: Boolean,
  })
  status: boolean;

  @Prop({
    type: Array,
  })
  tags: string[];

  @Prop([
    {
      type: Array,
    },
  ])
  favorite: string[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ])
  comments: Comments[];
}

export const actualiteSchema = SchemaFactory.createForClass(actualite);
