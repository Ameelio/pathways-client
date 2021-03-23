import React from "react";
import { useAppDispatch, useAppSelector } from "src/redux";
import { closeModal } from "src/redux/modules/modalsSlice";
import CancelCallModal from "./CancelCallModal";
import InformationalModal from "./InformationalModal";
import TestConnectionModal from "./TestConnectionModal";

const Modals: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.modals.data);

  switch (data.activeType) {
    case "CANCEL_CALL_MODAL":
      return (
        <CancelCallModal
          closeModal={() => dispatch(closeModal())}
          data={data}
        />
      );
    case "RESOURCE_MODAL":
      return (
        <InformationalModal
          closeModal={() => dispatch(closeModal())}
          data={data}
        />
      );
    case "TEST_CONNECTION_MODAL":
      return (
        <TestConnectionModal
          closeModal={() => dispatch(closeModal())}
          data={data}
        />
      );
    default:
      return null;
  }
};

export default Modals;
