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
  constructor(private EmailService: EmailService) {}

  // //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/addinterview')
  async addEmail(@Body() EmailDTO: EmailDTO) {
    const Email = await this.EmailService.addEmail(EmailDTO);
    return Email;
  }

  // @Get('/')
  // async findInterView() {
  //   const Interview = await this.interviewService.findInterview();
  //   if (!Interview) throw new NotFoundException('interview does not exist!');
  //   return Interview;
  // }

  // @Put('/UpDateInterview/:id')
  // async Updateinterview(@Param('id') id: string, @Body() createInterviewDTO: CreateInterviewDTO) {
  //   const Interview = await this.interviewService.updateInterview(id, createInterviewDTO);
  //   if (!Interview) throw new NotFoundException('Interview does not exixt');

  // }

  // @Delete('/delete/:id')
  // async DeleteInterview(@Param('id') id: string) {
  //   const Interview = await this.interviewService.deleteInterview(id);
  //   if (!Interview) throw new NotFoundException('Interview does not exist!');
  //   return { message: 'Interview DELETED ' };
  // }

  // @Get('/interview/:id')
  // async findInterviewById(@Param('id') id: string) {
  //   const Interview = await this.interviewService.findInterviewById(id);
  //   if (!Interview) throw new NotFoundException('Interview does not exist!');
  //   return Interview;
  // }

  // @Get('/interviewcandidat/:userid')
  // async findInterviewByuserid(@Param('userid') userId: string) {
  //   const Interview = await this.interviewService.findInterviewByuserid(userId);
  //   if (!Interview) throw new NotFoundException('Interview does not exist!');
  //   return Interview;
  // }
}
