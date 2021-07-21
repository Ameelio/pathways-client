import { Button, Card, Row, Space, Typography } from "antd";
import { differenceInMinutes, format, isToday, isTomorrow } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { BaseCall, Call } from "src/types/Call";
import { subMinutes } from "date-fns/esm";
import { WAITING_ROOM_BUFFER_MIN } from "src/constants";
import { getParticipantsFullNames } from "src/utils";
import ContactAvatarGroup from "../Avatar/UserAvatarGroup";
import { InPersonVisit } from "src/types/InPersonVisit";
import { UserAddOutlined, VideoCameraTwoTone } from "@ant-design/icons";

interface Props {
  visit: BaseCall | InPersonVisit;
  selectCall: (call: Call) => void;
  joinCall: (call: Call) => void;
}
const VisitItem: React.FC<Props> = ({ visit, selectCall, joinCall }: Props) => {
  const { t } = useTranslation("dashboard");

  const duration = differenceInMinutes(
    new Date(visit.scheduledEnd),
    new Date(visit.scheduledStart)
  );

  const isCall = "videoHandler" in visit;

  const canJoin =
    isCall &&
    subMinutes(new Date(visit.scheduledStart), WAITING_ROOM_BUFFER_MIN) <
      new Date();

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMMM d");
  };

  const getIcon = () => {
    switch (visit.visitType.category) {
      case "call":
        return <VideoCameraTwoTone />;
      case "in_person_visit":
        return <UserAddOutlined color="#B13E37" />;
      default:
        return <VideoCameraTwoTone />;
    }
  };

  const getLabel = () => {
    switch (visit.visitType.name) {
      case "Video Call":
        return "Video Call";
      case "In Person With Contact":
        return "In Person, With Contact";
      case "In Person Without Contact":
        return "In Person, No Contact";
      default:
        return visit.visitType.name;
    }
  };

  return (
    <Card key={visit.id}>
      <Row justify="space-between" align="bottom">
        <Space direction="vertical">
          <Typography.Title level={5}>
            {getIcon()}
            {getLabel()}
          </Typography.Title>
          <Typography.Text>
            {format(new Date(visit.scheduledStart), "h:mm aaa")} •{" "}
            {`${duration} minutes`}
          </Typography.Text>
          <Space className="mt-4">
            <ContactAvatarGroup contacts={visit.userParticipants} />
            <Typography.Text type="secondary">
              {getParticipantsFullNames(visit)}
            </Typography.Text>
          </Space>
        </Space>
        <Space>
          {canJoin ? (
            <Button
              size="large"
              type="primary"
              className="rounded-sm"
              disabled={"videoHandler" in visit && !visit.videoHandler}
              onClick={() => {
                joinCall(visit);
              }}
            >
              {"videoHandler" in visit && visit.videoHandler
                ? t("call.join")
                : t("call.initializing")}
            </Button>
          ) : (
            <Button
              size="large"
              className="rounded-sm"
              onClick={() => selectCall(visit)}
            >
              {t("call.seeDetails")}
            </Button>
          )}
        </Space>
      </Row>
    </Card>
  );
};

export default VisitItem;
