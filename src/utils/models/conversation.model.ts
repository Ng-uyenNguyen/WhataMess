import { UserProfileModel } from "./user-profile.model";
export interface LatestMessage {
  text: string;
}
export interface Conversation {
  userInfo: UserProfileModel;
  latestMessage?: LatestMessage;
  latestTimeGetTouch?: string;
}
