import { Divider, Input, Space } from "antd";
import React, { useState } from "react";
import { BaseMessage } from "src/types/Message";
import MessageDisplay from "./MessageDisplay";
import { useTranslation } from "react-i18next";

interface Props {
  messages: BaseMessage[];
  handleSendMessage: (message: string) => void;
}

const Chat: React.FC<Props> = ({ messages, handleSendMessage }) => {
  const { t } = useTranslation("call");

  const [draftMessage, setDraftMessage] = useState("");

  const onSendMessage = async () => {
    setDraftMessage("");
    handleSendMessage(draftMessage);
  };

  return (
    <div className="flex flex-col h-full">
      <Space direction="vertical" style={{ overflowY: "scroll" }}>
        {messages.map((message) => (
          <MessageDisplay message={message} />
        ))}
      </Space>
      <div className="mt-auto mb-8 flex-shrink-0">
        <Divider />
        <Input.TextArea
          value={draftMessage}
          rows={2}
          onChange={(e) => setDraftMessage(e.target.value)}
          onPressEnter={onSendMessage}
          onSubmit={onSendMessage}
          placeholder={t("chat.placeholder")}
          autoFocus
          bordered={false}
        />
      </div>
    </div>
  );
};

export default Chat;
