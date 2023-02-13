import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import mongoose, { Document } from 'mongoose';
import { comment } from 'src/actualite/dtos/actualiteDTO';
import { User } from 'src/user/user.schema';

export type CommentDocument = Comments & Document;

@Schema()
export class Comments {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;
  @Prop({
    required: true,
    type: String,
    default: moment().format('MMMM Do, YYYY, hh:mm a'),
  })
  date: string;

  @Prop({
    required: true,
    type: String,
  })
  comment: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ])
  listReply: Comments[];
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
