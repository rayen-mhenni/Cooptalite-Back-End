export type from = {
  email: string;
  name: string;
  avatar: string;
};

export type to = [
  {
    name: string;
    email: string;
  },
];

export type attachments = [
  {
    fileName: string;
    thumbnail: string;
    url: string;
    size: string;
  },
];

export class EmailDTO {
  from: from;
  to: to;
  subject: string;
  cc: string[];
  bcc: string[];
  message: string;
  attachments: attachments;
  isStarred: boolean;
  labels: string[];
  time: string;
  replies: string[];
  folder: string;
  isRead: boolean;
}
