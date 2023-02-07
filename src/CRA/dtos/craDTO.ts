export class activityExtendedProps {
  categorie: string;
  activity: string;
  nb: string;
  desc: string;
}
export class activity {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  extendedProps: activityExtendedProps & any;
  id: number;
  display: string;
}
export class craDTO {
  status: string;
  userId: string;
  date: string;
  listOfActivity: activity[];
}
