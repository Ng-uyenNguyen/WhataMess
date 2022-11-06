import { Fragment, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, DocumentIcon, LinkIcon } from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { RootState } from "../store";
import { fileTypeConfig, rightSideBarConfig, rightSideBarIcons } from "../utils/configs/sidebar.config";
import avatar from "./../assets/images/real-avatar.jpg";
import { RightSideBarIcons } from "../utils/enums/sidebar.enum";
import Tooltip from "../components/Tooltip";
import { Transition } from "@headlessui/react";
import SearchBox from "../components/Search";

function RightSideBar() {
  const [isExpand, setIsExpand] = useState(false);
  const [fileOrLink, setFileOrLink] = useState(1);

  const sideBarRef = useRef<HTMLDivElement>(null);
  const emptyArray = Array.from(Array(30).keys());

  const handleExpandAndShrink = () => {
    if (sideBarRef.current) {
      if (!isExpand) {
        setIsExpand(true);
        sideBarRef.current.style.width = "22%";
        sideBarRef.current.style.minWidth = "22%";
        sideBarRef.current.style.maxWidth = "22%";
      } else {
        setIsExpand(false);
        sideBarRef.current.style.minWidth = "0px";
        sideBarRef.current.style.width = "90px";
      }
    }
  };

  return (
    <div className="w-[90px] overflow-y-hidden h-full flex flex-col items-center pt-7 pb-5 border-l border-l-gray-200 transition-all duration-300 " ref={sideBarRef}>
      <div className={!isExpand ? "justify-center" : "w-full justify-start"}>
        <div className={"h-[5vh] box-content py-4 flex gap-5 items-center mb-5 border-b border-b-gray-300 " + (isExpand && "px-5")}>
          <div className="px-3 py-3 bg-[#f0f1f3] rounded-xl cursor-pointer hover:bg-gray-200" onClick={handleExpandAndShrink}>
            {isExpand ? <ChevronRightIcon className="w-6 h-6 text-green font-bold " /> : <ChevronLeftIcon className="w-6 h-6 text-green font-bold " />}
          </div>
          {isExpand && <div className="text-xl font-semibold text-opacity-95 text-zinc-900">Shared files</div>}
        </div>
      </div>
      <img className={"rounded-full object-cover " + (!isExpand ? "w-10 h-10" : "w-32 h-32")} src={avatar} alt="Rounded avatar" />
      {!isExpand ? (
        <ul className="absolute top-1/2 -translate-y-[50%] w-fit flex flex-col items-center justify-between h-[40%] text-sm font-medium text-gray-500 dark:text-gray-400">
          {rightSideBarConfig.map((item) => {
            return (
              <li key={item.value}>
                <Tooltip text={item.value} styles="!right-[60%] !w-fit">
                  {item.icon}
                </Tooltip>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-4 w-full flex flex-1 min-h-0 overflow-y-hidden flex-col gap-4">
          <div className="text-2xl font-medium text-center">Celline Moreno</div>
          <SearchBox />
          <div className="px-5 w-full flex justify-between gap-5">
            <ShareTypeBox active={fileOrLink === 1} switchType={() => setFileOrLink(1)} shareType={1} total={250} />
            <ShareTypeBox active={fileOrLink === 2} switchType={() => setFileOrLink(2)} shareType={2} total={45} />
          </div>
          <Transition show={fileOrLink === 1} enter="transition-opacity duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-200" leaveFrom="opacity-100" leaveTo="opacity-0" className="flex-1 overflow-hidden pb-3">
            <div className="px-5 text-gray-600 text-base text-left font-semibold tracking-wide">File types</div>
            <div
              className="h-full
             flex-col overflow-auto">
              {fileTypeConfig.map((item) => (
                <FileType key={item.value} file={item} />
              ))}
            </div>
          </Transition>
          <Transition as={Fragment} show={fileOrLink === 2} enter="transition-opacity duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="flex-1 flex flex-col px-5 w-full overflow-hidden">
              <div className="text-gray-600 text-base text-left font-semibold tracking-wide">All links</div>
              <div className="h-full overflow-auto">
                {emptyArray.map((_, index) => (
                  <CustomLinkWithTooltip key={index} link="https://www.google.com/webhp?hl=vi&sa=X&ved=0ahUKEwiBvLzxno74AhX1qlYBHY8jC1UQPAgI" toolTipUp={emptyArray.length - 1 - index < 3} />
                ))}
              </div>
            </div>
          </Transition>
        </div>
      )}
    </div>
  );
}

const FileType = ({ file }: { file: rightSideBarIcons }) => {
  return (
    <div className={`px-5 w-full py-4 flex items-center justify-between cursor-pointer hover:bg-gray-100`}>
      <div className="flex">
        {file.icon}
        <div className="ml-4">
          <div className="capitalize text-base font-bold">{file.value}</div>
          <div className="text-gray-400 font-light">126 files, 193MB</div>
        </div>
      </div>
      <ChevronRightIcon className="w-6 h-6 text-gray-500" />
    </div>
  );
};

const ShareTypeBox = ({ active, switchType, shareType, total }: { active: boolean; switchType: any; shareType: number; total: number }) => {
  return (
    <div className={"relative flex-1 py-7 flex text-center justify-center items-center rounded-xl gap-2 cursor-pointer " + (active ? "bg-light-green" : "bg-neutral-50")} onClick={switchType}>
      <LinkIcon className={"w-10 h-10 " + (active ? "text-green" : "text-gray-400")} />
      <div>
        <div className={"text-xs font-medium " + (active ? "text-[#15594e]" : "text-gray-400")}>{shareType === 1 ? "All files" : "All links"}</div>
        <div className={"text-3xl font-semibold " + (active ? "text-[#15594e]" : "text-gray-400")}>{total}</div>
      </div>
      {active && (
        <div className="px-1 py-1 absolute top-2 right-2 bg-white rounded-full">
          <div className="bg-green h-[7px] w-[7px] rounded-full" />
        </div>
      )}
    </div>
  );
};

const CustomLinkWithTooltip = ({ link, toolTipUp = false }: { link: string; toolTipUp?: boolean }) => {
  return (
    <div className="w-full flex items-center text-gray-500 hover:text-gray-700 my-2 gap-1">
      <LinkIcon className="w-4 h-4" />
      <div className="w-[90%]">
        <Tooltip text={link} styles={"w-full !left-0 " + (toolTipUp ? "!bottom-[50%]" : "!top-[100%]")}>
          <a href={link} target="_blank" rel="noopener noreferrer" className="max-w-full text-left block overflow-hidden hover:underline whitespace-nowrap text-ellipsis cursor-pointer">
            {link}
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default RightSideBar;
