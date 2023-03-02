import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CooptationDocument } from 'src/cooptation/Cooptation.schema';
import { CooptationService } from 'src/cooptation/Cooptation.service';

@Injectable()
export class CooptEngineService {
  constructor(
    @InjectModel('CooptEngine')
    private readonly CooptationModule: Model<CooptationDocument>,
    private readonly cooptationService: CooptationService,
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
