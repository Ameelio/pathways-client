import React from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { selectAllCalls, selectUpcomingCalls } from "src/redux/selectors";
import "src/i18n/config";
import Calls from "src/components/Calls";

const mapStateToProps = (state: RootState) => ({
  user: state.session.user,
  calls: selectAllCalls(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const CallsPage: React.FC<PropsFromRedux> = ({ user, calls }) => {
  return <Calls calls={calls} user={user} />;
};

export default connector(CallsPage);
