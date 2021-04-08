import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { fetchCalls } from "src/redux/modules/call";
import { selectAllContacts } from "src/redux/selectors";
import { push } from "connected-react-router";
import "src/i18n/config";
import Dashboard from "src/components/Dashboard";
import { FAQResource } from "src/types/UI";
import { openModal } from "src/redux/modules/modalsSlice";
import { useCalls } from "src/hooks/useCalls";

const mapDispatchToProps = { fetchCalls, push };

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const DashboardPage: React.FC<PropsFromRedux> = ({ fetchCalls }) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectAllContacts);
  const calls = useCalls();

  useEffect(() => {
    (async () => await fetchCalls())();
  }, [fetchCalls]);

  return (
    <Dashboard
      calls={calls}
      contacts={contacts}
      openInfoModal={(resource: FAQResource) =>
        dispatch(openModal({ activeType: "RESOURCE_MODAL", entity: resource }))
      }
    />
  );
};

export default connector(DashboardPage);
