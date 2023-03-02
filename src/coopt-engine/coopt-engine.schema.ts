import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/user.schema';

export type CooptEngineDocument = CooptEngine & Document;

@Schema()
export class CooptEngine {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;
  @Prop({
    type: Boolean,
    default: false,
  })
  isRoot: boolean;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  parentId: User;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ])
  listOfChildId: User[];
}

export const CooptEngineSchema = SchemaFactory.createForClass(CooptEngine);
