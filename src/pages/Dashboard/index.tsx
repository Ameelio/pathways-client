import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { fetchCalls } from "src/redux/modules/call";
import { selectAllContacts } from "src/redux/selectors";
import { push } from "connected-react-router";
import "src/i18n/config";
import Dashboard from "src/components/Dashboard";
import { openModal } from "src/redux/modules/modalsSlice";
import { useUpcomingCalls } from "src/hooks/useCalls";
import { Call } from "src/types/Call";
import { Quote } from "src/types/Common";

const mapDispatchToProps = { fetchCalls, push };

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const DashboardPage: React.FC<PropsFromRedux> = ({ fetchCalls }) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectAllContacts);
  const calls = useUpcomingCalls();

  useEffect(() => {
    (async () => await fetchCalls())();
  }, [fetchCalls]);

  return (
    <Dashboard
      calls={calls}
      contacts={contacts}
      joinCall={(call: Call) => {
        dispatch(
          openModal({ activeType: "KIOSK_CONFIRMATION_MODAL", entity: call })
        );
      }}
      seeAllCalls={() => dispatch(push("/calls"))}
      openBio={(quote: Quote) =>
        dispatch(openModal({ activeType: "BIO_MODAL", entity: quote }))
      }
    />
  );
};

export default connector(DashboardPage);
