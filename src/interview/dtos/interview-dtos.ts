import { User } from "src/user/user.schema";

export class CreateInterviewDTO {
    title: string;
    description: string;
    linkedUsers: String;
   // managerId: string[];
    dateInterview: string;
    heureInterview: string;
    status: string;
   
  }