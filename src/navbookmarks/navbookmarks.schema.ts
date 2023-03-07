import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/user.schema';
import { NavobjData } from './dtos/navbookmarks-dto';

export type FavoriteDocument = Favorite & Document;
@Schema()
export class Favorite {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: string;

  @Prop([
    {
      required: true,
      type: NavobjData,
    },
  ])
  NavObj: NavobjData[];
}
export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
