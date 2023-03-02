import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDTO } from './dtos/create-user-dto';
import { ResetUserPasswordDto } from './dtos/ResetUserPasswordDto';
import { CooptationDocument } from 'src/cooptation/Cooptation.schema';
import { parRolesService } from './../parRoles/parRoles.service';
export declare class UserService {
    private readonly userModel;
    private readonly CooptationModule;
    private readonly parRolesService;
    constructor(userModel: Model<UserDocument>, CooptationModule: Model<CooptationDocument>, parRolesService: parRolesService);
    addUser(createUserDTO: CreateUserDTO): Promise<any>;
    addUserCandidat(createUserDTO: CreateUserDTO, id: string, offerid: string, trustrate: string, cooptationId: string): Promise<any>;
    updateCooptationstatus(memberId: string, cooptationId: string, status: string): Promise<any>;
    updateuserprofile(id: string, createUserDTO: CreateUserDTO): Promise<any>;
    updateuser(id: string, createUserDTO: CreateUserDTO): Promise<any>;
    updateCondidat(id: string, cooptationId: string): Promise<any>;
    activate(id: string): Promise<any>;
    deactivate(id: string): Promise<any>;
    findUser(email: string): Promise<any | undefined>;
    findUserByRole(): Promise<any | undefined>;
    findUsers(): Promise<any | undefined>;
    findUserById(id: string): Promise<any | undefined>;
    deleteuser(id: string): Promise<User | undefined>;
    ResetUserPassword(restpassDto: ResetUserPasswordDto): Promise<any>;
    ResetMyPassword(id: string, password: any): Promise<any>;
    calculateScoreCoopt(id: string): Promise<any>;
}
