import { useState } from "react";
import { Toast } from "../../components/Toast";
import LeftSideBar from "../../layouts/LeftSideBar";
import RightSideBar from "../../layouts/RightSideBar";
import { ToastType } from "../../utils/enums/toast.enum";
import ChatArea from "./ChatArea";
import ContactsArea from "./ContactsArea";
import UserProfile from "./UserProfile";
function DashBoard() {
  const [show, setShow] = useState(true);
  return (
    <div className="w-full h-full flex">
      <LeftSideBar />
      <div className="pt-7 pb-5 flex flex-grow ">
        <div className="min-w-[300px] max-w-[35%] flex-grow-[0.5] px-2 overflow-hidden flex flex-col">
          <UserProfile />
          <ContactsArea />
        </div>
        <div className="flex-grow-[2] flex-wrap flex flex-col ">
          <ChatArea />
        </div>
      </div>
      <RightSideBar />
      <Toast type={ToastType.SUCCESS} text="Login successfully!" show={show} setShow={setShow} />
    </div>
  );
}

export default DashBoard;
