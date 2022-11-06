import { doc, getDoc, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { DateUltils } from "../../commons/helpers/date-time.helper";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { updateCurrentChat, updateCurrentChattingUser } from "../../redux/chatbox.slice";
import { Conversation } from "../../utils/models/conversation.model";
import { UserProfileModel } from "../../utils/models/user-profile.model";
import avatar from "./../../assets/images/User-avatar.svg.webp";

type PropTypes = {
  conversationInfo: Conversation;
};
const ChatBox = ({ conversationInfo }: PropTypes) => {
  //@ts-ignore
  const { currentUser } = useContext(AuthContext);

  const dispatch = useDispatch();

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId = currentUser.uid > conversationInfo.userInfo.uid ? currentUser.uid + conversationInfo.userInfo.uid : conversationInfo.userInfo.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "conversation", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "conversation", combinedId), { messages: [] });

        //create user chats

        await updateDoc(doc(db, "conversations", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: conversationInfo.userInfo.uid,
            displayName: conversationInfo.userInfo.displayName,
            avatar: conversationInfo.userInfo.avatar,
          },
          [combinedId + ".latestTimeGetTouch"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "conversations", conversationInfo.userInfo.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            avatar: currentUser.avatar,
          },
          [combinedId + ".latestTimeGetTouch"]: serverTimestamp(),
        });
      } else {
        const currentChattingUserInfo: UserProfileModel = {
          uid: conversationInfo.userInfo.uid,
          displayName: conversationInfo.userInfo.displayName,
          avatar: conversationInfo.userInfo.avatar,
        };
        dispatch(updateCurrentChattingUser(currentChattingUserInfo));
        dispatch(updateCurrentChat(combinedId));
      }
    } catch (err) {}
  };
  return (
    <div className="flex items-center px-4 py-6 rounded-lg cursor-pointer hover:bg-slate-100" onClick={handleSelect}>
      <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
      <div className="flex flex-col flex-1 ml-5">
        <div className="flex flex-shrink justify-between items-end mb-1">
          <div className="font-semibold text-lg leading-none">{conversationInfo.userInfo.displayName}</div>
          <div className="font-base text-zinc-600 italic tracking-wide">{conversationInfo.latestMessage && DateUltils.formatTimeStamp(conversationInfo.latestTimeGetTouch, DateUltils.DD_MM)}</div>
        </div>
        <div className="flex-shrink text-neutral-500 tracking-wide text-ellipsis">
          <div className="max-w-full whitespace-nowrap overflow-hidden text-ellipsis">{conversationInfo.latestMessage ? conversationInfo.latestMessage.text : "New contact"}</div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
