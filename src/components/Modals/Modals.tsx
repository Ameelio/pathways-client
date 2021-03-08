import React from "react";
import modalConfirms from "src/constants/modalConfirms";
import { useAppSelector } from "src/redux";
import CancelCallModal from "./CancelCallModal";
import ResourcesModal from "./ResourcesModal";

const Modals: React.FC = () => {
  const modalId = useAppSelector((state) => state.modals.modalId);
  switch (modalId) {
    case modalConfirms.CANCEL_CALL_MODAL:
      return <CancelCallModal />;
    case modalConfirms.RESOURCES_MODAL:
      return <ResourcesModal />;
    default:
      return null;
  }
};

export default Modals;
