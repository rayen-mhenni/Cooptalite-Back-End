import { CreateUserDTO } from '../user/dtos/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    register(createUserDTO: CreateUserDTO): Promise<import("../user/user.schema").User>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    getDashboard(req: any): any;
}
