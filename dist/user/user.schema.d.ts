import mongoose, { Document } from 'mongoose';
import { userprofileData, userability } from './dtos/create-user-dto';
export type UserDocument = User & Document;
export declare class User {
    profileData: userprofileData;
    password: string;
    linkedUsers: User[];
    ability: userability[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
