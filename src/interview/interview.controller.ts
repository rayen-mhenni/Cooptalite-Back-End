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
    BadRequestException,
  
  } from '@nestjs/common';
  import { CreateInterviewDTO } from './dtos/interview-dtos';
  
  import { InterviewService } from './interview.service';
  import { JwtAuthGuard } from 'src/auth/guards/jwt.guard.ts';
  import { RolesGuard } from 'src/auth/guards/roles.guard';
  import { get } from 'http';
  import { Interview } from './interview.schema';
  import { NOTFOUND } from 'dns';
  
  @Controller('api/interview')
  export class InterviewController {
    constructor(
      private interviewService: InterviewService,
  
    ) { }
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/addinterview')
    async addinterview(@Body() createInterviewDTO: CreateInterviewDTO) {
      const interview = await this.interviewService.addInterview(createInterviewDTO);
      return interview;
    }
    
    
    @Get('/')
    async findOffers() {
      const interview = await this.interviewService.findInterview();
      if (!interview) throw new NotFoundException('interview does not exist!');
      return interview;
    }
    
  
  
  
  
  }