import * as React from 'react';

import { Menu, Transition } from "@headlessui/react";
import { ArrowLeftOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/chat-app-logo.png";
import { auth } from '../firebase/firebase';
import { changeMode } from "../redux/sidebar.slice";
import { RootState } from "../store";
import { leftSidebarConfig } from "../utils/configs/sidebar.config";
import Tooltip from '../components/Tooltip';

function LeftSideBar() {
  const dispatch = useDispatch();

  const activeStyle =
    " bg-light-green after:absolute after:bg-green after:h-full after:w-[3px] after:top-0 after:right-[-16px] after:transition after:duration-500";
  const sideBarMode = useSelector(
    (state: RootState) => state.sidebar.currentMode
  );
  const logOut = () => {
    signOut(auth)
  }
  return (
    <div className="h-full w-[80px] flex flex-col justify-between items-center px-4 pt-7 pb-5 border border-r-gray-200">
      <img src={logo} alt="logo" className="w-10 pt-3" />
      <ul className="w-fit flex flex-col items-center justify-between h-1/3 text-sm font-medium text-gray-500 dark:text-gray-400">
        {leftSidebarConfig.map((item) => (
          <li
            key={item.mode}
            className={
              "cursor-pointer px-3 py-3 relative rounded-lg hover:bg-light-green transition duration-500" +
              (sideBarMode === item.mode ? activeStyle : "")
            }
            onClick={() => {
              dispatch(changeMode(item.mode));
            }}
          >
            <Tooltip text={item.mode} styles='!top-[100%]'>
              {item.icon(sideBarMode === item.mode)}
            </Tooltip>
          </li>
        ))}
      </ul>
      <div className="cursor-pointer">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <Cog6ToothIcon className="w-6 h-6 text-gray-500 hover:text-gray-800 " />
            </Menu.Button>
          </div>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 bottom-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className='rounded-xl'>
                <Menu.Item>
                  <button
                    className="text-red-500 rounded-xl font-medium flex w-full items-center px-2 py-2 text-sm hover:bg-red-500 hover:text-white"
                    onClick={logOut}
                  >
                    <ArrowLeftOnRectangleIcon className='w-6 h-6 mr-2' />
                    Log out
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div >
  );
}

export default LeftSideBar;
