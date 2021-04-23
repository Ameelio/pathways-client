import React from "react";
import { useAppSelector } from "src/redux";
import "src/i18n/config";
import Calls from "src/components/Calls";
import { useUpcomingCalls } from "src/hooks/useCalls";

const CallsPage: React.FC = () => {
  const user = useAppSelector((state) => state.session.user);
  const calls = useUpcomingCalls();

  return <Calls calls={calls} user={user} />;
};

export default CallsPage;
