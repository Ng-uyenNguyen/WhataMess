import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SideBarModes } from "../utils/enums/sidebar.enum";

interface SidebarState {
  currentMode: SideBarModes;
}

const initialState: SidebarState = {
  currentMode: SideBarModes.RECENT,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<SideBarModes>) => {
      state.currentMode = action.payload;
    },
  },
});

export const { changeMode } = sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;
