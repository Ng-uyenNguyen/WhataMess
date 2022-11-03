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
export const searchUserByName = createAsyncThunk(
  "search/searchUserByName",
  async (userName: string) => {
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", userName),
      where("displayName", "<=", userName + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    } catch (err) {
      console.log(err);
    }
  }
);

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
      console.log(payload);
    });
    builder.addCase(searchUserByName.rejected, (state, { payload }) => {
      console.log("error happens");
    });
  },
});

export const { changeSearchText } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
