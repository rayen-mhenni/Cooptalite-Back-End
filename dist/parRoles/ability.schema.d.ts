import mongoose, { Document } from 'mongoose';
export type AbilityDocument = Ability & Document;
export declare class Ability {
    action: string;
    subject: string;
    status: boolean;
}
export declare const AbilitySchema: mongoose.Schema<Ability, mongoose.Model<Ability, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Ability>;
