import { Space, Typography } from "antd";
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
    <div>
      <Space
        direction="vertical"
        align="center"
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${dailyQuote.background})`,
          height: "215px",
          borderRadius: "8px",
        }}
        className="dashboard-header-container banner-background"
      >
        <Typography.Title
          className="dashboard-header-content"
          style={{
            paddingTop: 65,
            paddingBottom: 0,
            marginBottom: 0,
          }}
          level={1}
        >
          {format(currTime, "HH:mm")}
        </Typography.Title>
        <Typography.Title className="dashboard-header-content" level={5}>
          {format(currTime, "eeee, MMMM d")}
        </Typography.Title>
        <Typography.Title
          level={5}
          className="dashboard-header-content"
          style={{ paddingTop: 35, paddingBottom: 8 }}
        >
          {`${dailyQuote.quote} - ${dailyQuote.author}`}
        </Typography.Title>
      </Space>
      <div style={{ width: "100%", backgroundColor: "white" }}></div>
    </div>
  );
};

export default DashboardHeader;
