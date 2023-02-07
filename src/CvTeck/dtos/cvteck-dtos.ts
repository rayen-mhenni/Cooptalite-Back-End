export class CreateCvteckDTO {
  firstname: string;
  lastname: string;

  phonenum: string;
  linkedin: string;
  email: string;
  skills: string[];
  informations: string[];
  experience: string[];
  education: string[];
  languages: [];
  status: string;
  categorie: string;
  cvname: string;

}
export class Language {
  language: string;
  level: string;

}
export class Education {
  diplome: string;
  school: string;
  years: string;
}