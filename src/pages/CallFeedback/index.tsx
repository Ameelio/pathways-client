import React, { useEffect, useState } from "react";
import { Button } from "antd";
import {
  enterFullScreen,
  exitFullScreen,
} from "src/components/Common/commonSlice";
import { useAppDispatch } from "src/redux";
import { RouteComponentProps } from "react-router";
import { useCallById } from "src/hooks/useCalls";
import { push } from "connected-react-router";
import CallFeedback from "src/components/CallFeedback";
import { fetchAuthenticated } from "src/api/Common";
import { differenceInMinutes } from "date-fns/esm";
import { CallFeedbackType } from "src/components/CallFeedback/CallFeedback";
import Error from "src/components/Error";
import { useTranslation } from "react-i18next";
import Loader from "src/components/Loader";
import { logout } from "src/redux/modules/session";
import { addMinutes } from "date-fns";

// const customIcons = {
//   1: <FrownOutlined style={{ fontSize: 36 }} />,
//   2: <FrownOutlined style={{ fontSize: 36 }} />,
//   3: <MehOutlined style={{ fontSize: 36 }} />,
//   4: <SmileOutlined style={{ fontSize: 36 }} />,
//   5: <SmileOutlined style={{ fontSize: 36 }} />,
// };

async function rateCall(callId: number, rating: number): Promise<void> {
  await fetchAuthenticated(`calls/${callId}`, {
    method: "PATCH",
    body: JSON.stringify({
      rating,
    }),
  });
}

type TParams = { id: string };

const CallFeedbackPage: React.FC<RouteComponentProps<TParams>> = ({
  match,
}) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation("error");

  const call = useCallById(parseInt(match.params.id));

  const [exitType, setExitType] = useState<CallFeedbackType>();

  useEffect(() => {
    if (!call) return;

    const diffMin = differenceInMinutes(
      new Date(call.scheduledEnd),
      new Date()
    );

    if (call.status === "terminated") {
      setExitType("terminated");
    } else if (diffMin >= 5) {
      setExitType("unhappy");
    } else if (diffMin <= 0) {
      setExitType("forced");
    } else {
      setExitType("deliberate");
    }
  }, [call]);

  useEffect(() => {
    dispatch(enterFullScreen());

    return () => {
      dispatch(exitFullScreen());
    };
  }, [dispatch]);

  if (!call || !exitType) {
    return <Loader />;
  }

  if (
    call.status === "pending_approval" ||
    call.status === "cancelled" ||
    call.status === "no_show"
  )
    return (
      <Error
        status="error"
        title={t("call.callNull")}
        extra={[
          <Button
            type="primary"
            size="large"
            onClick={() => dispatch(push("/"))}
          >
            {t("call.returnHome")}
          </Button>,
        ]}
      />
    );

  if (addMinutes(new Date(call.scheduledEnd), 15) < new Date())
    return (
      <Error
        status="error"
        title={t("call.callNull")}
        extra={[
          <Button
            type="primary"
            size="large"
            onClick={() => dispatch(push("/"))}
          >
            {t("call.returnHome")}
          </Button>,
        ]}
      />
    );

  return (
    <CallFeedback
      call={call}
      navigate={(path: string) => dispatch(push(path))}
      rateCall={async (rating: number) => await rateCall(call.id, rating)}
      type={exitType}
      logout={() => dispatch(logout())}
    />
  );
};

export default CallFeedbackPage;
