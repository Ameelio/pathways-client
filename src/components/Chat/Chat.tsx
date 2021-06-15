import { Divider, Input } from "antd";
import React, { useState, useRef, useEffect } from "react";
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const onSendMessage = async () => {
    const cleanMessage = draftMessage.trim();
    if (!cleanMessage.length) return;
    handleSendMessage(draftMessage.trim());
    setDraftMessage("");
  };

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scroll({
      top: messagesContainerRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [messagesContainerRef, messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col overflow-y-auto" ref={messagesContainerRef}>
        {messages.map((message) => (
          <MessageDisplay message={message} className="mt-4" />
        ))}
      </div>
      <div className="mt-auto mb-8 flex-shrink-0 min-height-1/4 h-1/4">
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
