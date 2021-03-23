import { Card, Typography } from "antd";
import { push } from "connected-react-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/redux";
import { Call } from "src/types/Call";
import { FAQResource } from "src/types/UI";
import CallItem from "./CallItem";

interface Props {
  calls: Call[];
  selectCall: (call: Call) => void;
  openInfoModal: (resource: FAQResource) => void;
}

const CallsList: React.FC<Props> = ({
  calls,
  selectCall,
  openInfoModal,
}: Props) => {
  const { t } = useTranslation("dashboard");
  const dispatch = useAppDispatch();

  return (
    <Card
      title={t("call.title")}
      extra={
        <Typography.Link onClick={() => dispatch(push("/"))}>
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
          navigate={(path) => dispatch(push(path))}
          openPrivacyNotice={openInfoModal}
          key={`callItem-${call.id}`}
        />
      ))}
    </Card>
  );
};

export default CallsList;
