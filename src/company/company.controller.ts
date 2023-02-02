import {
    Controller,
    Get,
    Post,
Body,
    Put,
    Param,
    NotFoundException,
    Delete,

} from '@nestjs/common';
import { CreateCompanyDTO } from './dtos/company-dtos';

import { CompanyService } from './company.service';

@Controller('api/company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/')
    async addCompany(@Body() CreateCompanyDTO: CreateCompanyDTO) {
        const company = await this.companyService.addCompany(CreateCompanyDTO);
        return company;
    }
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/:id')
    async updateCompany(@Param('id') id: string, @Body() CompanyDTO: CreateCompanyDTO) {
        const company = await this.companyService.updateCompany(id, CompanyDTO);
        if (!company) throw new NotFoundException('Company does not exixt');
    }
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:id')
    async deleteCompany(@Param('id') id: string) {
        const Company = await this.companyService.deleteCompany(id);
        if (!Company) throw new NotFoundException('Company does not exist!');
        return { message: 'Company DELETED ' };
    }
    @Get('/name/:name')
    async getCompanyByname(@Param('name') name: string) {
        const company = await this.companyService.findCompany(name);
        if (!company) throw new NotFoundException('company does not exist!');
        return company;
    }
    @Get('/')
    async findCompanys() {
        const company = await this.companyService.findCompanys();
        if (!company) throw new NotFoundException('company does not exist!');
        return company;
    }
    @Get('/:id')
    async findCompanyById(@Param('id') id: string) {
        const company = await this.companyService.findCompanyById(id);
        if (!company) throw new NotFoundException('company does not exist!');
        return company;
    }
}
