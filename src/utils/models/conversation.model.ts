export interface LatestMessage {
  text: string;
  timeStamp: number;
}
export interface Conversation {
  uid: string;
  displayName: string;
  avatar?: string;
  latestMessage?: LatestMessage;
}
