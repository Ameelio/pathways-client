import React from "react";
import { fetchAuthenticated } from "src/api/Common";
import { useAppDispatch, useAppSelector } from "src/redux";
import { closeModal } from "src/redux/modules/modalsSlice";
import CallRatingModal from "./CallRatingModal";
import CancelCallModal from "./CancelCallModal";
import InformationalModal from "./InformationalModal";
import TestConnectionModal from "./TestConnectionModal";

function rateCall(callId: number, rating: number): void {
  fetchAuthenticated(`calls/${callId}`, {
    method: "PATCH",
    body: JSON.stringify({
      rating,
    }),
  });
}

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
    case "CALL_RATING_MODAL":
      return (
        <CallRatingModal
          closeModal={() => dispatch(closeModal())}
          data={data}
          rateCall={(rating: number) => rateCall(data.entity.id, rating)}
        />
      );
    default:
      return null;
  }
};

export default Modals;
