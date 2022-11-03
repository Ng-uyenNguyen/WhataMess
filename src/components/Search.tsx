import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../firebase/firebase';
import { searchUserByName } from '../redux/search.slice';
import { AppDispatch } from '../store';


const PropTypes = {


}
function SearchBox({ }) {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch<AppDispatch>();


  // useEffect(() => {


  //   return () => {
  //     const unsub = onSnapshot(doc(db, "users"), (doc) => {
  //       console.log("Current data: ", doc.data());
  //     });
  //     unsub();
  //   }
  // }, [])

  const onSearchChange = async (e: any) => {
    setSearchText(e.target.value);
  }

  const handleSearch = () => {
    dispatch(searchUserByName(searchText));
  }
  return (
    <div className="relative my-3 w-[90%] self-center">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <input
        value={searchText}
        type="search"
        id="default-search"
        onKeyDown={(e) => {
          e.code === "Enter" && handleSearch()
        }}
        className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-light-green"
        placeholder="Search..."
        onChange={(e) => onSearchChange(e)} />
    </div>
  );
}

export default SearchBox;