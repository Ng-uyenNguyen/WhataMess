import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Conversation } from "../../utils/models/conversation.model";
import { globalUserId } from "../../context/AuthContext";
import { UserProfileModel } from "../../utils/models/user-profile.model";

export const getNewUserContactListByEmail = async (email: string) => {
  const q = query(collection(db, "users"), where("email", ">=", email), where("email", "<=", email + "\uf8ff"));
  const conversationRef = doc(db, "conversations", globalUserId);
  try {
    const userList: Conversation[] = [];
    const conversationList: Conversation[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const user: Conversation = {
        userInfo: {
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          avatar: doc.data().avatar,
        },
      };
      userList.push(user);
    });

    const conversations = await getDoc(conversationRef);
    if (conversations && conversations.data()) {
      Object.entries(conversations.data() || {}).forEach((item) => {
        conversationList.push(item[1] as Conversation);
      });
    }
    const searchResult = userList.filter(
      (user) =>
        !conversationList.some((con) => {
          console.log(user.userInfo.uid + " user");
          console.log(globalUserId + " global");

          return (con.userInfo.uid === user.userInfo.uid && con.latestMessage) || user.userInfo.uid === globalUserId;
        })
    );

    return searchResult;
  } catch (err) {
    throw new Error("" + err);
  }
};

export const getUserProfileByUid = async (uid: string) => {
  if (uid) {
    const userDoc = doc(db, "users", uid);
    try {
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        return userSnapshot.data() as UserProfileModel;
      }
    } catch (err) {
      console.error(err);
    }
  }
};
