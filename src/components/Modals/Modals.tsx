import React from "react";
import modalConfirms from "src/constants/modalConfirms";
import { useAppSelector } from "src/redux";
import CancelCallModal from "./CancelCallModal";

const Modals: React.FC = () => {
  const modalId = useAppSelector((state) => state.modals.modalId);
  switch (modalId) {
    case modalConfirms.CANCEL_CALL_MODAL:
      return <CancelCallModal />;
    default:
      return null;
  }
};

export default Modals;
