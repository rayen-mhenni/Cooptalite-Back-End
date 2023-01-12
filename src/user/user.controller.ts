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

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @Put('/myprofile/:id')
  async UpdateProfile(@Param('id') id: string, @Body() UserDTO: CreateUserDTO) {
    const user = await this.userService.updateuserprofile(id, UserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @Put('/reset/password')
  async ResetUserPassword(@Body() restpassDto: ResetUserPasswordDto) {
    const user = await this.userService.ResetUserPassword(restpassDto);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  //**************************************** ADMIN  **********************************************/

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
