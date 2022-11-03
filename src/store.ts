import { configureStore } from "@reduxjs/toolkit";
import { sidebarReducer } from "./redux/sidebar.slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
