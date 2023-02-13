export class Language {
  language: string;
  level: string;

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


export class CreateCvteckDTO {
  firstname: string;
  lastname: string;
  phonenum: string;
  linkedin: string;
  email: string;
  skills: string[];
  experience: Experience;
  education: Education;
  languages: Language;
  status: string;
  categorie: string;
  cvname: string;
  imgUrl: string;
  post: string;
}
