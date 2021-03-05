import { Avatar, Button, Card, Row, Space, Typography } from "antd";
import { differenceInMinutes, format, isToday, isTomorrow } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { Call } from "src/types/Call";
import { genFullName } from "src/utils/utils";

interface Props {
  call: Call;
  selectCall: (call: Call) => void;
  navigate: (path: string) => void;
}
const CallItem: React.FC<Props> = ({ call, selectCall, navigate }: Props) => {
  const { t } = useTranslation("dashboard");

  const duration = differenceInMinutes(
    new Date(call.end),
    new Date(call.start)
  );

  const started = new Date(call.start) < new Date();

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
            {getDateLabel(new Date(call.start))}
          </Typography.Title>
          <Typography.Text>
            {format(new Date(call.start), "h:mm aaa")} • {`${duration} minutes`}
          </Typography.Text>
          <Space style={{ paddingTop: 18 }}>
            <Avatar src={call.connection.user.profileImgPath} />
            <Typography.Text type="secondary">
              {genFullName(call.connection.user)}
            </Typography.Text>
          </Space>
        </Space>
        <Space>
          {started ? (
            <Button
              size="large"
              type="primary"
              className="rounded-sm"
              onClick={() => navigate(`call/${call.id}`)}
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
