import { Lecture } from "./Lecture";
import { Speaker } from "./Speaker";

export interface SpeakerLecture{
  speakerId: number;
  speaker: Speaker;
  lectureId: number;
  lecture: Lecture;
}
