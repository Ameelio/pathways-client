import React from "react";
import { connect, ConnectedProps } from "react-redux";
import modalConfirms from "src/constants/modalConfirms";
import { RootState } from "src/redux";
import CancelCallModal from "./CancelCallModal";

const mapStateToProps = (state: RootState) => ({
  modalId: state.modals.modalId,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Modals: React.FC<PropsFromRedux> = ({ modalId }) => {
  switch (modalId) {
    case modalConfirms.CANCEL_CALL_MODAL:
      return <CancelCallModal />;
    default:
      return null;
  }
};

export default connector(Modals);
