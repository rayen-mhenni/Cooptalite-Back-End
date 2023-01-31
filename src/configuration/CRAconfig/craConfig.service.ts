import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNil } from 'lodash';
import moment from 'moment';
import { Model } from 'mongoose';
import { craConfig, craConfigDocument } from './craConfig.schema';
import { craConfigDTO } from './dtos/craConfigDTO';

@Injectable()
export class CraConfigService {
  constructor(
    @InjectModel('CraConfig')
    private readonly craConfigModule: Model<craConfigDocument>,
  ) {}

  async addcraConfig(craConfigDTO: craConfigDTO): Promise<any> {
    const craConfig = await this.craConfigModule.findOne({
      userId: craConfigDTO.userId,
    });
    if (!craConfig) {
      const newCraConfig = await this.craConfigModule.create(craConfigDTO);
      return newCraConfig.save();
    } else {
      throw new HttpException(
        'ConfigCRA already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatecraConfig(id: string, craConfigDTO: craConfigDTO): Promise<any> {
    let craConfig = await this.craConfigModule.findById(id);

    if (craConfig) {
      craConfig = await this.craConfigModule.findByIdAndUpdate(craConfig._id, {
        extendedProps: craConfigDTO.extendedProps ?? craConfig.extendedProps,
        parcodeactivity:
          craConfigDTO.parcodeactivity ?? craConfig.parcodeactivity,
        parcodecategorie:
          craConfigDTO.parcodecategorie ?? craConfig.parcodecategorie,
      });

      return craConfig;
    } else {
      throw new HttpException('CraConfig Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async findCraConfigByUserId(userId: string): Promise<craConfig | undefined> {
    const craConfig = await this.craConfigModule
      .findOne({ userId: userId })
      .populate({
        path: 'userId',
        model: 'User',
        select: 'profileData.header',
      });

    if (!craConfig) {
      throw new HttpException('CraConfig Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return craConfig;
    }
  }

  async findAllCraConfig(): Promise<craConfig[] | undefined> {
    const craConfig = await this.craConfigModule.find().populate({
      path: 'userId',
      model: 'User',
      select: 'profileData.userAbout',
    });
    if (!craConfig) {
      throw new HttpException('No CraConfig is Found ', HttpStatus.NOT_FOUND);
    } else {
      return craConfig;
    }
  }

  async deleteCraConfig(id: string): Promise<craConfig | undefined> {
    const craConfig = await this.craConfigModule.findOneAndDelete({ _id: id });
    if (!craConfig) {
      throw new HttpException('CraConfig Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return craConfig;
    }
  }
}
