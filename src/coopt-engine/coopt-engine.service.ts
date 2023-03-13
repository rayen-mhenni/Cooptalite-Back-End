import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { forEach, isEmpty, isNil } from 'lodash';
import { Model, Types } from 'mongoose';
import { CooptEngineSettingsService } from 'src/coopt-engine-settings/coopt-engine-settings.service';
import { Step } from 'src/coopt-engine-settings/dtos/coopt-engine-settings.DTO';
import { CooptationService } from 'src/cooptation/Cooptation.service';
import { CRAService } from 'src/CRA/cra.service';
import { CooptEngine, CooptEngineDocument } from './coopt-engine.schema';
import { NoeudDTO } from './dtos/coopt-engine.DTO';

@Injectable()
export class CooptEngineService {
  constructor(
    @InjectModel('CooptEngine')
    private readonly CooptEngine: Model<CooptEngineDocument>,
    private readonly cooptationService: CooptationService,
    private readonly cRAService: CRAService,
    private readonly cooptEngineSettingsService: CooptEngineSettingsService,
  ) {}
  async addChild(userId: string, parentId: string): Promise<any> {
    await this.CooptEngine.findOneAndUpdate(
      { userId: parentId },
      {
        $push: {
          listOfChildId: userId,
        },
      },
      { new: true },
    );
  }
  async addNoeud(body: { userId: string; parentId: string }): Promise<any> {
    const { userId, parentId } = body;
    const noeud = await this.CooptEngine.findOne({
      userId,
    });

    if (!noeud) {
      const newNoeud = await this.CooptEngine.create({
        ...body,
        listOfChildId: [],
        isRoot: isEmpty(parentId) || isNil(parentId),
      });
      await newNoeud.save();

      await this.addChild(userId, parentId);
    } else {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
  }

  calculateCoopt = async (
    maxLevel: number,
    percentage: string,
    listOfChildId: any,
    mode: 'AUTO' | 'MANUAL',
    manualSteps: Step[],
  ) => {
    let gain = 0;
    let percentageToCal = Number(percentage);
    let listOfChildIdRec = listOfChildId;
    const res = [];
    let level = 1;
    while (true && !isEmpty(listOfChildIdRec) && !isNil(listOfChildIdRec)) {
      const arrayOfPromise = [];
      listOfChildIdRec?.forEach(async (child) => {
        arrayOfPromise.push(
          this.cooptationService.findCooptationByCooptedId(child),
        );
      });
      await Promise.all(arrayOfPromise).then((list) => {
        res.push({ level, list, listOfChildId: listOfChildIdRec });
      });

      const arrayOfPromiseChilds = [];
      listOfChildIdRec?.forEach(async (child) => {
        arrayOfPromiseChilds.push(this.CooptEngine.findOne({ userId: child }));
      });
      listOfChildIdRec = [];
      await Promise.all(arrayOfPromiseChilds).then((listOfChildIdNoeud) => {
        listOfChildIdNoeud.forEach((noeud) => {
          listOfChildIdRec = listOfChildIdRec.concat(noeud.listOfChildId);
        });
        level += 1;
      });

      if (level > maxLevel) {
        break;
      }
    }
    const finalRes = [];
    res.forEach((obj) => {
      const list = [];
      obj.listOfChildId.forEach((child) => {
        const coopt = obj.list.find((coopt) => {
          return coopt?.candidat?._id.equals(child);
        });

        list.push({ user: child, cooptation: coopt });
      });
      finalRes.push({ level: obj.level, list });
    });

    if (mode === 'AUTO') {
      finalRes.forEach((obj) => {
        obj.list.forEach((el) => {
          if (!isNil(el?.cooptation?.candidat?.profileData?.TJM)) {
            const TJM = el?.cooptation?.candidat?.profileData?.TJM;
            gain += (Number(percentageToCal) / 100) * Number(TJM);
          }
        });
        percentageToCal /= 2;
      });
    } else if (mode === 'MANUAL') {
      finalRes.forEach((obj) => {
        const percentage = manualSteps.find(
          (step) => Number(step.level) === Number(obj.level),
        )?.percentage;
        obj.list.forEach((el) => {
          if (!isNil(el?.cooptation?.candidat?.profileData?.TJM)) {
            const TJM = el.cooptation?.candidat?.profileData?.TJM;
            gain += (Number(percentage) / 100) * Number(TJM);
          }
        });
      });
    }

    return gain;
  };

  GetListOfChildsAmountsWithStatus = async (
    maxLevel: number,
    percentage: string,
    listOfChildId: any,
    mode: 'AUTO' | 'MANUAL' | 'ONESHOT',
    manualSteps: Step[],
    amount: number,
  ) => {
    let percentageToCal = Number(percentage);
    let listOfChildIdRec = listOfChildId;
    const res = [];
    let level = 1;
    while (true && !isEmpty(listOfChildIdRec) && !isNil(listOfChildIdRec)) {
      const arrayOfPromise = [];
      listOfChildIdRec?.forEach(async (child) => {
        arrayOfPromise.push(
          this.cooptationService.findCooptationByCooptedId(child),
        );
      });
      await Promise.all(arrayOfPromise).then((list) => {
        res.push({ level, list, listOfChildId: listOfChildIdRec });
      });

      const arrayOfPromiseChilds = [];
      listOfChildIdRec?.forEach(async (child) => {
        arrayOfPromiseChilds.push(this.CooptEngine.findOne({ userId: child }));
      });
      listOfChildIdRec = [];
      await Promise.all(arrayOfPromiseChilds).then((listOfChildIdNoeud) => {
        listOfChildIdNoeud.forEach((noeud) => {
          listOfChildIdRec = listOfChildIdRec.concat(noeud.listOfChildId);
        });
        level += 1;
      });

      if (level > maxLevel) {
        break;
      }
    }
    const finalRes = [];

    res.forEach((obj) => {
      console.log('objobj', obj);

      const list = [];
      obj.listOfChildId.forEach((child) => {
        const coopt = obj.list.find((coopt) => {
          return coopt.candidat._id.equals(child);
        });

        list.push({ user: child, cooptation: coopt });
      });
      finalRes.push({ level: obj.level, list });
    });
    const listOfChildsAmountsWithStatus = [];

    const arrayOfPromiseOfCRA = [];

    finalRes.forEach((obj) => {
      obj.list.forEach((el) => {
        arrayOfPromiseOfCRA.push(
          this.cRAService.getCurrentMonthNBDaysWorkedStatus(
            el?.cooptation.candidat._id,
          ),
        );
      });
    });

    if (mode === 'AUTO') {
      await Promise.all(arrayOfPromiseOfCRA).then((listOfCRA) => {
        finalRes.forEach((obj) => {
          obj.list.forEach((el) => {
            if (!isNil(el?.cooptation.candidat?.profileData?.TJM)) {
              const TJM = el?.cooptation.candidat?.profileData?.TJM;
              const workedDays = listOfCRA.find(
                (cra) => cra.userId === el?.cooptation.candidat._id,
              );
              const gain = (Number(percentageToCal) / 100) * Number(TJM);
              const totalGainAmount =
                workedDays.status === 'validated'
                  ? workedDays.nbDays * gain
                  : 0;
              listOfChildsAmountsWithStatus.push({
                user: el?.cooptation.candidat,
                craStatus: workedDays.status,
                workedDays: workedDays.nbDays,
                gain,
                totalGainAmount,
                TJM,
              });
            }
          });
          percentageToCal /= 2;
        });
      });
    } else if (mode === 'MANUAL') {
      await Promise.all(arrayOfPromiseOfCRA).then((listOfCRA) => {
        finalRes.forEach((obj) => {
          const percentage = manualSteps.find(
            (step) => Number(step.level) === Number(obj.level),
          )?.percentage;
          obj.list.forEach((el) => {
            if (!isNil(el?.cooptation.candidat?.profileData?.TJM)) {
              const TJM = el.cooptation?.candidat?.profileData?.TJM;

              const workedDays = listOfCRA.find(
                (cra) => cra.userId === el?.cooptation.candidat._id,
              );
              const gain = (Number(percentage) / 100) * Number(TJM);
              const totalGainAmount =
                workedDays.status === 'validated'
                  ? workedDays.nbDays * gain
                  : 0;
              listOfChildsAmountsWithStatus.push({
                user: el?.cooptation.candidat,
                craStatus: workedDays.status,
                workedDays: workedDays.nbDays,
                gain,
                totalGainAmount,
                TJM,
              });
            }
          });
        });
      });
    } else {
      await Promise.all(arrayOfPromiseOfCRA).then((listOfCRA) => {
        finalRes.forEach((obj) => {
          obj.list.forEach((el) => {
            if (!isNil(el?.cooptation.candidat?.profileData?.TJM)) {
              const workedDays = listOfCRA.find(
                (cra) => cra.userId === el?.cooptation.candidat._id,
              );
              const gain = amount;
              const totalGainAmount =
                workedDays.status === 'validated'
                  ? workedDays.nbDays * gain
                  : 0;
              listOfChildsAmountsWithStatus.push({
                user: el?.cooptation.candidat,
                craStatus: workedDays.status,
                workedDays: workedDays.nbDays,
                gain,
                totalGainAmount,
                TJM: 0,
              });
            }
          });
        });
      });
    }

    return listOfChildsAmountsWithStatus;
  };

  async getNoeud(userId: string): Promise<any | undefined> {
    const noeud = await this.CooptEngine.findOne({ userId });
    if (noeud) {
      const settings = await this.cooptEngineSettingsService.findValidSetting();
      let gainAmount = 0;
      if (settings.mode === 'one shot') {
        gainAmount = noeud.listOfChildId.length * Number(settings.amount);
      } else if (settings.mode === 'auto percentage') {
        gainAmount = await this.calculateCoopt(
          settings.maxLevel,
          settings.percentage,
          noeud.listOfChildId,
          'AUTO',
          null,
        );
      } else if (settings.mode === 'manual percentage') {
        gainAmount = await this.calculateCoopt(
          settings.maxLevel,
          null,
          noeud.listOfChildId,
          'MANUAL',
          settings.manualSteps,
        );
      }

      return { noeud, gainAmount };
    } else {
      throw new HttpException('Noeud Not Found ', HttpStatus.NOT_FOUND);
    }
  }

  async getCagnotteByUserId(userId: string): Promise<any | undefined> {
    const noeud = await this.CooptEngine.findOne({ userId });
    if (noeud) {
      const settings = await this.cooptEngineSettingsService.findValidSetting();
      let res;
      if (
        ['auto percentage', 'manual percentage', 'one shot'].includes(
          settings.mode,
        )
      ) {
        res = await this.GetListOfChildsAmountsWithStatus(
          settings.maxLevel,
          settings.percentage,
          noeud.listOfChildId,
          settings.mode === 'auto percentage'
            ? 'AUTO'
            : settings.mode === 'manual percentage'
            ? 'MANUAL'
            : 'ONESHOT',
          settings.manualSteps,
          settings.mode === 'one shot' ? Number(settings.amount) : 0,
        );
      }

      return res;
    } else {
      throw new HttpException('Noeud Not Found ', HttpStatus.NOT_FOUND);
    }
  }

  async getTree(): Promise<CooptEngine[] | undefined> {
    const CooptEngine = await this.CooptEngine.find().populate([
      {
        path: 'userId',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.TJM',
        ],
      },
      {
        path: 'parentId',
        select: [
          'profileData.header',
          'profileData.userAbout',
          'profileData.TJM',
        ],
      },
    ]);

    if (!CooptEngine) {
      throw new HttpException('No CooptEngine is Found ', HttpStatus.NOT_FOUND);
    } else {
      return CooptEngine;
    }
  }
  async removeNoeud(userId: string): Promise<CooptEngine | undefined> {
    const noeud = await this.CooptEngine.findOne({ userId });
    const listOfChilds = noeud.listOfChildId;

    const arrayOfPromise = [];
    listOfChilds?.forEach(async (child) => {
      arrayOfPromise.push(
        this.CooptEngine.findOneAndUpdate(
          { userId: child },
          { $set: { parentId: noeud.parentId } },
        ),
      );
    });
    await Promise.all(arrayOfPromise);

    const parentNoeud = await this.CooptEngine.findOne({
      userId: noeud.parentId,
    });

    await this.CooptEngine.findOneAndUpdate(
      { _id: parentNoeud._id },
      { $pull: { listOfChildId: new Types.ObjectId(userId) } },
      { new: true },
    );

    const CooptEngine = await this.CooptEngine.findOneAndDelete({
      userId,
    });

    if (!CooptEngine) {
      throw new HttpException('CooptEngine Not Found ', HttpStatus.NOT_FOUND);
    } else {
      return CooptEngine;
    }
  }
}
