import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNil } from 'lodash';
import { Model } from 'mongoose';
import {
  CooptEngineSettings,
  CooptEngineSettingsDocument,
} from './coopt-engine-settings.schema';
import { CooptEngineSettingsDTO } from './dtos/coopt-engine-settings.DTO';

@Injectable()
export class CooptEngineSettingsService {
  constructor(
    @InjectModel('CooptEngineSettings')
    private readonly cooptEngineSettingModule: Model<CooptEngineSettingsDocument>,
  ) {}

  async addCooptEngineSettings(
    cooptEngineSettingsDTO: CooptEngineSettingsDTO,
  ): Promise<any> {
    const settings = await this.cooptEngineSettingModule.findOne({
      maxLevel: cooptEngineSettingsDTO.maxLevel,
      name: cooptEngineSettingsDTO.name,
      manualSteps: cooptEngineSettingsDTO.manualSteps,
      percentage: cooptEngineSettingsDTO.percentage,
      amount: cooptEngineSettingsDTO.amount,
      mode: cooptEngineSettingsDTO.mode,
      status: cooptEngineSettingsDTO.status,
    });

    if (!settings) {
      const newCooptEngineSetting = await this.cooptEngineSettingModule.create(
        cooptEngineSettingsDTO,
      );
      return newCooptEngineSetting.save();
    } else {
      throw new HttpException('Settings already exist', HttpStatus.BAD_REQUEST);
    }
  }
  async updatecooptEngineSettings(
    id: string,
    cooptEngineSettingsDTO: CooptEngineSettingsDTO,
  ): Promise<any> {
    const settings = await this.cooptEngineSettingModule.findById(id);

    if (settings) {
      await this.cooptEngineSettingModule.findByIdAndUpdate(settings._id, {
        name: cooptEngineSettingsDTO.name || settings.name,
        maxLevel: cooptEngineSettingsDTO.maxLevel || settings.maxLevel,
        manualSteps: cooptEngineSettingsDTO.manualSteps || settings.manualSteps,
        percentage: cooptEngineSettingsDTO.percentage || settings.percentage,
        amount: cooptEngineSettingsDTO.amount || settings.amount,
        mode: cooptEngineSettingsDTO.mode || settings.mode,
        status: !isNil(cooptEngineSettingsDTO.status)
          ? cooptEngineSettingsDTO.status
          : settings.status,
      });

      return settings;
    } else {
      throw new HttpException('settings Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async findCooptEngineSetting(
    name: string,
  ): Promise<CooptEngineSettings | undefined> {
    const CooptEngineSetting = await this.cooptEngineSettingModule.findOne({
      name: name,
    });

    if (!CooptEngineSetting) {
      throw new HttpException(
        'CooptEngineSetting Not Found ',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return CooptEngineSetting;
    }
  }
  async findCooptEngineSettingById(
    id: string,
  ): Promise<CooptEngineSettings | undefined> {
    const CooptEngineSetting = await this.cooptEngineSettingModule.findById(id);

    if (!CooptEngineSetting) {
      throw new HttpException(
        'CooptEngineSetting Not Found ',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return CooptEngineSetting;
    }
  }
  async findAllCooptEngineSetting(): Promise<
    CooptEngineSettings[] | undefined
  > {
    const CooptEngineSetting = await this.cooptEngineSettingModule.find();

    if (!CooptEngineSetting) {
      throw new HttpException(
        'No CooptEngineSetting is Found ',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return CooptEngineSetting;
    }
  }
  async findAllCooptEngineSettingValid(): Promise<
    CooptEngineSettings | undefined
  > {
    const CooptEngineSetting = await this.cooptEngineSettingModule.findOne({
      status: true,
    });
    if (!CooptEngineSetting) {
      throw new HttpException(
        'No valid CooptEngineSetting is Found ',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return CooptEngineSetting;
    }
  }
  async deleteCooptEngineSetting(
    id: string,
  ): Promise<CooptEngineSettings | undefined> {
    const CooptEngineSetting =
      await this.cooptEngineSettingModule.findOneAndDelete({ _id: id });
    if (!CooptEngineSetting) {
      throw new HttpException(
        'CooptEngineSetting Not Found ',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return CooptEngineSetting;
    }
  }
}
