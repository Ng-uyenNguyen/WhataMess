import { useEffect, useState, useContext } from "react";
import { FaceSmileIcon, PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { ChatMessageModel } from "../../utils/models/chat-message.model";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
//@ts-ignore
import { v4 as uuid } from "uuid";
import { searchUserByEmail } from "../../redux/contacts.slice";

const ChatArea = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessageModel[]>([]);
  const [chatMessageText, setChatMessageText] = useState("");
  const [textAreLines, setTextAreLines] = useState(1);
  //@ts-ignore
  const { currentUser } = useContext(AuthContext);

  const currentChatId = useSelector((state: RootState) => state.chat.chatId);
  const currentSearchText = useSelector((state: RootState) => state.search.searchText);
  const currentChattingUserInfo = useSelector((state: RootState) => state.chat.currentChattingUser);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getConversation = () => {
      const unSub = onSnapshot(doc(db, "conversation", currentChatId), (doc) => {
        doc.exists() && setChatMessages(doc.data().messages as ChatMessageModel[]);
      });

      return () => {
        unSub();
      };
    };
    currentChatId && getConversation();
  }, [currentChatId]);

  const addNewLineToTextArea = () => {
    const messageWithNewLine = chatMessageText + "\r\n";
    console.log(messageWithNewLine);
    setTextAreLines(textAreLines + 1);
    setChatMessageText(messageWithNewLine);
  };

  const handleSendMessage = async () => {
    if (currentChatId && currentChattingUserInfo) {
      if (chatMessages.length === 0) {
        dispatch(searchUserByEmail(currentSearchText));
      }
      await updateDoc(doc(db, "conversation", currentChatId), {
        messages: arrayUnion({
          id: uuid(),
          text: chatMessageText,
          senderId: currentUser.uid,
          time: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "conversations", currentUser.uid), {
        [currentChatId + ".latestMessage"]: {
          text: chatMessageText,
        },
        [currentChatId + ".latestTimeGetTouch"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "conversations", currentChattingUserInfo.uid), {
        [currentChatId + ".latestMessage"]: {
          text: chatMessageText,
        },
        [currentChatId + ".latestTimeGetTouch"]: serverTimestamp(),
      });
      setChatMessageText("");
    }
  };
  return (
    <div className="bg-stone rounded-lg flex-1 flex flex-col pb-4 overflow-hidden">
      <div className="h-[5vh] flex justify-between box-content py-4 px-4 items-center border-b border-b-gray-300">
        <span className="text-2xl font-medium">{currentChattingUserInfo?.displayName}</span>
        <div>
          <button className="px-3 py-2 min-w-[100px] rounded-lg text-base font-medium text-green bg-green-2">Messages</button>
          <button className="px-3 py-2 min-w-[100px] rounded-lg text-base font-medium text-gray-500 hover:text-green">Participants</button>
        </div>
      </div>
      <div className="px-4 flex-1 overflow-auto">
        {chatMessages.map((message) => (
          <ChatMessage key={message.id} chatMessage={message} isSelfMessage={message.senderId === currentUser.uid} />
        ))}
      </div>
      <div className="px-4 mt-auto relative">
        <div className="flex absolute inset-y-0 right-8 items-center pl-3 z-10">
          <FaceSmileIcon className="w-6 h-6 mx-2 cursor-pointer text-gray-300 hover:text-gray-500" />
          <PaperClipIcon className="w-6 h-6 mx-2 cursor-pointer text-gray-300 hover:text-gray-500" />
          <button className="px-3 py-3 mx-2 bg-green hover:bg-green-4 active:bg-green-5 rounded-xl shadow-lg">
            <PaperAirplaneIcon className="w-6 h-6  cursor-pointer text-white -rotate-45" />
          </button>
        </div>
        <textarea
          // rows={textAreLines}
          rows={1}
          autoComplete="off"
          id="message"
          className="resize-none relative z-0 block py-5 pl-5 w-full text-base tracking-wide font-medium text-gray-500 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring focus:ring-green-2"
          placeholder="Write your messages... "
          onChange={(e) => setChatMessageText(e.target.value)}
          value={chatMessageText}
          onKeyDown={(e) => {
            if (e.code === "Enter" && e.altKey) {
              e.preventDefault();
              addNewLineToTextArea();
              return;
            }
            if (e.code === "Enter" && !e.altKey) {
              e.preventDefault();
              setChatMessageText("");
              handleSendMessage();
            }
          }}
        />
      </div>
    </div>
  );
};
export default ChatArea;
