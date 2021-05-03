import { Button, Card, Row, Space, Typography } from "antd";
import { differenceInMinutes, format, isToday, isTomorrow } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { Call } from "src/types/Call";
import { subMinutes } from "date-fns/esm";
import { WAITING_ROOM_BUFFER_MIN } from "src/constants";
import { getParticipantsFullNames } from "src/utils";
import ContactAvatarGroup from "../Avatar/UserAvatarGroup";

interface Props {
  call: Call;
  selectCall: (call: Call) => void;
  joinCall: (call: Call) => void;
}
const CallItem: React.FC<Props> = ({ call, selectCall, joinCall }: Props) => {
  const { t } = useTranslation("dashboard");

  const duration = differenceInMinutes(
    new Date(call.scheduledEnd),
    new Date(call.scheduledStart)
  );

  const canJoin =
    subMinutes(new Date(call.scheduledStart), WAITING_ROOM_BUFFER_MIN) <
    new Date();

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMMM d");
  };

  return (
    <Card key={call.id}>
      <Row justify="space-between" align="bottom">
        <Space direction="vertical">
          <Typography.Title level={5}>
            {getDateLabel(new Date(call.scheduledStart))}
          </Typography.Title>
          <Typography.Text>
            {format(new Date(call.scheduledStart), "h:mm aaa")} •{" "}
            {`${duration} minutes`}
          </Typography.Text>
          <Space className="mt-4">
            <ContactAvatarGroup contacts={call.userParticipants} />
            <Typography.Text type="secondary">
              {getParticipantsFullNames(call)}
            </Typography.Text>
          </Space>
        </Space>
        <Space>
          {canJoin ? (
            <Button
              size="large"
              type="primary"
              className="rounded-sm"
              disabled={!call.videoHandler}
              onClick={() => {
                joinCall(call);
              }}
            >
              {call.videoHandler ? t("call.join") : t("call.initializing")}
            </Button>
          ) : (
            <Button
              size="large"
              className="rounded-sm"
              onClick={() => selectCall(call)}
            >
              {t("call.seeDetails")}
            </Button>
          )}
        </Space>
      </Row>
    </Card>
  );
};

export default CallItem;
