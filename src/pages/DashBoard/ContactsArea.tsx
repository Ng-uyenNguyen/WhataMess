import { useEffect, useContext, useState } from "react";

import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SideBarModes } from "../../utils/enums/sidebar.enum";
import ChatBox from "./ChatBox";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { Conversation } from "../../utils/models/conversation.model";

const ContactsArea = () => {
  const [contactList, setContactList] = useState<Conversation[]>([]);
  //@ts-ignore
  const { currentUser } = useContext(AuthContext);

  const searchResult = useSelector((state: RootState) => state.search.userList);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "conversations", currentUser.uid), (doc) => {
        if (doc && doc.data()) {
          let conversations: Conversation[] = [];
          Object.entries(doc.data() || {})
            .sort((a, b) => b[1].latestTimeGetTouch - a[1].latestTimeGetTouch)
            .forEach((item) => {
              conversations.push(item[1] as Conversation);
            });

          setContactList(conversations);
        }
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const sideBarMode = useSelector((state: RootState) => state.sidebar.currentMode);
  return (
    <div className="pt-5 flex flex-col flex-1 overflow-hidden">
      {sideBarMode === SideBarModes.RECENT && (
        <>
          <div className="flex justify-between items-center">
            <span className="tracking-wide text-slate-500 font-medium">Latest chats</span>
            <div className="flex">
              <button className="px-2 py-2 rounded-xl text-green bg-light-green hover:bg-green-3 hover:text-light-green">
                <PlusIcon className="w-5 h-5 " />
              </button>
              <button>
                <EllipsisVerticalIcon className="ml-3 w-8 h-8 font-bold text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
          <div className="mt-5 min-h-0 flex-1 overflow-auto">
            {contactList.map((contact) => (
              <ChatBox key={contact.userInfo.uid} conversationInfo={contact} />
            ))}
          </div>
        </>
      )}
      {sideBarMode === SideBarModes.FRIENDS && (
        <div>
          <div className="flex justify-between items-center">
            <span className="tracking-wide text-slate-500 font-medium">New Contacts</span>
            <div className="flex">
              <button className="px-2 py-2 rounded-xl text-green bg-light-green hover:bg-green-3 hover:text-light-green">
                <PlusIcon className="w-5 h-5 " />
              </button>
              <button>
                <EllipsisVerticalIcon className="ml-3 w-8 h-8 font-bold text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
          <div className="mt-5 min-h-0 flex-1 overflow-auto">
            {searchResult.map((result) => (
              <ChatBox key={result.userInfo.uid} conversationInfo={result} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ContactsArea;
