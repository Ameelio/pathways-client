import React, { ReactElement } from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  session: state.session,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function DashboardPage({}: PropsFromRedux): ReactElement {
  return <div></div>;
}

export default connector(DashboardPage);
