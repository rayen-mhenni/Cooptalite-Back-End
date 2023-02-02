import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './company.Schema';
import { CreateCompanyDTO } from './dtos/company-dtos';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
@Injectable()
export class CompanyService {
    constructor(
        @InjectModel('Company')
        private readonly CompanyModel: Model<CompanyDocument>,
      ) {}
    
      async addCompany(CreateCompanyDTO: CreateCompanyDTO): Promise<any> {
        const OldCompany = await this.CompanyModel.findOne({
          name: CreateCompanyDTO.name,
          branding: CreateCompanyDTO.branding,
          field: CreateCompanyDTO.field,
          nbemployees: CreateCompanyDTO.nbemployees,
          about: CreateCompanyDTO.about,
          logo: CreateCompanyDTO.logo,
          cover: CreateCompanyDTO.cover,
        
        });
    
        if (!OldCompany) {
          const newUser = await this.CompanyModel.create(CreateCompanyDTO);
    
          return newUser.save();
        } else {
          throw new HttpException('Company already exist', HttpStatus.BAD_REQUEST);
        }
      }
    
      async updateCompany(id: string, CreateCompanyDTO: CreateCompanyDTO): Promise<any> {
        const Company = await this.CompanyModel.findById(id);
    
        if (Company) {
          const newCompany = await this.CompanyModel.findByIdAndUpdate(Company._id, {
            name: CreateCompanyDTO.name || Company.name,
            branding: CreateCompanyDTO.branding || Company.branding,
            field: CreateCompanyDTO.field || Company.field,
            nbemployees: CreateCompanyDTO.nbemployees || Company.nbemployees,
            about: CreateCompanyDTO.about || Company.about,
            logo: CreateCompanyDTO.logo || Company.logo,
            cover: CreateCompanyDTO.cover || Company.cover,
            
          });
    
          return newCompany;
        } else {
          throw new HttpException('Company Not exist', HttpStatus.NOT_FOUND);
        }
      }
      async deleteCompany(id: string): Promise<Company | undefined> {
        const Company = await this.CompanyModel.findOneAndDelete({ _id: id });
        if (!Company) {
          throw new HttpException('Company Not Found ', HttpStatus.NOT_FOUND);
        } else {
          return Company;
        }
      }
      async findCompanys(): Promise<any | undefined> {
        const Company = await this.CompanyModel.find();
        if (!Company) {
          throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
        } else {
          return Company;
        }
      }
      async findCompany(name: string): Promise<any | undefined> {
        const Company = await this.CompanyModel.findOne({ name: name });
    
        if (!Company) {
          throw new HttpException('Company Not Found ', HttpStatus.NOT_FOUND);
        } else {
          return Company;
        }
      }
      async findCompanyById(id: string): Promise<any | undefined> {
        const Company = await this.CompanyModel.findById({ _id: id });
        if (!Company) {
          throw new HttpException('Not Data Found ', HttpStatus.NOT_FOUND);
        } else {
          return Company;
        }
      }
}
