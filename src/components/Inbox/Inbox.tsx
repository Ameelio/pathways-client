import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Chat } from "src/types/Chat";
import InboxChat from "./InboxChat";
import InboxChatList from "./InboxChatList";

interface Props {
  chats: Chat[];
}

const Inbox: React.FC<Props> = ({ chats }) => {
  const [activeChat, selectActiveChat] = useState<Chat>();

  useEffect(() => {
    if (!activeChat && chats.length) {
      selectActiveChat(chats[0]);
    }
  }, [chats, activeChat]);

  return (
    <Layout>
      {activeChat && <InboxChat chat={activeChat} />}
      <InboxChatList
        chats={chats}
        selectChat={selectActiveChat}
        selected={activeChat}
      />
    </Layout>
  );
};

export default Inbox;
