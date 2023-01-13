export type userability = {
    action: string;
    subject: string;
};
export type userHeader = {
    avatar: string;
    username: string;
    designation: string;
    coverImg: string;
    contact: string;
};
export type userAbout = {
    about: string;
    joined: string;
    lives: string;
    website: string;
    email: string;
};
export type userprofileData = {
    header: userHeader;
    userAbout: userAbout;
    cvfile: string;
    landingurl: string;
    role: string;
};
export declare class CreateUserDTO {
    profileData: userprofileData;
    password: string;
    ability: userability[];
    linkedUsers: string[];
    status: string;
}
