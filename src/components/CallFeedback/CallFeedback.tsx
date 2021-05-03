import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Layout, Rate, Button, Space, Typography, Card } from "antd";
import { Call } from "src/types/Call";
import { getLottieOptions } from "src/utils/UI";
import Lottie from "react-lottie";
import GoodbyeLottie from "src/assets/Lottie/Goodbye.json";
import TeamWaveLottie from "src/assets/Lottie/TeamWave.json";
import CyclingLottie from "src/assets/Lottie/GirlCycling.json";
import ShrugLottie from "src/assets/Lottie/Shrug.json";
import RocketLottie from "src/assets/Lottie/Rocket.json";
import { getRandomItem } from "src/utils";

export type CallFeedbackType =
  | "forced"
  | "deliberate"
  | "unhappy"
  | "terminated";

interface Props {
  call: Call;
  navigate: (path: string) => void;
  rateCall: (rating: number) => void;
  type: CallFeedbackType;
  logout: () => void;
}

const CallFeedback: React.FC<Props> = ({
  call,
  navigate,
  rateCall,
  type,
  logout,
}) => {
  const { t } = useTranslation(["feedback", "common"]);

  const [rating, setRating] = useState<number>();

  const desc = [
    t("feedback:ratings.terrible"),
    t("feedback:ratings.bad"),
    t("feedback:ratings.normal"),
    t("feedback:ratings.good"),
    t("feedback:ratings.wonderful"),
  ];

  const renderTitle = () => {
    switch (type) {
      case "terminated":
        return t("feedback:title.happy");
      case "deliberate":
      case "forced":
        return t("feedback:title.happy");
      case "unhappy":
        return t("feedback:title.unhappy");
      default:
        return t("feedback:title.unhappy");
    }
  };

  const renderBodyText = () => {
    switch (type) {
      case "unhappy":
        return t("feedback:body.unhappy");
      case "deliberate":
        return t("feedback:body.happy");
      case "forced":
      case "terminated":
        return "";
    }
  };

  const pickIllustration = () => {
    switch (type) {
      case "deliberate":
      case "forced":
        return getRandomItem([TeamWaveLottie, CyclingLottie, GoodbyeLottie]);
      case "unhappy":
        return ShrugLottie;
      case "terminated":
        return RocketLottie;
      default:
        return GoodbyeLottie;
    }
  };

  const renderButtons = () => {
    switch (type) {
      case "deliberate":
      case "forced":
        return (
          <Space>
            <Button
              size="large"
              disabled={!!rating}
              onClick={() => {
                if (!rating) return;
                logout();
              }}
            >
              {t("common:logout")}
            </Button>

            <Button
              type="primary"
              size="large"
              disabled={!!rating}
              onClick={() => {
                if (!rating) return;
                rateCall(rating);
                navigate(`/`);
              }}
            >
              {t("feedback:buttons.return")}
            </Button>
          </Space>
        );
      case "unhappy":
        return (
          <Space direction="vertical" size="large" align="center">
            {/* TODO: add report functionality */}
            <Button type="link">{t("feedback:buttons.report")}</Button>
            <Space>
              <Button size="large" onClick={() => navigate(`/call/${call.id}`)}>
                {t("feedback:buttons.rejoin")}
              </Button>
              <Button type="primary" size="large" onClick={() => navigate(`/`)}>
                {t("feedback:buttons.return")}
              </Button>
            </Space>
          </Space>
        );
      default:
        return (
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(`/`)}
            block
          >
            {t("feedback:buttons.return")}
          </Button>
        );
    }
  };

  const renderRatings = () => {
    switch (type) {
      case "forced":
      case "deliberate":
      case "unhappy":
        return (
          <Card title="How was the audio and video?">
            <Rate
              value={rating}
              onChange={(val: number) => setRating(val)}
              tooltips={desc}
              style={{ fontSize: 36 }}
            />
          </Card>
        );
      default:
        return <div />;
    }
  };

  return (
    <Layout.Content className="flex w-screen h-screen bg-white">
      <Space
        direction="vertical"
        align="center"
        style={{ margin: "auto" }}
        className="w-50"
        size="large"
      >
        <Lottie
          options={getLottieOptions(pickIllustration())}
          height="50%"
          width="50%"
        />
        <Typography.Title level={2}>{renderTitle()}</Typography.Title>
        <Typography.Text type="secondary">{renderBodyText()}</Typography.Text>
        {renderRatings()}
        {renderButtons()}
      </Space>
    </Layout.Content>
  );
};

export default CallFeedback;
