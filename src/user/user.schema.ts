import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';
import { userability } from './dtos/create-user-dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  phone: string;

  @Prop()
  landingurl: string;

  @Prop()
  cv: string;

  @Prop({
    required: true,
  })
  roles: Role[];

  @Prop()
  ability: userability[];
}

export const UserSchema = SchemaFactory.createForClass(User);
