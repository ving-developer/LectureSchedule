import { SpeakerLecture } from "./SpeakerLecture";

export interface Speaker{
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  phone: string;
  email: string;
  speakerLectures: SpeakerLecture[];
}
