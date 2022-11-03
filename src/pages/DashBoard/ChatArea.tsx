import { FaceSmileIcon, PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import ChatMessage from "./ChatMessage";

const ChatArea = () => (
  <div className="bg-stone rounded-lg flex-1 flex flex-col pb-4 overflow-hidden">
    <div className="h-[5vh] flex justify-between box-content py-4 px-4 items-center border-b border-b-gray-300">
      <span className="text-2xl font-medium">Anonymous Chat</span >
      <div>
        <button className="px-3 py-2 min-w-[100px] rounded-lg text-base font-medium text-green bg-green-2">Messages</button>
        <button className="px-3 py-2 min-w-[100px] rounded-lg text-base font-medium text-gray-500 hover:text-green">Participants</button>
      </div>
    </div >
    <div className="px-4 flex-1 overflow-auto">
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage />
      <ChatMessage isSelfMessage={false} />
      <ChatMessage isSelfMessage={false} />
    </div>
    <div className="px-4 mt-auto relative">
      <div className="flex absolute inset-y-0 right-8 items-center pl-3 z-10">
        <FaceSmileIcon className="w-6 h-6 mx-2 cursor-pointer text-gray-300 hover:text-gray-500" />
        <PaperClipIcon className="w-6 h-6 mx-2 cursor-pointer text-gray-300 hover:text-gray-500" />
        <button className="px-3 py-3 mx-2 bg-green hover:bg-green-4 active:bg-green-5 rounded-xl shadow-lg">
          <PaperAirplaneIcon className="w-6 h-6  cursor-pointer text-white -rotate-45" />
        </button>
      </div>
      <input type="text" autoComplete="off" id="message" className="relative z-0 block py-5 pl-5 w-full text-base tracking-wide font-medium text-gray-500 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring focus:ring-green-2" placeholder="Write your messages... " />
    </div>
  </div >
)
export default ChatArea;