import { onSnapshot, doc } from "firebase/firestore";
import { globalUserId } from "../context/AuthContext";
import { Conversation } from "../utils/models/conversation.model";
import { db } from "../firebase/firebase";

export const getConversationsRealtime = onSnapshot(doc(db, "conversations", globalUserId), (doc) => {
  if (doc && doc.data()) {
    let conversations: Conversation[] = [];
    Object.entries(doc.data() || {}).forEach((item) => {
      conversations.push(item[1] as Conversation);
    });
    console.log(conversations);
  }
});
