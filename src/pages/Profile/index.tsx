import React from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { fetchCalls } from "src/redux/modules/call";
import { selectAllCalls } from "src/redux/selectors";
import { push } from "connected-react-router";
import "src/i18n/config";
import Profile from "src/components/Profile";

const mapStateToProps = (state: RootState) => ({
  user: state.session.user,
  calls: selectAllCalls(state),
});

const mapDispatchToProps = { fetchCalls, push };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ProfilePage: React.FC<PropsFromRedux> = ({ user, calls }) => {
  return <Profile calls={calls} user={user} />;
};

export default connector(ProfilePage);
