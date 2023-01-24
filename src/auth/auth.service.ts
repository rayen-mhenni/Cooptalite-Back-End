import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { decryptString, encryptString } from 'src/utils';
import 'dotenv/config';
import { stringify } from 'querystring';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUser(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.profileData.userAbout.email,
      sub: user._id,
      role: user.profileData.role,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    const role = encryptString(
      user.profileData.role,
      access_token.slice(0, 16),
    );

    const ability = user.ability.map((ele: any) => ({
      action: encryptString(ele.action, access_token.slice(0, 16)),
      subject: encryptString(ele.subject, access_token.slice(0, 16)),
    }));

    const userData = {
      ...user,
      role: role,
      ability: ability,
      landingurl: user.profileData.landingurl,
    };

    return {
      access_token: access_token,
      user_data: {
        ...userData,
        avatar: user.profileData.header.avatar,
        email: user.profileData.userAbout.email,
        username: user.profileData.header.username,
        landingurl: user.profileData.landingurl,
      },
    };
  }
}
