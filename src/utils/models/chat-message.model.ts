import { Timestamp } from "firebase/firestore";

export interface ChatMessageModel {
  id?: string;
  text?: string;
  senderId?: string;
  time?: Timestamp;
}
