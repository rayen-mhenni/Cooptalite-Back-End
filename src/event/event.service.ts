import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.schema';
import { CreateEventDTO } from './dtos/event-dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { endianness } from 'os';
import * as moment from 'moment';
import { isEmpty } from 'lodash';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event')
    private readonly EventModel: Model<EventDocument>,
  ) { }

  async addEvent(CreateEventDTO: CreateEventDTO): Promise<any> {
    console.log('hi', CreateEventDTO)
    const OldEvent = await this.EventModel.findOne({
      title: CreateEventDTO.title,
      description: CreateEventDTO.description,
      tags: CreateEventDTO.tags,
      startDate: CreateEventDTO.startDate,
      endDate: CreateEventDTO.endDate,
      imgUrl: CreateEventDTO.imgUrl,
      eventType: CreateEventDTO.eventType,

    });

    if (!OldEvent) {
      const newUser = await this.EventModel.create(CreateEventDTO);

      return newUser.save();
    } else {
      throw new HttpException('Event already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async updateEvent(id: string, CreateEventDTO: CreateEventDTO): Promise<any> {
    const Event = await this.EventModel.findById(id);

    if (Event) {
      const newEvent = await this.EventModel.findByIdAndUpdate(Event._id, {
        title: CreateEventDTO.title || Event.title,
        description: CreateEventDTO.description || Event.description,
        tags: CreateEventDTO.tags || Event.tags,
        startDate: CreateEventDTO.startDate || Event.startDate,
        endDate: CreateEventDTO.endDate || Event.endDate,
        imgUrl: CreateEventDTO.imgUrl || Event.imgUrl,
        eventType: CreateEventDTO.eventType || Event.eventType,
        
      });

      return newEvent;
    } else {
      throw new HttpException('event Not exist', HttpStatus.NOT_FOUND);
    }
  }
  async deleteEvent(id: string): Promise<Event | undefined> {
    const Event = await this.EventModel.findOneAndDelete({ _id: id });
    if (!Event) {
      throw new HttpException('Event Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Event;
    }
  }
  async findEvents(): Promise<any | undefined> {
    const Event = await this.EventModel.find();
    if (!Event) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Event;
    }
  }
  async findEvent(title: string): Promise<any | undefined> {
    const event = await this.EventModel.findOne({ title: title });

    if (!event) {
      throw new HttpException('event Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return event;
    }
  }
  async findEventById(id: string): Promise<any | undefined> {
    const Event = await this.EventModel.findById({ _id: id });
    if (!Event) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Event;
    }
  }
  async getCurrentEvents(): Promise<any | undefined> {
    const currentDate = moment().format("YYYY-MM-DD")
    const Event = await this.EventModel.find();
    const res = Event.filter((ev) => moment(currentDate)
    .isBetween(moment(ev.startDate).format("YYYY-MM-DD"), moment(ev.endDate).format("YYYY-MM-DD")))
    if (!res||isEmpty(res)) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return res;
    }
  }

 
}
