import { Button, Card, Row, Space, Typography } from "antd";
import { differenceInMinutes, format, isToday, isTomorrow } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { Call } from "src/types/Call";
import { FAQResource } from "src/types/UI";
import EnterCallSound from "src/assets/Sounds/EnterCall.wav";
import useSound from "use-sound";
import { subMinutes } from "date-fns/esm";
import { WAITING_ROOM_BUFFER_MIN } from "src/utils/constants";
import { getParticipantsFullNames } from "src/utils";

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

  const [play] = useSound(EnterCallSound);

  const duration = differenceInMinutes(
    new Date(call.scheduledEnd),
    new Date(call.scheduledStart)
  );

  const started =
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
          <Space style={{ paddingTop: 18 }}>
            <Typography.Text type="secondary">
              {getParticipantsFullNames(call)}
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
                play();
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
