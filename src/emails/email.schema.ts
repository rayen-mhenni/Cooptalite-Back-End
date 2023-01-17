import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/user.schema';
import { attachments, from, to } from './dtos/email-dtos';

export type EmailDocument = Email & Document;
@Schema()
export class Email {
  @Prop({ type: Object })
  from: from;
  @Prop({ type: Object })
  to: to;

  @Prop()
  subject: string;
  @Prop()
  cc: string[];
  @Prop()
  bcc: string[];
  @Prop()
  message: string;

  @Prop({ type: Object })
  attachments: attachments;
  @Prop()
  isStarred: boolean;
  @Prop()
  labels: string[];
  @Prop()
  time: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Email',
      required: false,
    },
  ])
  replies: Email[];
  @Prop({ default: 'Sent' })
  folder: string;
  @Prop({ default: false })
  isRead: boolean;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
