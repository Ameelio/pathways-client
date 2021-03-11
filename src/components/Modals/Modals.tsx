import React from "react";
import { useAppSelector } from "src/redux";
import CancelCallModal from "./CancelCallModal";
import InformationalModal from "./InformationalModal";

const Modals: React.FC = () => {
  const type = useAppSelector((state) => state.modals.data.activeType);
  switch (type) {
    case "CANCEL_CALL_MODAL":
      return <CancelCallModal />;
    case "RESOURCE_MODAL":
      return <InformationalModal />;
    default:
      return null;
  }
};

export default Modals;
