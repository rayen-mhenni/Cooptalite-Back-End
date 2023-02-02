export class activity {
  categorie: string;
  activity: string;
  start: string;
  end: string;
  allDay: boolean;
  nb: string;
  desc: string;
  extendedProps: any;
  id: number;
}
export class craDTO {
  status: string;
  userId: string;
  date: string;
  listOfActivity: activity[];
}
