import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { EmailDTO } from './dtos/email-dtos';
import { EmailService } from './email.service';

@Controller('api/email')
export class InterviewController {
  constructor(private EmailService: EmailService) { }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async addEmail(@Body() EmailDTO: EmailDTO) {
    const Email = await this.EmailService.addEmail(EmailDTO);
    return Email;
  }


  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  async getallEmail() {
    const email = await this.EmailService.getAllEmail();
    if (!email) throw new NotFoundException('No Email Found');
    return email;
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  async getemail(@Param('id') id: string) {
    const Email = await this.EmailService.getEmail(id);
    if (!Email) throw new NotFoundException('Email does not exist!');
    return Email;
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/sent/:email')
  async getSentEmail(@Param('email') email: string) {
    const Email = await this.EmailService.getSentEmail(email);
    if (!Email) throw new NotFoundException('Email does not exist!');
    return Email;
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/my/:email')
  async getMyEmail(@Param('email') email: string) {
    const Email = await this.EmailService.getMyEmail(email);
    if (!Email) throw new NotFoundException('Email does not exist!');
    return Email;
  }


  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  async updateEmail(@Param('id') id: string, @Body() EmailDTO: EmailDTO) {
    const Email = await this.EmailService.updateEmail(id, EmailDTO);
    if (!Email) throw new NotFoundException('Email does not exixt');
    return Email;

  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/label/:id')
  async updateEmailLabel(@Param('id') id: string, @Body() label: string[]) {
    const Email = await this.EmailService.updateEmailLabel(id, label);
    if (!Email) throw new NotFoundException('Email does not exixt');

  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async DeleteEmail(@Param('id') id: string) {
    const Email = await this.EmailService.deleteEmail(id);
    if (!Email) throw new NotFoundException('Email does not exist!');
    return { Email: 'Email DELETED ' };
  }


}
