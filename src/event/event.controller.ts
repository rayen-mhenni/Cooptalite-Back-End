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
import { CreateEventDTO } from './dtos/event-dto';

import { EventService } from './event.service';

@Controller('api/event')
export class EventController {
  constructor(private eventService: EventService) {}
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async addEvent(@Body() CreateEventDTO: CreateEventDTO) {
    const event = await this.eventService.addEvent(CreateEventDTO);
    return event;
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  async UpdateEvent(@Param('id') id: string, @Body() EventDTO: CreateEventDTO) {
    const event = await this.eventService.updateEvent(id, EventDTO);
    if (!event) throw new NotFoundException('Event does not exixt');
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async DeleteEvent(@Param('id') id: string) {
    const Event = await this.eventService.deleteEvent(id);
    if (!Event) throw new NotFoundException('Event does not exist!');
    return { message: 'Event DELETED ' };
  }
  @Get('/title/:title')
  async getEventByTitle(@Param('title') title: string) {
    const event = await this.eventService.findEvent(title);
    if (!event) throw new NotFoundException('Event does not exist!');
    return event;
  }
  @Get('/')
  async findEvents() {
    const event = await this.eventService.findEvents();
    if (!event) throw new NotFoundException('event does not exist!');
    return event;
  }
  @Get('/:id')
  async findEventById(@Param('id') id: string) {
    const event = await this.eventService.findEventById(id);
    if (!event) throw new NotFoundException('Event does not exist!');
    return event;
  }
}
