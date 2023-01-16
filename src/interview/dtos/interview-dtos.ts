import { User } from "src/user/user.schema";

export class CreateInterviewDTO {
    title: string;
    description: string;
    candidate: User;
    interviewer: User;
    dateInterview: string;
    heureInterview: string;
    status: string;
   
  }