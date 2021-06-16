import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { format } from "date-fns";
import React from "react";
import { BaseMessage } from "src/types/Message";

interface Props {
  message: BaseMessage;
  className?: string;
}

const MessageDisplay: React.FC<Props> = ({ message, className }) => {
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
      className={className}
    >
      <Space>
        <Typography.Text strong>{getDisplayName()}</Typography.Text>
        <Typography.Text type="secondary">
          {format(new Date(message.createdAt), "HH:mm")}
        </Typography.Text>
      </Space>
      <Typography.Text
        mark={type === "doc"}
        className={type === "inmate" ? "float-right text-right" : "float-left"}
      >
        {message.contents}
      </Typography.Text>
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
