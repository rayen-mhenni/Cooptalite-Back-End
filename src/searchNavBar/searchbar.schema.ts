import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  PagesObj,
  ContactsObj,
  FilesObj,
  SearchnavbarDTO,
} from './dtos/searchnavbar.dtos';

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
  searchLimit: Number;

  @Prop([
    {
      required: true,
      type: SearchnavbarDTO,
    },
  ])
  data: SearchnavbarDTO[];
}

export const SearchNavBarSchema = SchemaFactory.createForClass(SearchNavBar);
