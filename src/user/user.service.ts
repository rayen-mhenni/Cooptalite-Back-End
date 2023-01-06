import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDTO } from './dtos/create-user-dto';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<any> {
    //test if mail exist :
    const OldUser = await this.userModel.findOne({
      email: createUserDTO.email,
    });

    if (!OldUser) {
      const newUser = await this.userModel.create(createUserDTO);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      return newUser.save();
    } else {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new HttpException('Email Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }
}
