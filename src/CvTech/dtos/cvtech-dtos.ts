export class Language {
  language: string;
  level: string;
}
export class media {
  name: string;
  link: string;
}
export class Education {
  diplome: string;
  school: string;
  years: string;
}
export class Experience {
  post: string;
  description: string;
  company: string;
  years: string;
}

export class CreateCvtechDTO {
  firstname: string;
  lastname: string;
  phone: string;
  media: media[];
  email: string;
  skills: string[];
  profile: string;
  experience: Experience[];
  education: Education[];
  languages: Language[];
  certificates: string[];
  status: string;
  categorie: string;
  cvname: string;
  imgUrl: string;
  post: string;
}
