import { Layout } from "antd";
import React from "react";
import ChatComponent from "src/components/Chat";

import { Chat } from "src/types/Chat";
import InboxChatHeader from "./InboxChatHeader";

interface Props {
  chat: Chat;
}

const InboxChat: React.FC<Props> = ({ chat }) => {
  const handleSendMessage = (message: string) => {
    console.log(message);
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
