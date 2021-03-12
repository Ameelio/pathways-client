import { Button, Card, Space, Spin, Typography } from "antd";
import { differenceInMinutes, format } from "date-fns";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Call } from "src/types/Call";
import { Icebreaker } from "src/types/Common";
import { Language } from "src/types/Session";
import { FAQResource } from "src/types/UI";
import { QUESTIONS } from "src/utils/constants";
import { getRandomItem } from "src/utils/utils";

interface Props {
  title: string;
  call: Call;
  navigateBack: () => void;
  openInfoModal: (resource: FAQResource) => void;
}

const getTranslatedDailyQuestion = (
  language: Language,
  question: Icebreaker
): string => {
  switch (language) {
    case "en":
      return question.en;
    case "es":
      return question.es;
    default:
      return question.en;
  }
};

export const WaitingRoomCard = ({
  title,
  call,
  navigateBack,
  openInfoModal,
}: Props) => {
  const { t, i18n } = useTranslation("call");
  const [icebreaker] = useState(getRandomItem(QUESTIONS) as Icebreaker);

  return (
    <Card className="bg-black	bg-opacity-80 text-white w-6/12	 h-6/12 m-auto">
      <Space direction="vertical" className="text-white" size="large">
        <Space>
          <Typography.Text strong className="text-white text-xl	">
            {title}
          </Typography.Text>
          <Spin />
        </Space>

        <Typography.Text className="text-white">
          {format(new Date(call.start), "HH:mm")} •{" "}
          {differenceInMinutes(new Date(call.end), new Date(call.start))}mins
        </Typography.Text>
        <Typography.Text className="text-white">
          {t("waitingRoom.questionOfDay")}:{" "}
          {getTranslatedDailyQuestion(i18n.language as Language, icebreaker)}
        </Typography.Text>
        <Typography.Link
          onClick={() =>
            openInfoModal({
              title: t("waitingRoom.whenWillCallConnect"),
              body: "Soon.",
            })
          }
        >
          {t("waitingRoom.whenWillCallConnect")}
        </Typography.Link>
        <Space>
          <Button type="primary">{t("waitingRoom.checkConnection")}</Button>
          <Button onClick={navigateBack}>
            {t("waitingRoom.leaveWaitingRoom")}
          </Button>
        </Space>
      </Space>
    </Card>
  );
};
