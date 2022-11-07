import { useSelector } from "react-redux";
import { DateUltils } from "../../commons/helpers/date-time.helper";
import { RootState } from "../../store";
import { ChatMessageModel } from "../../utils/models/chat-message.model";
import avatar from "./../../assets/images/avatar.png";
type PropTypes = {
  isSelfMessage?: boolean;
  chatMessage: ChatMessageModel;
};
const ChatMessage = ({ isSelfMessage = false, chatMessage }: PropTypes) => {
  const currentChattingUserInfo = useSelector((state: RootState) => state.chat.currentChattingUser);
  return (
    <div className="flex flex-col my-5 w-full">
      <div className={"flex gap-2 " + (isSelfMessage && "flex-row-reverse")}>
        {!isSelfMessage && <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full self-end object-cover" />}
        <div className="flex flex-col max-w-[70%]">
          <span className={"text-xs font-medium text-zinc-700 " + (isSelfMessage && "self-end")}>{(isSelfMessage ? "You, " : `${currentChattingUserInfo?.displayName}, ` || "") + DateUltils.formatTimeStamp(chatMessage.time, DateUltils.HH_MM_12)}</span>
          <div className={"text-gray-600 w-fit px-3 py-4 mt-3 bg-white rounded-xl tracking-wide shadow-md " + (isSelfMessage && "self-end")}>{chatMessage.text}</div>
        </div>
      </div>
    </div>
  );
};
export default ChatMessage;
