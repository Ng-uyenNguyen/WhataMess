import { useEffect } from 'react';

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import avatar from "./../../assets/images/real-avatar.jpg";
import { collection, getDocs } from "firebase/firestore";
import SearchBox from '../../components/Search';
import { db } from '../../firebase/firebase';

const UserProfile = () => {
  useEffect(() => {
    const getUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
      });
    }
    getUser();
  }, [])

  return (
    <div>
      <div className="h-[5vh] box-content py-4 flex items-center mb-5 border-b border-b-gray-300">
        <div className="bg-slate-200 px-4 py-4 rounded-2xl">
          <ChevronLeftIcon className="w-3 h-3 text-zinc-600" />
        </div>
        <span className="ml-3 text-2xl font-medium">Chatting</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img
          className="w-36 h-36 rounded-full object-cover"
          src={avatar}
          alt="Rounded avatar"
        />
        <span className="mt-3 text-xl font-bold tracking-wide">
          Celline Moreno
        </span>
        <select className="my-3 py-1 px-3 bg-light-green text-green text-sm font-bold rounded-lg">
          <option value="1" className="text-green">Available</option>
          <option value="0" className="text-red-500">Offline</option>
        </select>
        {/* <div className="relative my-3 w-[90%]">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="default-search" className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-light-green" placeholder="Search..." />
        </div> */}
        <SearchBox />
      </div>
    </div>
  );
}

export default UserProfile;