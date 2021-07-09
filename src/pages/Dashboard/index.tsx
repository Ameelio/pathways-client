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
import { fetchInPersonVisits } from "src/redux/modules/inPersonVisit";
import { useUpcomingInPersonVisits } from "src/hooks/useInPersonVisits";

const mapDispatchToProps = { fetchCalls, fetchInPersonVisits, push };

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const DashboardPage: React.FC<PropsFromRedux> = ({
  fetchCalls,
  fetchInPersonVisits,
}) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectAllContacts);
  const calls = useUpcomingCalls();
  const inPersonVisits = useUpcomingInPersonVisits();

  useEffect(() => {
    (async () => {
      await fetchCalls();
      await fetchInPersonVisits();
    })();
  }, [fetchCalls, fetchInPersonVisits]);

  return (
    <Dashboard
      calls={calls}
      inPersonVisits={inPersonVisits}
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
