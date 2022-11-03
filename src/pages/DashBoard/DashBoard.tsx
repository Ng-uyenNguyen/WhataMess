import { Toast } from "../../components/Toast";
import LeftSideBar from "../../layouts/LeftSideBar";
import RightSideBar from "../../layouts/RightSideBar";
import { ToastType } from "../../utils/enums/toast.enum";
import ChatArea from "./ChatArea";
import ChatHistory from "./ChatHistory";
import UserProfile from "./UserProfile";
function DashBoard() {
  return (
    <div className="w-full h-full flex">
      <LeftSideBar />
      <div className="pt-7 pb-5 ml-4 flex flex-grow ">
        <div className="min-w-[400px] max-w-[400px] flex-grow-[0.5] overflow-hidden flex flex-col">
          <UserProfile />
          <ChatHistory />
        </div>
        <div className="px-5 flex-grow-[2] flex-wrap flex flex-col ">
          <ChatArea />
        </div>
      </div>
      <RightSideBar />
      <Toast type={ToastType.SUCCESS} text="Login successfully!" show={true} />
    </div>
  );
}

export default DashBoard;








