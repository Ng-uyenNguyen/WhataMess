import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./redux/chatbox.slice";
import { searchReducer } from "./redux/contacts.slice";
import { sidebarReducer } from "./redux/sidebar.slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    search: searchReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
