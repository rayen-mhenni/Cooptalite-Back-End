import { CreateUserDTO } from './dtos/create-user-dto';
import { UserService } from 'src/user/user.service';
import { ResetUserPasswordDto } from './dtos/ResetUserPasswordDto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    UpdateProfile(id: string, UserDTO: CreateUserDTO): Promise<any>;
    updateuser(id: string, UserDTO: CreateUserDTO): Promise<any>;
    activate(id: string): Promise<any>;
    deactivate(id: string): Promise<any>;
    ResetUserPassword(restpassDto: ResetUserPasswordDto): Promise<any>;
    DeleteUser(id: string): Promise<{
        message: string;
    }>;
    findUserByRole(): Promise<any>;
    findUsers(): Promise<any>;
    findUsersById(id: string): Promise<any>;
}
