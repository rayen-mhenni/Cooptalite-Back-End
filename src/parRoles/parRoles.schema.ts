import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Ability } from './ability.schema';


export type parRolesDocument = ParRoles & Document;


@Schema()
export class ParRoles {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: Boolean,
    default: true
  })
  status: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ability' }] })
  ability: Ability[];

}

export const ParRolesSchema = SchemaFactory.createForClass(ParRoles);
