import { CreateUserDTO } from './dtos/create-user-dto';
import { UserService } from 'src/user/user.service';
import { ResetUserPasswordDto } from './dtos/ResetUserPasswordDto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    UpdateProfile(id: string, UserDTO: CreateUserDTO): Promise<any>;
    ResetUserPassword(restpassDto: ResetUserPasswordDto): Promise<any>;
    UpdateUser(id: string, UserDTO: CreateUserDTO): Promise<any>;
    DeleteUser(id: string): Promise<{
        message: string;
    }>;
}
