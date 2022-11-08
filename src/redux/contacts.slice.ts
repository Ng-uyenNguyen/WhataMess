import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNewUserContactListByEmail } from "../services/api.service";
import { Conversation } from "../utils/models/conversation.model";

interface ContactState {
  searchText: string;
  userList: Conversation[];
}

const initialState: ContactState = {
  searchText: "",
  userList: [],
};

// Asynchronous Tasks
export const searchUserByEmail = createAsyncThunk("contact/searchUserByName", async (email: string) => {
  const searchResult = await getNewUserContactListByEmail(email);
  return searchResult;
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
    builder.addCase(searchUserByEmail.fulfilled, (state, { payload }) => {
      state.userList = payload ? [...payload] : [];
    });
    builder.addCase(searchUserByEmail.rejected, (state, { error }) => {
      console.log(error);
    });
  },
});

export const { changeSearchText } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
