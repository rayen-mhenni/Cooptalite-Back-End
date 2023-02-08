import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDTO } from './dtos/create-user-dto';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ResetUserPasswordDto } from './dtos/ResetUserPasswordDto';
import { isEmpty, isNil } from 'lodash';
import { CooptationDocument } from 'src/cooptation/cooptation.schema';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('cooptation')
    private readonly cooptationModule: Model<CooptationDocument>,
  ) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<any> {
    const email = createUserDTO?.profileData?.userAbout?.email;

    const OldUser = await this.userModel.find({
      'profileData.userAbout.email': email,
    });

    if (!OldUser[0]) {
      const newUser = await this.userModel.create(createUserDTO);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      return newUser.save();
    } else {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }
  }
  async addUserCandidat(
    createUserDTO: CreateUserDTO,
    id: string,
    offerid: string,
    trustrate: string,
  ): Promise<any> {
    const email = createUserDTO?.profileData?.userAbout?.email;

    const OldUser = await this.userModel.find({
      'profileData.userAbout.email': email,
    });

    if (!OldUser[0]) {
      const newUser = await this.userModel.create(createUserDTO);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      newUser.save();
      // like user to member
      const member = await this.userModel.findById(id);
      member.linkedUsers.push(newUser._id);
      member.save();

      const currentMemberScore = this.calculateScoreCoopt(id);

      //save cooptation
      const newRole = await this.cooptationModule.create({
        member: id,
        candidat: newUser._id,
        offer: offerid,
        cvs: null,
        type: 'offer',
        trustrate,
        currentMemberScore: `${currentMemberScore}`,
        data: moment().format('MMMM Do, YYYY, h:mma'),
      });
      return newRole.save();
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
        'profileData.userAbout.email':
          createUserDTO?.profileData?.userAbout?.email ||
          user.profileData.userAbout?.email,
        'profileData.header.username':
          createUserDTO?.profileData?.header?.username ||
          user.profileData.header?.username,
        'profileData.header.avatar':
          createUserDTO?.profileData?.header?.avatar ||
          user.profileData.header?.avatar,
        'profileData.cvfile': isNil(createUserDTO?.profileData?.cvfile)
          ? user.profileData?.cvfile
          : createUserDTO?.profileData?.cvfile,
        'profileData.header.contact':
          createUserDTO?.profileData.header?.contact ||
          user.profileData.header?.contact,
        'profileData.header.designation':
          createUserDTO?.profileData.header?.designation ||
          user.profileData.header?.designation,
        'profileData.header.coverImg':
          createUserDTO?.profileData.header?.coverImg ||
          user.profileData.header?.coverImg,
        'profileData.userAbout.about':
          createUserDTO?.profileData?.userAbout?.about ||
          user.profileData.userAbout?.about,
        'profileData.userAbout.joined':
          createUserDTO?.profileData?.userAbout?.joined ||
          user.profileData.userAbout?.joined,
        'profileData.userAbout.lives':
          createUserDTO?.profileData?.userAbout?.lives ||
          user.profileData.userAbout?.lives,
        'profileData.userAbout.website':
          createUserDTO?.profileData?.userAbout?.website ||
          user.profileData.userAbout?.website,
        client: createUserDTO.client || user.client,
      });

      return newUser;
    } else {
      throw new HttpException('User Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async updateuser(id: string, createUserDTO: CreateUserDTO): Promise<any> {
    const user = await this.userModel.findById(id);
    if (user) {
      console.log('new pass', createUserDTO?.password);
      const newpassword = await bcrypt.hash(createUserDTO?.password, 10);
      const newUser = await this.userModel.findByIdAndUpdate(user._id, {
        'profileData.userAbout.email':
          createUserDTO?.profileData?.userAbout?.email ||
          user.profileData.userAbout?.email,
        'profileData.header.username':
          createUserDTO?.profileData?.header?.username ||
          user.profileData.header?.username,
        'profileData.header.contact':
          createUserDTO?.profileData.header?.contact ||
          user.profileData.header?.contact,
        'profileData.header.designation':
          createUserDTO?.profileData.header?.designation ||
          user.profileData.header?.designation,
        'profileData.userAbout.lives':
          createUserDTO?.profileData?.userAbout?.lives ||
          user.profileData.userAbout?.lives,
        'profileData.ability': createUserDTO?.ability || user.ability,
        //password: newpassword,
        client: createUserDTO.client || user.client,
        'profileData.role':
          createUserDTO?.profileData.role || user.profileData.role,
      });

      return newUser;
    } else {
      throw new HttpException('User Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async activate(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    if (user) {
      const newUser = await this.userModel.findByIdAndUpdate(user._id, {
        status: 'active',
      });

      return newUser;
    } else {
      throw new HttpException('User Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async deactivate(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    if (user) {
      const newUser = await this.userModel.findByIdAndUpdate(user._id, {
        status: 'inactive',
      });

      return newUser;
    } else {
      throw new HttpException('User Not exist', HttpStatus.NOT_FOUND);
    }
  }

  async findUser(email: string): Promise<any | undefined> {
    const OldUser = await this.userModel.find({
      'profileData.userAbout.email': email,
    });

    if (!OldUser[0]) {
      throw new HttpException('Email Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return OldUser[0];
    }
  }

  async findUserByRole(): Promise<any | undefined> {
    const user = await this.userModel.aggregate([
      {
        $group: {
          _id: '$profileData.role',
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

  async findUsers(): Promise<any | undefined> {
    const user = await this.userModel.find();
    if (!user) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async findUserById(id: string): Promise<any | undefined> {
    const user = await this.userModel.findById(id).populate({
      path: 'linkedUsers',
      model: 'User',
      select: ['profileData.header', 'profileData.userAbout'],
    });
    if (!user) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      const score = this.calculateScoreCoopt(user._id);
      return { ...user, score };
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
    const user = await this.userModel.find({
      'profileData.userAbout.email': restpassDto.email,
    });

    if (user[0]) {
      const isPasswordMatch = await bcrypt.compare(
        restpassDto.oldPassword,
        user[0].password,
      );

      if (isPasswordMatch) {
        const newpassword = await bcrypt.hash(restpassDto.newPassword, 10);

        await this.userModel.findByIdAndUpdate(user[0]._id, {
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

  async ResetMyPassword(id: string, password: any): Promise<any> {
    const user = await this.userModel.findById(id);

    if (user) {
      const newpassword = await bcrypt.hash(password.password, 10);

      await this.userModel.findByIdAndUpdate(user._id, {
        password: newpassword,
      });

      return { message: 'Password updated with success' };
    } else {
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    }
  }

  async calculateScoreCoopt(id: string): Promise<any> {
    const nbcoop = await this.cooptationModule.find({ member: id }).count();
    let nbcoopsucc = 0;

    const coopsucc = await this.cooptationModule.find({ member: id }).populate({
      path: 'candidat',
      select: ['profileData.role'],
    });

    if (coopsucc) {
      coopsucc.forEach((coo) => {
        if (
          coo &&
          coo.candidat != null &&
          coo?.candidat?.profileData?.role === 'member'
        ) {
          nbcoopsucc++;
        }
      });
    }

    let currentMemberScore = 0;

    if (nbcoopsucc != 0) {
      currentMemberScore = (nbcoopsucc / nbcoop) * 100;
    }

    return `${currentMemberScore}%`;
  }
}
