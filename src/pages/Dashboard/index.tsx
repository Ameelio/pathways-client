import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { fetchCalls } from "src/redux/modules/call";
import { selectAllConnections, selectUpcomingCalls } from "src/redux/selectors";
import { push } from "connected-react-router";
import "src/i18n/config";
import Dashboard from "src/components/Dashboard";
import { FAQResource } from "src/types/UI";
import { openModal } from "src/redux/modules/modalsSlice";

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
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => await fetchCalls())();
  }, [fetchCalls]);

  return (
    <Dashboard
      calls={calls}
      connections={connections}
      openInfoModal={(resource: FAQResource) =>
        dispatch(openModal({ activeType: "RESOURCE_MODAL", entity: resource }))
      }
    />
  );
};

export default connector(DashboardPage);
