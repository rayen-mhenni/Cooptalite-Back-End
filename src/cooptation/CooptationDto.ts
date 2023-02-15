export class cv {
  trustrate: string;
  currentMemberScore: string;
  name: string;
}

export class CooptationDto {
  member: string;
  candidat: string;
  offer: string;
  date: string;
  cvs: cv[];
  type: string;
  trustrate: string;
  status: string;
  currentMemberScore: string;
}
