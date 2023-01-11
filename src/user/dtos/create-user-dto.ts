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
  email: string;
};

export type userAbout = {
  about: string;
  joined: string;
  lives: string;
  website: string;
};

export type userprofileData = {
  header: userHeader;
  userAbout: userAbout;
  cvfile: string;
  landingurl: string;
  role: string;
};

export class CreateUserDTO {
  profileData: userprofileData;
  password: string;
  ability: userability[];
  linkedUsers: string[];
}
