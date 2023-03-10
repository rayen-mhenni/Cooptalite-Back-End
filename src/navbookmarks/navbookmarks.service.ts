import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

import { CreateFavoriteDTO, NavobjData } from './dtos/navbookmarks-dto';
import { Favorite, FavoriteDocument } from './navbookmarks.schema';
import { Console } from 'console';

@Injectable()
export class NavBookService {
  constructor(
    @InjectModel('Favorite')
    private readonly FavoriteModel: Model<FavoriteDocument>,
  ) {}

  async addFavorite(CreateFavoriteDTO: any): Promise<any> {
    const OldFavorite = await this.FavoriteModel.findOne({
      userId: CreateFavoriteDTO.userId,
    });

    if (!OldFavorite) {
      const newFavorite = await this.FavoriteModel.create(CreateFavoriteDTO);
      return newFavorite.save();
    } else {
      const existingData = await this.FavoriteModel.findOne({
        userId: CreateFavoriteDTO.userId,
      });

      const existingObj = existingData.NavObj.find(
        (obj: any) => obj?.title === CreateFavoriteDTO?.NavObj?.title,
      );

      const exist = existingObj ? true : false;

      if (!exist) {
        const navbookmarks = await this.FavoriteModel.findOneAndUpdate(
          { _id: OldFavorite._id },
          {
            $push: {
              NavObj: {
                ...CreateFavoriteDTO.NavObj,
                id: OldFavorite.NavObj.length + 1,
              },
            },
          },
          { new: true },
        );

        return navbookmarks;
      } else {
        const navbookmarks = await this.FavoriteModel.findOneAndUpdate(
          { _id: OldFavorite._id },
          { $pull: { NavObj: { title: CreateFavoriteDTO?.NavObj?.title } } },
          { new: true },
        );
        return navbookmarks;
      }
    }
  }

  async deleteFavorite(id: string): Promise<Favorite | undefined> {
    const Favorite = await this.FavoriteModel.findOneAndDelete({ _id: id });
    if (!Favorite) {
      throw new HttpException('Favorite Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Favorite;
    }
  }
  async findFavoriteList(): Promise<any | undefined> {
    const Favorite = await this.FavoriteModel.find().populate({
      path: 'userId',
    });
    if (!Favorite) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Favorite;
    }
  }
  async findFavoritebyUserId(userId: string): Promise<any | undefined> {
    const Favorite = await this.FavoriteModel.findOne({ userId });

    if (!Favorite) {
      throw new HttpException('Favorite Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Favorite;
    }
  }
  async findFavoriteById(id: string): Promise<any | undefined> {
    const Favorite = await this.FavoriteModel.findById({ _id: id });
    if (!Favorite) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Favorite;
    }
  }

  async addFavoriteByID(
    id: string,
    CreateFavoriteDTO: NavobjData,
  ): Promise<Favorite | undefined> {
    const existingData = await this.FavoriteModel.findOne({ _id: id });

    if (!existingData) {
      return undefined;
    }

    const existingidObj = existingData.NavObj.find(
      (obj: any) => obj.title === CreateFavoriteDTO.title,
    );

    if (existingidObj) {
      throw new HttpException('TITLE must be unique', HttpStatus.NOT_FOUND);
    }

    const navbookmarks = await this.FavoriteModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          NavObj: { ...CreateFavoriteDTO, id: existingData.NavObj.length + 1 },
        },
        $set: { [`title.${CreateFavoriteDTO.title}`]: CreateFavoriteDTO },
      },
      { new: true },
    );

    return navbookmarks;
  }
}
