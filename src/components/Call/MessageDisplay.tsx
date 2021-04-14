import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { format } from "date-fns";
import React from "react";
import { CallMessage } from "src/types/Call";

interface Props {
  message: CallMessage;
}

const MessageDisplay: React.FC<Props> = ({ message }) => {
  const type = message.senderType;
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
          {format(new Date(message.createdAt), "HH:mm")}
        </Typography.Text>
      </Space>
      <Typography.Text>{message.contents}</Typography.Text>
      {message.status === "error" && (
        <Space direction="horizontal">
          <ExclamationCircleOutlined className="text-red-600 text-xs" />
          <Typography.Text>Message failed to send</Typography.Text>
        </Space>
      )}
    </Space>
  );
};

export default MessageDisplay;
