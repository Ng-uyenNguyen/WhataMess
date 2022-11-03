import avatar from "./../../assets/images/real-avatar.jpg";
const ChatBox = () => (
  <div className="flex items-center px-4 py-6 rounded-lg cursor-pointer hover:bg-[#f7f8fa]">
    <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
    <div className="flex flex-col flex-1 ml-5 overflow-hidden">
      <div className="flex flex-shrink justify-between items-end leading-4 mb-1 overflow-hidden">
        <div className="font-bold text-lg leading-none">Kate Johnson</div>
        <div className="font-medium text-stone-500">11:15</div>
      </div>
      <div className="flex-shrink text-neutral-500 tracking-wide text-ellipsis">
        <div className="max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam similique, inventore ex exercitationem voluptatibus a perspiciatis corrupti magni ratione quasi vel eum laboriosam quo sit! Velit illo ex pariatur consectetur.
        </div>
      </div>
    </div>
  </div>
)
export default ChatBox;