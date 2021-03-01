import React, { useEffect } from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { fetchCalls } from "src/redux/modules/call";
import { selectAllConnections, selectUpcomingCalls } from "src/redux/selectors";
import { push } from "connected-react-router";
import "src/i18n/config";
import Dashboard from "src/components/Dashboard";

const mapStateToProps = (state: RootState) => ({
  calls: selectUpcomingCalls(state),
  connections: selectAllConnections(state),
  firstName: state.session.user.firstName,
});

const mapDispatchToProps = { fetchCalls, push };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const DashboardPage: React.FC<PropsFromRedux> = ({
  calls,
  connections,
  fetchCalls,
}) => {
  useEffect(() => {
    (async () => await fetchCalls())();
  }, [fetchCalls]);

  return <Dashboard calls={calls} connections={connections} />;
};

export default connector(DashboardPage);
