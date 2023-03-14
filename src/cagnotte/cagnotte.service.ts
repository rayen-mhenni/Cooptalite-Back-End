import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { forEach, isEmpty, isNil } from 'lodash';
import { Model, Types } from 'mongoose';
import { CooptEngineService } from 'src/coopt-engine/coopt-engine.service';
import { Cagnotte, CagnotteDocument } from './cagnotte.schema';
import { Cagnotte as CagnotteobJ } from './dtos/cagnotte.DTO';
import * as moment from 'moment';

@Injectable()
export class CagnotteService {
  constructor(
    @InjectModel('Cagnotte')
    private readonly Cagnotte: Model<CagnotteDocument>,
    private readonly cooptEngineService: CooptEngineService,
  ) {}

  async updateCagnotte(
    userId: string,
    month: string,
    body: CagnotteobJ,
  ): Promise<any> {
    const cagnotte = await this.Cagnotte.updateOne(
      { userId: userId, month: month },
      { $set: { 'list.$[t]': body } },
      { arrayFilters: [{ 't.user': body.user }] },
    );

    if (cagnotte) {
      return cagnotte;
    } else {
      throw new HttpException('cagnotte not found', HttpStatus.NOT_FOUND);
    }
  }

  async getCagnotteByUserId(
    userId: string,
    month: string,
  ): Promise<Cagnotte | undefined> {
    if (!moment(month).isValid()) {
      throw new HttpException(
        'invalid month',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const Cagnotte = await this.Cagnotte.findOne({
      userId: userId,
      month: month,
    }).populate([
      { path: 'userId', model: 'User', select: 'profileData' },
      {
        path: 'list.user',
        model: 'User',
        select: 'profileData',
      },
    ]);

    if (!Cagnotte) {
      const cagnotte = await this.cooptEngineService.getCagnotteByUserId(
        userId,
      );

      const newcagnotte = cagnotte.map((cagn) => ({
        user: cagn.user._id,
        craStatus: cagn.craStatus,
        workedDays: cagn.workedDays,
        gain: cagn.gain,
        totalGainAmount: cagn.totalGainAmount,
        TJM: cagn.TJM,
        status: 'not paid',
        remainingAmount: 0,
        payedAmount: 0,
      }));

      const cagnotteAdd = await this.Cagnotte.create({
        userId: userId,
        month: String(moment().format('YYYY-MM')),
        list: newcagnotte,
      });
      return cagnotteAdd.save();
    } else {
      return Cagnotte;
    }
  }
}
