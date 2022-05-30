import { Lecture } from "./Lecture";

export interface TicketLot{
  id:  number;
  name:  string;
  price:  number;
  startDate:  Date;
  endDate:  Date;
  quantity:  number;
  lectureId:  number;
  lecture:  Lecture;
}
