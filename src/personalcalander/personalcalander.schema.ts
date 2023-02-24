import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { event } from './dtos/personalcalander.dto';


export type PersonalcalanderDocument = Personalclander & Document;

@Schema()
export class Personalclander {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop(
    {
      required: true,
    
    },
  )
  date:string;
  @Prop()
  listOfActivity:event[];
  
}

export const PersonalclanderSchema = SchemaFactory.createForClass(Personalclander);
