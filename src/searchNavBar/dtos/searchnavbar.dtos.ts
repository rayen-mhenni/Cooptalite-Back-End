export class PagesObj {
  target: string;
  bookmarked: boolean;
  title: string;
  icon: string;
  link: string;
}
export class FilesObj {
  by: string;
  title: string;
  size: string;
  file: string;
}
export class ContactsObj {
  title: string;
  email: string;
  img: string;
  date: string;
}
export type SearchObj = PagesObj | FilesObj | ContactsObj;

export class SearchnavbarDTO {
  groupTitle: string;
  searchLimit: number;
  data: SearchObj[];
}
