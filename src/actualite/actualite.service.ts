import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { actualite, actualiteDocument } from './actualite.schema';
import { actualiteDTO } from './dtos/actualiteDTO';

@Injectable()
export class ActualiteService {
  constructor(
    @InjectModel('Actualite')
    private readonly actualiteModule: Model<actualiteDocument>,
  ) {}

  async addactualites(actualiteDTO: actualiteDTO): Promise<any> {
    const actualite = await this.actualiteModule.findOne({
      title: actualiteDTO.title,
    });

    if (!actualite) {
      const newActualite = await this.actualiteModule.create(actualiteDTO);
      return newActualite.save();
    } else {
      throw new HttpException(
        'Actualite already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateactualites(id: string, actualiteDTO: actualiteDTO): Promise<any> {
    const actualite = await this.actualiteModule.findById(id);

    if (actualite) {
      await this.actualiteModule.findByIdAndUpdate(actualite._id, {
        imgUrl: actualiteDTO.imgUrl || actualite.imgUrl,
        title: actualiteDTO.title || actualite.title,
        tags: actualiteDTO.tags || actualite.tags,
        desc: actualiteDTO.desc || actualite.desc,
        favorite: actualiteDTO.favorite || actualite.favorite,
        status: actualiteDTO.status || actualite.status,
      });

      return actualite;
    } else {
      throw new HttpException('Actualite Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateFavorite(id: string, favorite: string[]): Promise<any> {
    if (actualite) {
      await this.actualiteModule.findByIdAndUpdate(id, {
        favorite: favorite,
      });

      return actualite;
    } else {
      throw new HttpException('Actualite Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async findActualite(title: string): Promise<actualite | undefined> {
    const actualite = await this.actualiteModule.findOne({ title: title });

    if (!actualite) {
      throw new HttpException('Actualite Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return actualite;
    }
  }

  async findAllActualite(): Promise<actualite[] | undefined> {
    const actualite = await this.actualiteModule.find();
    if (!actualite) {
      throw new HttpException('No Actualite is Found ', HttpStatus.NOT_FOUND);
    } else {
      return actualite;
    }
  }
  async findAllActualiteValid(): Promise<actualite[] | undefined> {
    const actualite = await this.actualiteModule.find({ status: true });
    if (!actualite) {
      throw new HttpException('No Actualite is Found ', HttpStatus.NOT_FOUND);
    } else {
      return actualite;
    }
  }

  async deleteActualite(id: string): Promise<actualite | undefined> {
    const actualite = await this.actualiteModule.findOneAndDelete({ _id: id });
    if (!actualite) {
      throw new HttpException('Actualite Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return actualite;
    }
  }
}
