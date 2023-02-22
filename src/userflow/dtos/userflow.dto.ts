import { type } from "os";
import { flowData } from "src/flow/dtos/flow.dto";

export class CreateUserflowDTO {
    companyId: string;
    userId: string;
    offerId: string;
    memberId: string;
    userFlow: flow[];
    
}
export type flow = flowData & {
    status: string;
    statusDate: string;
}