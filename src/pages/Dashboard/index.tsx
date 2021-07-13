import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/redux";
import { fetchCalls } from "src/redux/modules/call";
import { selectAllContacts } from "src/redux/selectors";
import { push } from "connected-react-router";
import "src/i18n/config";
import Dashboard from "src/components/Dashboard";
import { openModal } from "src/redux/modules/modalsSlice";
import { useUpcomingCalls } from "src/hooks/useCalls";
import { Call } from "src/types/Call";
import { Quote } from "src/types/Common";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectAllContacts);
  const calls = useUpcomingCalls();

  useEffect(() => {
    dispatch(fetchCalls());

    const interval = setInterval(() => {
      dispatch(fetchCalls());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

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

export default DashboardPage;
