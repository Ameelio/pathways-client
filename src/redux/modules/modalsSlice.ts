import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CancelCallModalData,
  InactiveModalData,
  ResourceModalData,
  TestConnectionModalData,
  KioskConfirmationModalData,
} from "src/types/UI";

type ModalEntity =
  | CancelCallModalData
  | ResourceModalData
  | TestConnectionModalData
  | InactiveModalData
  | KioskConfirmationModalData;

// type ModalsSliceState =  {activeType: ModalType | null, entity: Call |{ title: string; body: string } | null };
type ModalsSliceState = { data: ModalEntity };

const initialState: ModalsSliceState = {
  data: { activeType: "INACTIVE_MODAL", entity: null },
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalEntity>) => {
      state.data = action.payload;
    },
    closeModal: (state) => {
      state.data = { activeType: "INACTIVE_MODAL", entity: null };
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
