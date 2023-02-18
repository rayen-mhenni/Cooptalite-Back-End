import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SearchNavBar, SearchNavBarDocument } from './searchbar.schema';
import {
  ContactsObj,
  FilesObj,
  PagesObj,
  SearchnavbarDTO,
  SearchObj,
} from './dtos/searchnavbar.dtos';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { MessageBody } from '@nestjs/websockets';

@Injectable()
export class SearchNavBarService {
  constructor(
    @InjectModel('SearchNavBar')
    private readonly SearchNavBarwModel: Model<SearchNavBarDocument>,
  ) {}

  async addSearchNavBar(createSearchNavBarDTO: SearchnavbarDTO): Promise<any> {
    const ancienSearchNavBar = await this.SearchNavBarwModel.findOne({
      groupTitle: createSearchNavBarDTO.groupTitle,
      searchLimit: createSearchNavBarDTO.searchLimit,
    });

    if (!ancienSearchNavBar) {
      const data = await this.SearchNavBarwModel.create(createSearchNavBarDTO);

      return data;
    } else {
      throw new HttpException(
        'SearchNavBar already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findsearchNav(): Promise<any | undefined> {
    const SearchNavBar = await this.SearchNavBarwModel.find();
    if (!SearchNavBar) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return SearchNavBar;
    }
  }

  async updatesearchnavbar(
    id: string,
    searchnavbarDTO: SearchnavbarDTO,
  ): Promise<any> {
    const searchnavbar = await this.SearchNavBarwModel.findById(id);

    if (searchnavbar) {
      const newsearchnavbar = await this.SearchNavBarwModel.findByIdAndUpdate(
        searchnavbar._id,
        {
          groupTitle: searchnavbarDTO.groupTitle || searchnavbar.groupTitle,
          searchLimit: searchnavbarDTO.searchLimit || searchnavbar.searchLimit,
          data: searchnavbarDTO.data || searchnavbar.data,
        },
      );

      return newsearchnavbar;
    } else {
      throw new HttpException('searchnavbar Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async deletesearchnavbar(id: string): Promise<SearchNavBar | undefined> {
    const searchnavbar = await this.SearchNavBarwModel.findOneAndDelete({
      _id: id,
    });
    if (!searchnavbar) {
      throw new HttpException('searchnavbar Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return searchnavbar;
    }
  }

  async updatesearchnavbarByTitle(
    id: string,
    title: string,
    searchnavbarDTO: SearchObj,
  ): Promise<any> {
    const searchnavbar = await this.SearchNavBarwModel.updateOne(
      { _id: id },
      { $set: { 'data.$[t]': searchnavbarDTO } },
      { arrayFilters: [{ 't.title': title }] },
    );

    if (searchnavbar) {
      return searchnavbar;
    } else {
      throw new HttpException('searchnavbar not found', HttpStatus.NOT_FOUND);
    }
  }

  async deletesearchnavbarByTitle(
    id: string,
    title: string,
    searchnavbarDTO: SearchObj,
  ): Promise<SearchNavBar | undefined> {
    const searchnavbar = await this.SearchNavBarwModel.deleteOne({
      _id: id,
      'data.title': title,
    });

    if (searchnavbar.deletedCount === 1) {
      throw new HttpException('searchnavbar deleyed', HttpStatus.CREATED);
    } else {
      throw new HttpException('searchnavbar not found', HttpStatus.NOT_FOUND);
    }
  }

  async addDataObj(id: string, searchnavbarDTO: SearchObj): Promise<SearchNavBar | undefined> {
    const existingData = await this.SearchNavBarwModel.findOne({ _id: id });
  
    if (!existingData) {
      return undefined;
    }
  
    const existingTitleObj = existingData.data.find(item => item.title === searchnavbarDTO.title);
  
    if (existingTitleObj) {
      throw new HttpException('Title must be unique', HttpStatus.NOT_FOUND);
    }
  
    const searchnavbar = await this.SearchNavBarwModel.findOneAndUpdate(
      { _id: id },
      { 
        $push: { data: searchnavbarDTO },
        $set: { [`title.${searchnavbarDTO.title}`]: searchnavbarDTO } 
      },
      { new: true }
    );
  
    return searchnavbar;
  }

 
}
