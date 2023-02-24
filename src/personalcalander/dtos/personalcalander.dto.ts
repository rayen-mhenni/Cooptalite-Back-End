export class event{  
    title: string;
      start: string; //start date
      end: string; //end date
      desc: string;
      id: number; //id for calendar component
      type: string;
    }
    export class calendarDTO{
      userId: string;
      date: string;
      listOfActivity: event[];
    }