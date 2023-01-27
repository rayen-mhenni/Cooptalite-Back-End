import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop()
  tags: string[];

  @Prop({
    required: true,
  })
  startDate: string;

  @Prop({
    required: true,
  })
  endDate: string;

  @Prop()
  imgUrl: string;

 
}

export const EventSchema = SchemaFactory.createForClass(Event);
