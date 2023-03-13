import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Cagnotte as Cagnotteobj } from './dtos/cagnotte.DTO';

export type CagnotteDocument = Cagnotte & Document;

@Schema()
export class Cagnotte {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;

  @Prop({
    type: String,
  })
  month: string;

  @Prop([
    {
      type: Cagnotteobj,
    },
  ])
  list: Cagnotteobj[];
}

export const CagnotteSchema = SchemaFactory.createForClass(Cagnotte);
