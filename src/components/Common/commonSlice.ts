import { createSlice } from "@reduxjs/toolkit";

interface CommonSliceState {
  fullScreen: boolean;
}

const initialState: CommonSliceState = { fullScreen: false };

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    enterFullScreen: (state) => {
      state.fullScreen = true;
    },
    exitFullScreen: (state) => {
      state.fullScreen = false;
    },
  },
});

export const { enterFullScreen, exitFullScreen } = commonSlice.actions;
