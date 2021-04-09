import { Space, Typography } from "antd";
import { format } from "date-fns";
import React from "react";
import { CallMessage } from "src/types/Call";

interface Props {
  message: CallMessage;
}

const MessageDisplay: React.FC<Props> = ({ message }) => {
  const { type } = message.from;
  const getDisplayName = () => {
    switch (type) {
      case "inmate":
        return "You";
      case "doc":
        return "DOC";
      case "user":
        return "Loved One";
    }
  };
  return (
    <Space
      direction="vertical"
      align={type === "inmate" ? "end" : "start"}
      style={{ width: "100%" }}
    >
      <Space>
        <Typography.Text strong>{getDisplayName()}</Typography.Text>
        <Typography.Text type="secondary">
          {format(new Date(message.timestamp), "HH:mm")}
        </Typography.Text>
      </Space>
      <Typography.Text>{message.content}</Typography.Text>
    </Space>
  );
};

export default MessageDisplay;
