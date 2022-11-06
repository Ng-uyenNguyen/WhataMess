import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Conversation } from "../utils/models/conversation.model";

interface SearchState {
  searchText: string;
  userList: Conversation[];
}

const initialState: SearchState = {
  searchText: "",
  userList: [],
};

// Asynchronous Search
export const searchUserByName = createAsyncThunk("search/searchUserByName", async (userName: string) => {
  const q = query(collection(db, "users"), where("displayName", ">=", userName), where("displayName", "<=", userName + "\uf8ff"));

  try {
    const userList: Conversation[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const user: Conversation = {
        userInfo: {
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          avatar: doc.data().avatar,
        },
      };
      userList.push(user);
    });

    return userList;
  } catch (err) {
    throw new Error("" + err);
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(searchUserByName.fulfilled, (state, { payload }) => {
      state.userList = payload ? [...payload] : [];
    });
    builder.addCase(searchUserByName.rejected, (state, { error }) => {
      console.log(error);
    });
  },
});

export const { changeSearchText } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
