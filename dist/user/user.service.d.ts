import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDTO } from './dtos/create-user-dto';
import { ResetUserPasswordDto } from './dtos/ResetUserPasswordDto';
import { CooptationDocument } from 'src/cooptation/cooptation.schema';
export declare class UserService {
    private readonly userModel;
    private readonly cooptationModule;
    constructor(userModel: Model<UserDocument>, cooptationModule: Model<CooptationDocument>);
    addUser(createUserDTO: CreateUserDTO): Promise<any>;
    addUserCandidat(createUserDTO: CreateUserDTO, id: string, offerid: string): Promise<any>;
    updateuserprofile(id: string, createUserDTO: CreateUserDTO): Promise<any>;
    updateuser(id: string, createUserDTO: CreateUserDTO): Promise<any>;
    activate(id: string): Promise<any>;
    deactivate(id: string): Promise<any>;
    findUser(email: string): Promise<any | undefined>;
    findUserByRole(): Promise<any | undefined>;
    findUsers(): Promise<any | undefined>;
    findUserById(id: string): Promise<any | undefined>;
    deleteuser(id: string): Promise<User | undefined>;
    ResetUserPassword(restpassDto: ResetUserPasswordDto): Promise<any>;
    ResetMyPassword(id: string, password: any): Promise<any>;
}
