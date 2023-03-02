import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cooptationService } from 'src/cooptation/cooptation.service';
import { Noeud } from './dtos/coopt-engine.DTO';

@Injectable()
export class CooptEngineService {
  constructor(
    @InjectModel('CooptEngine')
    private readonly cooptationModule: Model<CooptationDocument>,
    private readonly cooptationService: cooptationService,
  ) {}
  //   getListOfChildByParentid = (id: string) => {
  // return  find({parentId:id})
  //   };
  // get list of noeud and make calculation
  //******************functions
  //addNoeud,deleteNoeud => recalculate sub and upper noeud based on new arbre
  //getTotoalAmount of noeud based on her childs => need calculation methode
  //getFull arbre => new schema arbre
}
