import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user_data: any;
    }>;
}
