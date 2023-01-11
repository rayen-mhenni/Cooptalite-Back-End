import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';
import { userprofileData, userability } from './dtos/create-user-dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Object })
  profileData: userprofileData;

  @Prop()
  password: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ])
  linkedUsers: User[];

  @Prop()
  ability: userability[];
}

export const UserSchema = SchemaFactory.createForClass(User);
