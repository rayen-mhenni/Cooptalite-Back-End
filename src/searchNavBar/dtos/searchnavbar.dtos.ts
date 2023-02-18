import { type } from 'os';

export class PagesObj {
  target: string;
  bookmarked: boolean;
  title: { type: String; unique: true };
  icon: string;
  link: string;
}
export class FilesObj {
  by: string;
  title: { type: String; unique: true };
  size: string;
  file: string;
}
export class ContactsObj {
  title: { type: String; unique: true };
  email: string;
  img: string;
  date: string;
}
export type SearchObj = PagesObj | FilesObj | ContactsObj;

export class SearchnavbarDTO {
  groupTitle: string;
  searchLimit: Number;
  data: (SearchObj)[];
  title: any;
}
