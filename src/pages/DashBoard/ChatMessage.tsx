import avatar from "./../../assets/images/real-avatar.jpg";

const ChatMessage = ({ isSelfMessage = false }: { isSelfMessage: boolean }) => (
  <div className="flex flex-col my-5 w-full">
    <div className={"flex gap-2 " + (isSelfMessage && 'flex-row-reverse')}>
      {!isSelfMessage && <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full self-end object-cover" />}
      <div className="flex flex-col max-w-[70%]">
        <span className={"text-xs font-medium text-zinc-700 " + (isSelfMessage && 'self-end')}>{isSelfMessage ? "You" : "Mike Scott"}, 11:25</span>
        <div className={"text-gray-600 w-fit px-3 py-4 mt-3 bg-white rounded-xl tracking-wide shadow-md " + (isSelfMessage && 'self-end')}>Lorem ipsum, dolor sit amet consecte</div>
        <div className={"text-gray-600 w-fit px-3 py-4 mt-3 bg-white rounded-xl tracking-wide shadow-md " + (isSelfMessage && 'self-end')}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime voluptatibus assum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime voluptatibus assumLorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime voluptatibus assum</div>
      </div>
    </div>
  </div>
)
export default ChatMessage;