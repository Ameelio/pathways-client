import React from "react";
import { useAppDispatch, useAppSelector } from "src/redux";
import { closeModal } from "src/redux/modules/modalsSlice";
import KioskConfirmationModal from "./KioskConfirmationModal";
import CancelCallModal from "./CancelCallModal";
import InformationalModal from "./InformationalModal";
import TestConnectionModal from "./TestConnectionModal";
import { push } from "connected-react-router";
import { logout } from "src/redux/modules/session";
import EnterCallSound from "src/assets/Sounds/EnterCall.wav";
import useSound from "use-sound";
import { cancelCall } from "src/redux/modules/call";

const Modals: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.modals.data);
  const [playEnterSound] = useSound(EnterCallSound);

  switch (data.activeType) {
    case "CANCEL_CALL_MODAL":
      return (
        <CancelCallModal
          closeModal={() => dispatch(closeModal())}
          data={data}
          cancelCall={(id: number, reason: string) =>
            dispatch(cancelCall({ id, reason }))
          }
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
    case "KIOSK_CONFIRMATION_MODAL":
      return (
        <KioskConfirmationModal
          data={data}
          handleConfirm={() => {
            dispatch(closeModal());
            playEnterSound();
            dispatch(push(`/call/${data.entity.id}`));
          }}
          handleLogout={() => {
            dispatch(closeModal());
            dispatch(logout());
          }}
        />
      );
    default:
      return null;
  }
};

export default Modals;
