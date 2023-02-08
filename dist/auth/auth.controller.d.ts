import { CreateUserDTO } from '../user/dtos/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    register(createUserDTO: CreateUserDTO): Promise<any>;
    registerCandidat(createUserDTO: CreateUserDTO, id: string, offerid: string, trustrate: string): Promise<any>;
    login(req: any): Promise<{
        access_token: string;
        user_data: any;
    }>;
    getCandidat(req: any): any;
    getProfile(req: any): any;
    getDashboard(req: any): any;
}
