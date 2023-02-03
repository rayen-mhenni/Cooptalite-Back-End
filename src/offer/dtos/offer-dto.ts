export type company = {
  name: string;
  branding: string;
  field: string;
  nbemployees: number;
  about: string;
  logo: string;
  cover: string;
};

export class CreateOfferDTO {
  title: string;
  description: string;
  requiredSkills: string[];
  duration: string;
  startDate: string;
  image: string;
  expYears: string;
  type: string;
  contract: string;
  address: string;
  status: string;
  category: string;
  company: string;
}
