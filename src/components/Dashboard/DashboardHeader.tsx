import { Col, Row, Space, Typography } from "antd";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Quote } from "src/types/Common";
import { QUOTES } from "src/utils/constants";
import { getRandomItem } from "src/utils/utils";

const DashboardHeader: React.FC = () => {
  const [dailyQuote] = useState(getRandomItem(QUOTES) as Quote);
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
        backgroundImage: `url(${dailyQuote.background})`,
      }}
      className="w-full h-52 rounded-md bg-cover bg-center text-center flex-1 justify-end"
    >
      <Col className="pb-4">
        <Typography.Title level={1} style={Styles.headerTime}>
          {format(currTime, "HH:mm")}
        </Typography.Title>
        <Typography.Title level={5} style={Styles.headerDate}>
          {format(currTime, "eeee, MMMM d")}
        </Typography.Title>
      </Col>
      <Col>
        <Typography.Title level={5} style={Styles.quote}>
          {`${dailyQuote.quote} - ${dailyQuote.author}`}
        </Typography.Title>
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
