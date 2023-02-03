export class field {
  fieldtype: string;
  fieldname: string;
  required: boolean;
}
export class valuewithcolor {
  value: string;
  color: string;
}

export class craConfigDTO {
  userId: string;
  parcodecategorie: string;
  parcodeactivity: string;
  categorywithcolors: valuewithcolor[];
  extendedProps: field[];
}
