export class activity {
  categorie: string;
  activity: string;
  start: string;
  end: string;
  allDay: string;
  nb: string;
  desc: string;
  extendedProps: any;
}
export class craDTO {
  status: string;
  userId: string;
  date: string;
  listOfActivity: activity[];
}
