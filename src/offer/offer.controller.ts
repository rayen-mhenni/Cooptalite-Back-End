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
import { CreateOfferDTO } from './dtos/offer-dto';

import { OfferService } from './offer.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard.ts';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { get } from 'http';
import { Offer } from './offer.schema';
import { NOTFOUND } from 'dns';

@Controller('api/offers')
export class OfferController {
  constructor(private offerService: OfferService) {}
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/addoffer')
  async addoffer(@Body() createOfferDTO: CreateOfferDTO) {
    const offer = await this.offerService.addOffer(createOfferDTO);
    return offer;
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/offer/:id')
  async UpdateOffer(@Param('id') id: string, @Body() OfferDTO: CreateOfferDTO) {
    const Offer = await this.offerService.updateOffer(id, OfferDTO);
    if (!Offer) throw new NotFoundException('Offer does not exixt');
  }
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete/:id')
  async DeleteOffer(@Param('id') id: string) {
    const Offer = await this.offerService.deleteOffer(id);
    if (!Offer) throw new NotFoundException('offer does not exist!');
    return { message: 'Offer DELETED ' };
  }
  @Get('/')
  async findOffers() {
    const offer = await this.offerService.findOffers();
    if (!offer) throw new NotFoundException('Offer does not exist!');
    return offer;
  }
  @Get('/offer/:id')
  async findOfferById(@Param('id') id: string) {
    const offer = await this.offerService.findOfferById(id);
    if (!offer) throw new NotFoundException('Offer does not exist!');
    return offer;
  }
}
