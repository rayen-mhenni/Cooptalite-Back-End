import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDTO } from './dtos/create-user-dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    addUser(createUserDTO: CreateUserDTO): Promise<User>;
    findUser(username: string): Promise<User | undefined>;
}
