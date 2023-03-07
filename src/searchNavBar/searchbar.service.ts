import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SearchNavBar, SearchNavBarDocument } from './searchbar.schema';
import { SearchnavbarDTO, SearchObj } from './dtos/searchnavbar.dtos';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

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
  ): Promise<SearchNavBar | undefined> {
    const searchnavbar = await this.SearchNavBarwModel.findOneAndUpdate(
      { _id: id },
      { $pull: { data: { title } } },
      { new: true },
    );

    if (searchnavbar) {
      return searchnavbar;
    } else {
      throw new HttpException('searchnavbar not found', HttpStatus.NOT_FOUND);
    }
  }

  async addDataObj(
    id: string,
    searchnavbarDTO: SearchObj,
  ): Promise<SearchNavBar | undefined> {
    const existingData = await this.SearchNavBarwModel.findOne({ _id: id });

    if (!existingData) {
      return undefined;
    }

    const existingTitleObj = existingData.data.find(
      (obj: any) => obj.title === searchnavbarDTO.title,
    );

    if (existingTitleObj) {
      throw new HttpException('Title must be unique', HttpStatus.NOT_FOUND);
    }

    const searchnavbar = await this.SearchNavBarwModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          data: { ...searchnavbarDTO, id: existingData.data.length + 1 },
        },
        $set: { [`title.${searchnavbarDTO.title}`]: searchnavbarDTO },
      },
      { new: true },
    );

    return searchnavbar;
  }
}
