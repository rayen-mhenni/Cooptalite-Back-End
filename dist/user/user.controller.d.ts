import { CreateUserDTO } from './dtos/create-user-dto';
import { UserService } from 'src/user/user.service';
import { ResetUserPasswordDto } from './dtos/ResetUserPasswordDto';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
export declare class UserController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    UpdateProfile(id: string, UserDTO: CreateUserDTO): Promise<any>;
    calculateScoreCoopt(id: string): Promise<{
        score: any;
        userId: string;
    }>;
    updateCooptationstatus(memberId: string, cooptationId: string, status: string): Promise<any>;
    getuserByEmail(email: any): Promise<{
        user: any;
        token: string;
    }>;
    updateuser(id: string, UserDTO: CreateUserDTO): Promise<any>;
    updateCondidat(id: string, cooptationId: string): Promise<any>;
    activate(id: string): Promise<any>;
    deactivate(id: string): Promise<any>;
    ResetUserPassword(restpassDto: ResetUserPasswordDto): Promise<any>;
    ResetMyPassword(password: any, id: string): Promise<any>;
    DeleteUser(id: string): Promise<{
        message: string;
    }>;
    findUserByRole(): Promise<any>;
    findUsers(): Promise<any>;
    findUsersById(id: string): Promise<any>;
}
