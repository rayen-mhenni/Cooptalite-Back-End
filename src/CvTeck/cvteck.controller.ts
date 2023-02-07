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
import { CreateCvteckDTO } from './dtos/cvteck-dtos';

import { CvteckService } from './cvteck.service';




@Controller('api/cvteck')
export class CvteckController {
    constructor(private cvteckservice: CvteckService) { }
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/addcv')
    async addCvteck(@Body() CreateCvteckDTO: CreateCvteckDTO) {
        const cvteck = await this.cvteckservice.addCvteck(CreateCvteckDTO);
        return cvteck;
    }
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/updatecv/:id')
    async UpdateCvteck(@Param('id') id: string, @Body() CvteckDTO: CreateCvteckDTO) {
        const Cvteck = await this.cvteckservice.updateCvteck(id, CvteckDTO);
        if (!Cvteck) throw new NotFoundException('Cvteck does not exixt');
    }
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/deletecv/:id')
    async DeleteCvteck(@Param('id') id: string) {
        const Cvteck = await this.cvteckservice.deleteCvteck(id);
        if (!Cvteck) throw new NotFoundException('Cvteck does not exist!');
        return { message: 'Cvteck DELETED ' };
    }
    @Get('/')
    async findCvteck() {
        const cvteck = await this.cvteckservice.findCvteck();
        if (!cvteck) throw new NotFoundException('CvTeck does not exist!');
        return cvteck;
    }
    @Get('/cvteck/:id')
    async findCvteckById(@Param('id') id: string) {
        const cvteck = await this.cvteckservice.findCvteckById(id);
        if (!cvteck) throw new NotFoundException('Cvteck does not exist!');
        return cvteck;
    }
    @Put('/status/:id/:status')
    async updateCvteckstatus(
        @Param('id') id: string,
        @Param('status') status: string,
    ) {
        const cra = await this.cvteckservice.updateCvteckstatus(id, status);
        if (!cra) throw new NotFoundException('Cvteck does not exist!');
        return cra;
    }

}

