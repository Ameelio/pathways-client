import React, { ReactElement } from "react";
import { Layout, Rate, Button, Space, Typography, Card } from "antd";
import {
  FrownOutlined,
  HeartOutlined,
  SmileOutlined,
  MehOutlined,
} from "@ant-design/icons";

interface Props {}

const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const customIcons = {
  1: <FrownOutlined style={{ fontSize: 36 }} />,
  2: <FrownOutlined style={{ fontSize: 36 }} />,
  3: <MehOutlined style={{ fontSize: 36 }} />,
  4: <SmileOutlined style={{ fontSize: 36 }} />,
  5: <SmileOutlined style={{ fontSize: 36 }} />,
};

function CallFeedbackBase({}: Props): ReactElement {
  return (
    <Layout.Content
      style={{
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        display: "flex",
      }}
    >
      <Space
        direction="vertical"
        align="center"
        style={{ margin: "auto" }}
        size="large"
      >
        <Typography.Title level={2}>You left the meeting.</Typography.Title>
        <Space>
          <Button size="large">Rejoin</Button>
          <Button type="primary" size="large">
            Return home
          </Button>
        </Space>
        <Card title="How was the audio and video?">
          <Rate
            character={<HeartOutlined style={{ fontSize: 36 }} />}
            tooltips={desc}
          />
        </Card>
      </Space>
    </Layout.Content>
  );
}

export default CallFeedbackBase;
