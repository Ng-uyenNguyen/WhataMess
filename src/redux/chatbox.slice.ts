import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfileModel } from "../utils/models/user-profile.model";
import { getUserProfileByUid } from "../services/api.service";
interface ChatState {
  chatId: string;
  currentChattingUser: UserProfileModel | null;
}

const initialState: ChatState = {
  chatId: "",
  currentChattingUser: null,
};
export const updateCurrentChattingUser = createAsyncThunk("chatbox/updateCurrentChattingUser", async (uid: string) => {
  const userProfile = await getUserProfileByUid(uid);
  return userProfile;
});

const chatSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateCurrentChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateCurrentChattingUser.fulfilled, (state, { payload }) => {
      state.currentChattingUser = payload ? { ...payload } : null;
    });
    builder.addCase(updateCurrentChattingUser.rejected, (state, { error }) => {
      console.log(error);
    });
  },
});

export const { updateCurrentChatId } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
