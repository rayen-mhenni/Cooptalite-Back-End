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

@Controller('event')
export class EventController {
    constructor(private eventService: EventService) {}
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/addevent')
    async addEvent(@Body() createEventDTO: CreateEventDTO) {
      const event = await this.eventService.addEvent(createEventDTO);
      return event;
    }
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/event/:id')
    async UpdateEvent(@Param('id') id: string, @Body() EventDTO: CreateEventDTO) {
      const Event = await this.eventService.updateEvent(id, EventDTO);
      if (!Event) throw new NotFoundException('Event does not exixt');
    }
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/delete/:id')
    async DeleteEvent(@Param('id') id: string) {
      const Event = await this.eventService.deleteEvent(id);
      if (!Event) throw new NotFoundException('Event does not exist!');
      return { message: 'Event DELETED ' };
    }
    @Get('/')
    async findEvents() {
      const event = await this.eventService.findEvents();
      if (!event) throw new NotFoundException('event does not exist!');
      return event;
    }
    @Get('/event/:id')
    async findEventById(@Param('id') id: string) {
      const event = await this.eventService.findEventById(id);
      if (!event) throw new NotFoundException('Event does not exist!');
      return event;
    }
}
