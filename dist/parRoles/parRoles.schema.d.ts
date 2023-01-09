import mongoose, { Document } from 'mongoose';
import { Ability } from './ability.schema';
export type parRolesDocument = ParRoles & Document;
export declare class ParRoles {
    name: string;
    status: string;
    ability: Ability[];
}
export declare const ParRolesSchema: mongoose.Schema<ParRoles, mongoose.Model<ParRoles, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ParRoles>;
