import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


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
    default:true
  })
  status: string;

}

export const ParRolesSchema = SchemaFactory.createForClass(ParRoles);
