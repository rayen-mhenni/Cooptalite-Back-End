export class comment {
  userId: string;
  date: string;
  comment: string;
  listReply?: comment[];
}
export class actualiteDTO {
  imgUrl: string;
  title: string;
  tags: string[];
  desc: string;
  favorite: string[];
  status: boolean;
  comments?: comment[];
}
