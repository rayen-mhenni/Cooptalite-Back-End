export type userability = {
    action: string;
    subject: string;
};
export declare class CreateUserDTO {
    username: string;
    email: string;
    password: string;
    roles: string[];
    ability: userability[];
    avatar: string;
    landingurl: string;
}
