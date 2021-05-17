import { Layout } from "antd";
import React from "react";
import { UUID } from "src/api/Common";
import ChatComponent from "src/components/Chat";

import { Chat, ChatMessage } from "src/types/Chat";
import InboxChatHeader from "./InboxChatHeader";

interface Props {
  chat: Chat;
  sendMessage: (chatId: UUID, contents: string) => void;
}

const InboxChat: React.FC<Props> = ({ chat, sendMessage }) => {
  const handleSendMessage = (message: string) => {
    sendMessage(chat.id, message);
  };

  return (
    <Layout className="bg-white">
      <InboxChatHeader contacts={chat.contacts} />
      <Layout.Content className="mt-4">
        <ChatComponent
          messages={chat.messages}
          handleSendMessage={handleSendMessage}
        />
      </Layout.Content>
    </Layout>
  );
};

export default InboxChat;
