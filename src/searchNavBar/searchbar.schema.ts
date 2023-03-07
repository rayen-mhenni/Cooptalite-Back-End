import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SearchnavbarDTO } from './dtos/searchnavbar.dtos';

export type SearchNavBarDocument = SearchNavBar & Document;
@Schema()
export class SearchNavBar {
  @Prop({
    required: true,
    type: String,
  })
  groupTitle: string;

  @Prop({
    required: true,
  })
  searchLimit: number;

  @Prop([
    {
      required: true,
      type: SearchnavbarDTO,
    },
  ])
  data: SearchnavbarDTO[];
}

export const SearchNavBarSchema = SchemaFactory.createForClass(SearchNavBar);
