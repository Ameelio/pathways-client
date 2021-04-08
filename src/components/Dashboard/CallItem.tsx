import { Avatar, Button, Card, Row, Space, Typography } from "antd";
import { differenceInMinutes, format, isToday, isTomorrow } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { Call } from "src/types/Call";
import { FAQResource } from "src/types/UI";
import { genFullName } from "src/utils/utils";

interface Props {
  call: Call;
  selectCall: (call: Call) => void;
  navigate: (path: string) => void;
  openPrivacyNotice: (resource: FAQResource) => void;
}
const CallItem: React.FC<Props> = ({
  call,
  selectCall,
  navigate,
  openPrivacyNotice,
}: Props) => {
  const { t } = useTranslation("dashboard");

  const duration = differenceInMinutes(
    new Date(call.scheduledEnd),
    new Date(call.scheduledStart)
  );

  const started = new Date(call.scheduledStart) < new Date();

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
          <Space style={{ paddingTop: 18 }}>
            <Avatar src={call.userParticipants[0].profileImagePath} />
            <Typography.Text type="secondary">
              {genFullName(call.userParticipants[0])}
            </Typography.Text>
          </Space>
        </Space>
        <Space>
          {started ? (
            <Button
              size="large"
              type="primary"
              className="rounded-sm"
              disabled={!call.videoHandler}
              onClick={() => {
                navigate(`call/${call.id}`);
                openPrivacyNotice({
                  title: t("privacyNotice.title"),
                  body: t("privacyNotice.body"),
                  okBtnText: t("privacyNotice.okText"),
                });
              }}
            >
              {t("call.join")}
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
