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
import { EmailConfigDTO } from './dtos/Configemail-dtos';
import { EmailDTO } from './dtos/email-dtos';
import { EmailService } from './email.service';

@Controller('api/email')
export class InterviewController {
  constructor(private EmailService: EmailService) {}

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async addEmail(@Body() EmailDTO: EmailDTO) {
    const Email = await this.EmailService.addEmail(EmailDTO);
    return Email;
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/addreplay/:id')
  async updateEmailAddReplay(
    @Param('id') id: string,
    @Body() EmailDTO: EmailDTO,
  ) {
    const Email = await this.EmailService.updateEmailAddReplay(id, EmailDTO);
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
    if (!Email) throw new NotFoundException('Email does not exist');
    return Email;
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/label/:id')
  async updateEmailLabel(@Param('id') id: string, @Body() label: string[]) {
    const Email = await this.EmailService.updateEmailLabel(id, label);
    if (!Email) throw new NotFoundException('Email does not exist');
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/update/email/status')
  async updateEmailsStatus(@Body() ids: any) {
    const Email = await this.EmailService.updateEmailsStatus(ids);
    if (!Email) throw new NotFoundException('Email does not exist');
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/update/Label/:label')
  async updateEmailsLabel(
    @Body() ids: any,
    @Param('label') labeltoadd: string,
  ) {
    const Email = await this.EmailService.updateEmailsLabel(ids, labeltoadd);
    if (!Email) throw new NotFoundException('Email does not exist');
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete/all')
  async deleteAllEmail(@Body() ids: any) {
    const Email = await this.EmailService.deleteAllEmail(ids);
    if (!Email) throw new NotFoundException('Email does not exist');
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async DeleteEmail(@Param('id') id: string) {
    const Email = await this.EmailService.deleteEmail(id);
    if (!Email) throw new NotFoundException('Email does not exist!');
    return { Email: 'Email DELETED ' };
  }

  //***************** Confg ****************************************/

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/add/config/mail')
  async addconfigEmail(@Body() EmailConfigDTO: EmailConfigDTO) {
    const Email = await this.EmailService.addconfigEmail(EmailConfigDTO);
    if (!Email) throw new NotFoundException('Email does not exist');
    return Email;
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete/config/mail/:id')
  async deleteconfigEmail(@Param('id') id: string) {
    const Email = await this.EmailService.deleteconfigEmail(id);
    if (!Email) throw new NotFoundException('Email does not exist');
    return Email;
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/update/config/mail/:_id')
  async UpdateconfigEmail(
    @Param('_id') id: string,
    @Body() EmailConfigDTO: EmailConfigDTO,
  ) {
    const Email = await this.EmailService.UpdateconfigEmail(id, EmailConfigDTO);
    if (!Email) throw new NotFoundException('Email does not exist');
    return Email;
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/get/config/mail/:id')
  async getconfigEmailbyid(@Param('id') id: string) {
    const Email = await this.EmailService.getconfigEmailbyid(id);
    if (!Email) throw new NotFoundException('Email does not exist');
    return Email;
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/get/config/mail')
  async getconfigEmail() {
    const Email = await this.EmailService.getconfigEmail();
    if (!Email) throw new NotFoundException('Email does not exist');
    return Email;
  }
}
