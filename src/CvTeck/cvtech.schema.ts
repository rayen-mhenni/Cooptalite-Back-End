import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SupportLanguage } from 'prettier';
import { Education, Experience, Language } from './dtos/cvtech-dtos';

export type CvtechDocument = Cvtech & Document;

@Schema()
export class Cvtech {
    @Prop({
        required: true,

    })
    firstname: string;

    @Prop({
        required: true,
    })
    lastname: string;



    @Prop({
        required: true,

    })
    email: string;

    @Prop({
        required: true,
        type: Array,

    })
    skills: string[];

    @Prop({
        required: true,

    })
    linkedin: string;



    @Prop({
        required: true,

    })
    phonenum: string;
    @Prop([{
        required: true,
        type: Experience,

    }])
    experience: Experience[];

    @Prop([{
        required: true,
        type: Education,

    }])
    education: Education[];

    @Prop([{
        required: true,
        type: Language,
    }])
    languages: Language[];

    @Prop({
        required: true,

    })
    status: string;
    @Prop({
        required: true,

    })
    categorie: string;
    @Prop({
        required: true,

    })
    cvname: string;
    @Prop({
        required: false,
        type: String,
    })
    imgUrl: string;
    @Prop({
        required: true,
        type: String,
    })
    post: string;




}

export const CvtechSchema = SchemaFactory.createForClass(Cvtech);