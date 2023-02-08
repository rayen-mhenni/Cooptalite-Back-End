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
  ) {}

  async addOffer(createOfferDTO: CreateOfferDTO): Promise<any> {
    const newUser = await this.OfferModel.create(createOfferDTO);
    return newUser.save();
  }

  async updateOffer(id: string, CreateOfferDTO: CreateOfferDTO): Promise<any> {
    const Offer = await this.OfferModel.findById(id);

    if (Offer) {
      const newOffer = await this.OfferModel.findByIdAndUpdate(Offer._id, {
        title: CreateOfferDTO.title || Offer.title,
        descritption: CreateOfferDTO.description || Offer.description,
        company: CreateOfferDTO.company || Offer.company,
        requiredSkills: CreateOfferDTO.requiredSkills || Offer.requiredSkills,
        duration: CreateOfferDTO.duration || Offer.duration,
        startDate: CreateOfferDTO.startDate || Offer.startDate,
        expYears: CreateOfferDTO.expYears || Offer.expYears,
        type: CreateOfferDTO.type || Offer.type,
        image: CreateOfferDTO.image || Offer.image,
        contract: CreateOfferDTO.contract || Offer.contract,
        address: CreateOfferDTO.address || Offer.address,
        status: CreateOfferDTO.status || Offer.status,
        category: CreateOfferDTO.category || Offer.category,
        date: CreateOfferDTO.date || Offer.date,
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
    const Offer = await this.OfferModel.find()
      .populate({
        path: 'company',
      })
      .sort({ date: -1 });
    if (!Offer) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Offer;
    }
  }
  async findOffersByCat(cat: string): Promise<any | undefined> {
    if (cat === 'all') {
      const Offer = await this.OfferModel.find()
        .populate({
          path: 'company',
        })
        .sort({ date: -1 });
      if (!Offer) {
        throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
      } else {
        return Offer;
      }
    } else {
      const Offer = await this.OfferModel.find({ category: cat })
        .populate({
          path: 'company',
        })
        .sort({ date: -1 });
      if (!Offer) {
        throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
      } else {
        return Offer;
      }
    }
  }

  async findOfferById(id: string): Promise<any | undefined> {
    const Offer = await this.OfferModel.findById({ _id: id }).populate({
      path: 'company',
    });
    if (!Offer) {
      throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
    } else {
      return Offer;
    }
  }

  async findOfferByCompanyId(companyId: string): Promise<any | undefined> {
    const Offer = await this.OfferModel.find({
      company: companyId,
    }).sort({ date: -1 });

    if (!Offer) {
      throw new HttpException('Offer Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return Offer;
    }
  }
}
