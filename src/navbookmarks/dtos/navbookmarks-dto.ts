import { User } from 'src/user/user.schema';

export class NavobjData {
  target: string;
  isbookmarked: boolean;
  title: string;
  icon: string;
  link: string;
}

export class CreateFavoriteDTO {
  userId: string;

  NavObj: NavobjData[];
}
