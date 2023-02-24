export class CreateFlowDTO {
  companyId: string;
  flow: flowData[];
}
export class flowData {
  taskName: string;
  order: number;
  action: string;
  required: string[];
}
