import { createSlice } from "@reduxjs/toolkit";
import modalConfirms from "src/constants/modalConfirms";
import { Call } from "src/types/Call";

interface ModalsSliceState {
  modalId: string;
  cancelCall: Call | null;
}

// First approach: define the initial state using that type
const initialState: ModalsSliceState = { modalId: "", cancelCall: null };

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalId = action.payload;
    },
    closeModal: (state) => {
      state.modalId = "";
    },
    openCancelCallModal: (state, action) => {
      state.cancelCall = action.payload;
      state.modalId = modalConfirms.CANCEL_CALL_MODAL;
    },
  },
});

export const {
  openModal,
  closeModal,
  openCancelCallModal,
} = modalsSlice.actions;
