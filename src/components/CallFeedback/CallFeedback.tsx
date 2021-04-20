import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Layout, Rate, Button, Space, Typography, Card } from "antd";
import { Call } from "src/types/Call";
import { getLottieOptions } from "src/utils/UI";
import Lottie from "react-lottie";
import GoodbyeLottie from "src/assets/Lottie/Goodbye.json";

export type CallFeedbackType = "forced" | "deliberate" | "unhappy";

interface Props {
  call: Call;
  navigate: (path: string) => void;
  rateCall: (rating: number) => void;
  type: CallFeedbackType;
}

const CallFeedback: React.FC<Props> = ({ call, navigate, rateCall, type }) => {
  const { t } = useTranslation("feedback");

  const [rating, setRating] = useState<number>();

  const desc = [
    t("ratings.terrible"),
    t("ratings.bad"),
    t("ratings.normal"),
    t("ratings.good"),
    t("ratings.wonderful"),
  ];

  const renderTitle = () => {
    switch (type) {
      case "deliberate":
        return t("title.happy");
      case "forced":
        return t("title.happy");
      case "unhappy":
        return t("title.unhappy");
      default:
        return t("title.unhappy");
    }
  };

  const pickIllustration = () => {
    switch (type) {
      case "deliberate":
        return GoodbyeLottie;
      case "forced":
        return GoodbyeLottie;
      case "unhappy":
        return GoodbyeLottie;
      default:
        return GoodbyeLottie;
    }
  };

  const renderButtons = () => {
    switch (type) {
      case "deliberate":
      case "forced":
        return (
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
            {t("buttons.return")}
          </Button>
        );
      case "unhappy":
        return (
          <Space>
            <Button size="large" onClick={() => navigate(`/call/${call.id}`)}>
              {t("buttons.rejoin")}
            </Button>
            <Button type="primary" size="large" onClick={() => navigate(`/`)}>
              {t("buttons.return")}
            </Button>
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
            {t("buttons.return")}
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
        {renderRatings()}
        {renderButtons()}
      </Space>
    </Layout.Content>
  );
};

export default CallFeedback;
