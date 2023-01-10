import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDTO } from './dtos/create-user-dto';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ResetUserPasswordDto } from './dtos/ResetUserPasswordDto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<any> {
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

  async updateuserprofile(
    id: string,
    createUserDTO: CreateUserDTO,
  ): Promise<any> {
    const user = await this.userModel.findById(id);

    if (user) {
      const newUser = await this.userModel.findByIdAndUpdate(user._id, {
        email: createUserDTO.email || user.email,
        username: createUserDTO.username || user.username,
        avatar: createUserDTO.avatar || user.avatar,
        cv: createUserDTO.cv || user.cv,
        phone: createUserDTO.phone || user.phone,
        landingurl: createUserDTO.landingurl || user.landingurl,
      });

      return newUser;
    } else {
      throw new HttpException('Email Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateuser(id: string, createUserDTO: CreateUserDTO): Promise<any> {
    const user = await this.userModel.findById(id);

    if (user) {
      const newpass = await bcrypt.hash(createUserDTO.password, 10);
      const newrole = createUserDTO.roles;

      await this.userModel.findByIdAndUpdate(user._id, {
        email: createUserDTO.email || user.email,
        username: createUserDTO.username || user.username,
        avatar: createUserDTO.avatar || user.avatar,
        password: newpass,
        roles: newrole,
        ability: createUserDTO.ability || user.ability,
        phone: createUserDTO.phone || user.phone,
        landingurl: createUserDTO.landingurl || user.landingurl,
        cv: createUserDTO.cv || user.cv,
      });

      return user;
    } else {
      throw new HttpException('Email Not exist', HttpStatus.NOT_FOUND);
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

  /* users: [
//     {
//       id: 1,
//       fullName: 'Galen Slixby',
//       company: 'Yotz PVT LTD',
//       role: 'editor',
//       username: 'gslixby0',
//       country: 'El Salvador',
//       contact: '(479) 232-9151',
//       email: 'gslixby0@abc.net.au',
//       status: 'inactive',
//       avatar: '',
//       avatarColor: 'light-primary'
//     },*/

  async findUserByRole(): Promise<any | undefined> {
    const user = await this.userModel.aggregate([
      {
        $group: {
          _id: '$role',
          users: { $push: '$$ROOT' },
          totalUsers: { $count: {} },
        },
      },
    ]);

    if (!user) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async deleteuser(id: string): Promise<User | undefined> {
    const user = await this.userModel.findOneAndDelete({ _id: id });
    if (!user) {
      throw new HttpException('User Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async ResetUserPassword(restpassDto: ResetUserPasswordDto): Promise<any> {
    const user = await this.userModel.findOne({ email: restpassDto.email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        restpassDto.oldPassword,
        user.password,
      );

      if (isPasswordMatch) {
        const newpassword = await bcrypt.hash(restpassDto.newPassword, 10);

        await this.userModel.findByIdAndUpdate(user._id, {
          password: newpassword,
        });

        return { message: 'Password updated with success' };
      } else {
        throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('User not FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
