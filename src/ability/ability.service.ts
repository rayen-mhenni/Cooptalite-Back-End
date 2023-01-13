import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ability } from '../parRoles/dtos/parRoleDto';
import { Ability, AbilityDocument } from './ability.schema';

@Injectable()
export class AbilityService {
  constructor(
    @InjectModel('Ability')
    private readonly AbilityModule: Model<AbilityDocument>,
  ) {}
  async addAbility(ability: ability): Promise<any> {
    const newRole = await this.AbilityModule.create(ability);
    return newRole.save();
  }

  async updateAbility(id: string, ability: ability): Promise<any> {
    const Ability = await this.AbilityModule.findById(id);

    if (Ability) {
      await this.AbilityModule.findByIdAndUpdate(Ability._id, {
        subject: ability.subject || Ability.subject,
        status: ability.status || Ability.status,
        action: ability.action || Ability.action,
      });

      return Ability;
    } else {
      throw new HttpException('Ability Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async deleteAbility(id: string): Promise<any> {
    const Ability = await this.AbilityModule.findOneAndDelete({ _id: id });
    if (!Ability) {
      throw new HttpException('Ability Not Found', HttpStatus.NOT_FOUND);
    } else {
      return Ability;
    }
  }

  async deleteAbilityBySubject(subject: string): Promise<any> {
    const Ability = await this.AbilityModule.deleteMany({ subject });
    if (!Ability) {
      throw new HttpException(
        'Ability Not Found by Subject ',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return Ability;
    }
  }

  async findAbility(): Promise<Ability[] | undefined> {
    const Ability = await this.AbilityModule.aggregate([
      {
        $group: {
          _id: '$subject',
          listability: { $push: '$$ROOT' },
        },
      },
    ]);
    {
    }
    if (!Ability) {
      throw new HttpException('No Ability is Found ', HttpStatus.NOT_FOUND);
    } else {
      return Ability;
    }
  }
  async findAvailableAbility(): Promise<Ability[] | undefined> {
    const Ability = await this.AbilityModule.aggregate([
      { $match: { status: true } },
      {
        $group: {
          _id: '$subject',
          listability: { $push: '$$ROOT' },
        },
      },
    ]);
    {
    }
    if (!Ability) {
      throw new HttpException('No Ability is Found ', HttpStatus.NOT_FOUND);
    } else {
      return Ability;
    }
  }
}
