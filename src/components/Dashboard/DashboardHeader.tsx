import { Col, Space, Typography } from "antd";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Quote } from "src/types/Common";
import { BACKGROUNDS, QUOTES } from "src/constants";
import { getRandomItem } from "src/utils/utils";
import { InfoCircleOutlined } from "@ant-design/icons";

const DashboardHeader: React.FC = () => {
  const [dailyQuote] = useState(getRandomItem(QUOTES) as Quote);
  const [background] = useState(getRandomItem(BACKGROUNDS));
  const [currTime, setCurrTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <Space
      direction="vertical"
      align="center"
      style={{
        backgroundImage: `url(${background})`,
      }}
      className="w-full h-52 rounded-md bg-cover bg-center text-center flex-1 justify-end"
    >
      <Col className="pb-3">
        <Typography.Title level={1} style={Styles.headerTime}>
          {format(currTime, "HH:mm")}
        </Typography.Title>
        <Typography.Title level={5} style={Styles.headerDate}>
          {format(currTime, "eeee, MMMM d")}
        </Typography.Title>
      </Col>
      <Col className="group pb-3">
        <Typography.Title
          level={5}
          style={Styles.quote}
          className="showHoverTrigger"
        >
          {dailyQuote.quote}
        </Typography.Title>
        <Space className="transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100">
          <Typography.Text style={Styles.quote}>
            {dailyQuote.author}
          </Typography.Text>
          <InfoCircleOutlined className="text-white font-bold" />
        </Space>
      </Col>
    </Space>
  );
};

const Styles = {
  headerTime: {
    color: "white",
    marginBottom: 0,
  },
  headerDate: {
    color: "white",
    marginTop: 0,
  },
  quote: {
    color: "white",
  },
};

export default DashboardHeader;
