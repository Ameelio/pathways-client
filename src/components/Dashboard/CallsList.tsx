import { Card, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Call } from "src/types/Call";
import CallItem from "./CallItem";

interface Props {
  calls: Call[];
  selectCall: (call: Call) => void;
  joinCall: (call: Call) => void;
  seeAllCalls: () => void;
}

const CallsList: React.FC<Props> = ({
  calls,
  selectCall,
  joinCall,
  seeAllCalls,
}: Props) => {
  const { t } = useTranslation("dashboard");

  return (
    <Card
      title={t("call.title")}
      extra={
        <Typography.Link onClick={seeAllCalls}>
          {t("call.seeAll")}
        </Typography.Link>
      }
      className="rounded-md"
    >
      <div className="pb-5">
        <Typography.Text>
          {!calls.length
            ? t("call.noCalls")
            : `${calls.length} ${t("call.upcomingCalls")}${
                calls.length > 1 ? "s" : ""
              }`}
        </Typography.Text>
      </div>
      {calls.map((call) => (
        <CallItem
          call={call}
          selectCall={selectCall}
          joinCall={joinCall}
          key={`callItem-${call.id}`}
        />
      ))}
    </Card>
  );
};

export default CallsList;
