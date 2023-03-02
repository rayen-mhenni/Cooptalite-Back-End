import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user-dto';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard.ts';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ResetUserPasswordDto } from './dtos/ResetUserPasswordDto';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
@Controller('/api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Member)
  @Put('/myprofile/:id')
  async UpdateProfile(@Param('id') id: string, @Body() UserDTO: CreateUserDTO) {
    const user = await this.userService.updateuserprofile(id, UserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  @Get('/MyScore/:id')
  async calculateScoreCoopt(@Param('id') id: string) {
    const score = await this.userService.calculateScoreCoopt(id);
    return { score, userId: id };
  }

  @Put('/updateCooptation/status/:memberId/:cooptationId/:status')
  async updateCooptationstatus(
    @Param('memberId') memberId: string,
    @Param('cooptationId') cooptationId: string,
    @Param('status') status: string,
  ) {
    const cooptation = await this.userService.updateCooptationstatus(
      memberId,
      cooptationId,
      status,
    );
    if (!cooptation) throw new NotFoundException('cooptation does not exist!');
    return cooptation;
  }

  @Post('/email')
  async getuserByEmail(@Body() email: any) {
    const user = await this.userService.findUser(email.email);
    if (!user) throw new NotFoundException('User does not exist!');
    const payload = {
      email: user.profileData.userAbout.email,
      sub: user._id,
      role: user.profileData.role,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return { user, token: access_token };
  }

  @Put('/update/:id')
  async updateuser(@Param('id') id: string, @Body() UserDTO: CreateUserDTO) {
    const user = await this.userService.updateuser(id, UserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }
  @Put('/update/member/:id')
  async updateCondidat(@Param('id') id: string) {
    const user = await this.userService.updateCondidat(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }
  @Put('/activate/:id')
  async activate(@Param('id') id: string) {
    const user = await this.userService.activate(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }
  @Put('/deactivate/:id')
  async deactivate(@Param('id') id: string) {
    const user = await this.userService.deactivate(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Member, Role.Admin, Role.SuperAdmin)
  @Put('/reset/password')
  async ResetUserPassword(@Body() restpassDto: ResetUserPasswordDto) {
    const user = await this.userService.ResetUserPassword(restpassDto);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }
  @Put('/reset/mypassword/:id')
  async ResetMyPassword(@Body() password: any, @Param('id') id: string) {
    const user = await this.userService.ResetMyPassword(id, password);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  //**************************************** ADMIN  **********************************************/

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Delete('/:id')
  async DeleteUser(@Param('id') id: string) {
    const user = await this.userService.deleteuser(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return { message: 'USER DELETED ' };
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Member)
  @Get('/role')
  async findUserByRole() {
    const user = await this.userService.findUserByRole();
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Member)
  @Get('/')
  async findUsers() {
    const user = await this.userService.findUsers();
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Member)
  @Get('/:id')
  async findUsersById(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }
}
