export type ability = {
  action: string;
  subject: string;
  status: boolean;
};

export class parRolesDTO {
  name: string;
  status: boolean;
  ability: string[];
}
