import { PublicityCampaign } from "./PublicityCampaign";
import { SpeakerLecture } from "./SpeakerLecture";
import { TicketLot } from "./TicketLot";

export interface Lecture{
  id: number;
  local: string;
  date: Date;
  theme: string;
  maxPeopleSupported: number;
  adress: string;
  imageUrl: string;
  email: string;
  phone: string;
  ticketLots: TicketLot[];
  publicityCampaigns: PublicityCampaign[];
  speakerLectures: SpeakerLecture[];
}
