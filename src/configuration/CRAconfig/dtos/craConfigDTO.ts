export class field {
  fieldtype: string;
  fieldname: string;
  required: boolean;
}
export class craConfigDTO {
  userId: string;
  parcodecategorie: string;
  parcodeactivity: string;
  extendedProps: field[];
}
