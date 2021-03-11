import React from "react";
import { useAppSelector } from "src/redux";
import CancelCallModal from "./CancelCallModal";
import ResourcesModal from "./ResourcesModal";

const Modals: React.FC = () => {
  const type = useAppSelector((state) => state.modals.data.activeType);
  switch (type) {
    case "CANCEL_CALL_MODAL":
      return <CancelCallModal />;
    case "RESOURCE_MODAL":
      return <ResourcesModal />;
    default:
      return null;
  }
};

export default Modals;
