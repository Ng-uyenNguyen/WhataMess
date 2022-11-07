import { useEffect, useContext, useState, useLayoutEffect } from 'react';

import { ChevronLeftIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import avatar from "./../../assets/images/avatar.png";
import { collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import SearchBox from '../../components/Search';
import { db, storage } from '../../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext, globalUserId } from '../../context/AuthContext';
import { UserProfileModel } from '../../utils/models/user-profile.model';

const UserProfile = () => {
  //@ts-ignore
  const [status, setStatus] = useState(1);
  const [currentUser, setCurrentUser] = useState<UserProfileModel>();

  const handleUpdateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${currentUser?.email || '' + date}`);
      console.log(e.target.files[0]);
      await uploadBytesResumable(storageRef, e.target.files[0]).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "users", currentUser?.uid || ''), {
              avatar: downloadURL
            });
          } catch (err) {
            console.log(err);
          }
        });
      });
    }
  };

  useLayoutEffect(() => {
    const getUser = async () => {
      onSnapshot(doc(db, "users", globalUserId), (doc) => {
        doc.exists() && setCurrentUser(doc.data() as UserProfileModel);
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
        <div className="relative rounded-full">
          <img
            className="w-36 h-36 rounded-full object-cover"
            src={currentUser?.avatar || avatar}
            alt="Rounded avatar"
          />
          <div className="absolute bottom-0 right-0">
            <label htmlFor="file" className="cursor-pointer text-zinc-500 hover:text-zinc-700">
              <PencilSquareIcon className="w-5 h-5" />
            </label>
            <input required style={{ display: "none" }} type="file" id="file" onChange={handleUpdateAvatar} />
          </div>
        </div>
        <span className="mt-3 text-xl font-bold tracking-wide">
          {currentUser?.displayName}
        </span>
        <select className={"my-3 py-1 px-3 text-sm font-bold rounded-lg " + (status !== 0 ? 'bg-light-green text-green' : 'text-red-500 bg-red-100')} defaultValue={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setStatus(+e.target.value)
        }}>
          <option value="1" className="text-black bg-white">Available</option>
          <option value="0" className="text-black bg-white">Offline</option>
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