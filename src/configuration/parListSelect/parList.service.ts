import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNil } from 'lodash';
import { Model } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';
import { CommentsService } from 'src/comments/comments.service';
import { User } from 'src/user/user.schema';
import { parList, parListDocument } from './parList.schema';
import { parListDTO } from './dtos/parListDTO';

@Injectable()
export class ParListService {
  constructor(
    @InjectModel('ParList')
    private readonly parListModule: Model<parListDocument>,
  ) {}

  async addparList(parListDTO: parListDTO): Promise<any> {
    const parList = await this.parListModule.findOne({
      parcode: parListDTO.parcode,
      parvalue: parListDTO.parvalue,
    });

    if (!parList) {
      const newParList = await this.parListModule.create(parListDTO);
      return newParList.save();
    } else {
      throw new HttpException('ParList already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async updateparLists(id: string, parListDTO: parListDTO): Promise<any> {
    const parList = await this.parListModule.findById(id);

    if (parList) {
      await this.parListModule.findByIdAndUpdate(parList._id, {
        parvalue: parListDTO.parvalue || parList.parvalue,
        parvaluelabel: parListDTO.parvaluelabel || parList.parvaluelabel,
        parent: isNil(parListDTO.parent) ? parList.parent : parListDTO.parent,
        parcode: parListDTO.parcode || parList.parcode,
      });

      return parList;
    } else {
      throw new HttpException('ParList Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async findParListByParcode(parcode: string): Promise<parList[] | undefined> {
    const parList = await this.parListModule.find({ parcode: parcode });

    if (!parList) {
      throw new HttpException('ParList Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return parList;
    }
  }

  async findAllParList(): Promise<parList[] | undefined> {
    const parList = await this.parListModule.find();
    if (!parList) {
      throw new HttpException('No ParList is Found ', HttpStatus.NOT_FOUND);
    } else {
      return parList;
    }
  }

  async deleteParList(id: string): Promise<parList | undefined> {
    const parList = await this.parListModule.findOneAndDelete({ _id: id });
    if (!parList) {
      throw new HttpException('ParList Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return parList;
    }
  }
}
