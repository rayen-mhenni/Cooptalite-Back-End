import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.schema';
import { CreateEventDTO } from './dtos/event-dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
@Injectable()
export class EventService {
    constructor(
        @InjectModel('Event')
        private readonly EventModel: Model<EventDocument>,
      ) {}
    
      async addEvent(createEventrDTO: CreateEventDTO): Promise<any> {
        const OldEvent = await this.EventModel.findOne({
          title: createEventrDTO.title,
          description: createEventrDTO.description,
          tags: createEventrDTO.tags,
          startDate: createEventrDTO.startDate,
          endDate: createEventrDTO.endDate,
          imgUrl: createEventrDTO.imgUrl,
        
        });
    
        if (!OldEvent) {
          const newUser = await this.EventModel.create(createEventrDTO);
    
          return newUser.save();
        } else {
          throw new HttpException('Event already exist', HttpStatus.BAD_REQUEST);
        }
      }
    
      async updateEvent(id: string, createEventrDTO: CreateEventDTO): Promise<any> {
        const Event = await this.EventModel.findById(id);
    
        if (Event) {
          const newEvent = await this.EventModel.findByIdAndUpdate(Event._id, {
            title: createEventrDTO.title || Event.title,
            descritption: createEventrDTO.description || Event.description,
            tags: createEventrDTO.tags || Event.tags,
            startDate: createEventrDTO.startDate || Event.startDate,
            endDate: createEventrDTO.endDate || Event.endDate,
            imgUrl: createEventrDTO.imgUrl || Event.imgUrl,
            
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
}
