import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileModel } from "../utils/models/user-profile.model";
interface ChatState {
  chatId: string;
  currentChattingUser: UserProfileModel | null;
}

const initialState: ChatState = {
  chatId: "",
  currentChattingUser: null,
};

const chatSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateCurrentChat: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    updateCurrentChattingUser: (
      state,
      action: PayloadAction<UserProfileModel>
    ) => {
      state.currentChattingUser = action.payload;
    },
  },
});

export const { updateCurrentChat, updateCurrentChattingUser } =
  chatSlice.actions;

export const chatReducer = chatSlice.reducer;
