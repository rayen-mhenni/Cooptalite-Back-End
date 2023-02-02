import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Offer, OfferDocument } from './offer.schema';
import { CreateOfferDTO } from './dtos/offer-dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel('Offer')
    private readonly OfferModel: Model<OfferDocument>,
  ) { }

  async addOffer(createOfferDTO: CreateOfferDTO): Promise<any> {
    const OldOffer = await this.OfferModel.findOne({
      title: createOfferDTO.title,
      description: createOfferDTO.description,
      companyDescription: createOfferDTO.companyDescription,
      requiredSkills: createOfferDTO.requiredSkills,
      duration: createOfferDTO.duration,
      startDate: createOfferDTO.startDate,
      expYears: createOfferDTO.expYears,
      status: createOfferDTO.status,
    });

    if (!OldOffer) {
      const newUser = await this.OfferModel.create(createOfferDTO);

      return newUser.save();
    } else {
      throw new HttpException('Offer already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async updateOffer(id: string, CreateOfferDTO: CreateOfferDTO): Promise<any> {
    const Offer = await this.OfferModel.findById(id);

    if (Offer) {
      const newOffer = await this.OfferModel.findByIdAndUpdate(Offer._id, {
        title: CreateOfferDTO.title || Offer.title,
        descritption: CreateOfferDTO.description || Offer.description,
        companyDescription: CreateOfferDTO.companyDescription || Offer.companyDescription,
        requiredSkills: CreateOfferDTO.requiredSkills || Offer.requiredSkills,
        duration: CreateOfferDTO.duration || Offer.duration,
        startDate: CreateOfferDTO.startDate || Offer.startDate,
        expYears: CreateOfferDTO.expYears || Offer.expYears,
        status: CreateOfferDTO.status || Offer.status,
      });

      return newOffer;
    } else {
      throw new HttpException('offer Not exist', HttpStatus.NOT_FOUND);
    }
  }
  async deleteOffer(id: string): Promise<Offer | undefined> {
    const Offer = await this.OfferModel.findOneAndDelete({ _id: id });
    if (!Offer) {
      throw new HttpException('Offer Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Offer;
    }
  }
  async findOffers(): Promise<any | undefined> {
    const Offer = await this.OfferModel.find();
    if (!Offer) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Offer;
    }
  }
  async findOfferById(id: string): Promise<any | undefined> {
    const Offer = await this.OfferModel.findById({ _id: id });
    if (!Offer) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Offer;
    }
  }
}
