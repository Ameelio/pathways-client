import React from "react";
import { useAppDispatch, useAppSelector } from "src/redux";
import { closeModal } from "src/redux/modules/modalsSlice";
import KioskConfirmationModal from "./KioskConfirmationModal";
import CancelCallModal from "./CancelCallModal";
import InformationalModal from "./InformationalModal";
import TestConnectionModal from "./TestConnectionModal";
import { push } from "connected-react-router";
import EnterCallSound from "src/assets/Sounds/EnterCall.wav";
import useSound from "use-sound";
import { cancelCall } from "src/redux/modules/call";
import BiographyModal from "./BiographyModal";
import ProfilePhotoModal from "./ProfilePhotoModal";
import { updateProfile } from "src/api/User";

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
          cancelCall={(id: string, reason: string) =>
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
          closeModal={() => {
            dispatch(closeModal());
          }}
        />
      );
    case "BIO_MODAL":
      return (
        <BiographyModal data={data} closeModal={() => dispatch(closeModal())} />
      );
    case "PROFILE_PHOTO_MODAL":
      return (
        <ProfilePhotoModal
          data={data}
          closeModal={() => dispatch(closeModal())}
          saveProfile={async (imagePath: string) => {
            await updateProfile(imagePath);
            dispatch(closeModal());
          }}
        />
      );
    default:
      return null;
  }
};

export default Modals;
