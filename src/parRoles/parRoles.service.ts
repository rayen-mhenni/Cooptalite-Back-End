import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ability, parRolesDTO } from './dtos/parRoleDto';
import { ParRoles, parRolesDocument } from './parRoles.schema';
import { Ability, AbilityDocument } from '../ability/ability.schema';

@Injectable()
export class parRolesService {
  constructor(
    @InjectModel('ParRoles')
    private readonly ParRoleModule: Model<parRolesDocument>,
  ) {}

  async addParRoles(parRolesDTO: parRolesDTO): Promise<any> {
    const OldRole = await this.ParRoleModule.findOne({
      name: parRolesDTO.name,
    });

    if (!OldRole) {
      const newRole = await this.ParRoleModule.create(parRolesDTO);
      return newRole.save();
    } else {
      throw new HttpException('Role already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async updateParRoles(name: string, parRolesDTO: parRolesDTO): Promise<any> {
    const role = await this.ParRoleModule.findOne({ name: name });

    if (role) {
      await this.ParRoleModule.findByIdAndUpdate(role._id, {
        name: parRolesDTO.name || role.name,
        status: parRolesDTO.status || role.status,
        ability: parRolesDTO.ability || role.ability,
      });

      return role;
    } else {
      throw new HttpException('Role Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async findRole(name: string): Promise<ParRoles | undefined> {
    const role = await this.ParRoleModule.findOne({ name: name }).populate({
      path: 'ability',
      strictPopulate: false,
    });
    if (!role) {
      throw new HttpException('Role Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return role;
    }
  }

  async findRoles(): Promise<ParRoles[] | undefined> {
    const roles = await this.ParRoleModule.find().populate({
      path: 'ability',
      strictPopulate: false,
    });

    if (!roles) {
      throw new HttpException('No Roles is Found ', HttpStatus.NOT_FOUND);
    } else {
      return roles;
    }
  }

  async deleteRole(id: string): Promise<ParRoles | undefined> {
    const role = await this.ParRoleModule.findOneAndDelete({ _id: id });
    if (!role) {
      throw new HttpException('Role Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return role;
    }
  }
}
