import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { decryptString, encryptString } from 'src/utils';
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
      email: user.email,
      sub: user._id,
      roles: user.roles,
    };
    const access_token = this.jwtService.sign(payload);

    const roles = user.roles.map((ele: any) =>
      encryptString(ele, access_token.slice(0, 16)),
    );
    const ability = user.ability.map((ele: any) => ({
      action: encryptString(ele.action, access_token.slice(0, 16)),
      subject: encryptString(ele.subject, access_token.slice(0, 16)),
    }));
    const userData = {
      ...user,
      roles: roles,
      ability: ability,
    };

    return {
      access_token: access_token,
      user_data: {
        ...userData,
        avatar: user.avatar,
        email: user.email,
        username: user.username,
      },
    };
  }
}
