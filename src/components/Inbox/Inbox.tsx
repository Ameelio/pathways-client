import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { UUID } from "src/api/Common";
import { Chat, ChatMessage } from "src/types/Chat";
import InboxChat from "./InboxChat";
import InboxChatList from "./InboxChatList";

interface Props {
  chats: Chat[];
  sendMessage: (chatId: UUID, contents: string) => void;
  fetchMessages: (chatId: UUID) => void;
}

const Inbox: React.FC<Props> = ({ chats, fetchMessages, sendMessage }) => {
  const [activeChat, selectActiveChat] = useState<Chat>();

  useEffect(() => {
    //  initialize
    if (!activeChat && chats.length) {
      selectActiveChat(chats[0]);
    }
  }, [chats, activeChat]);

  useEffect(() => {
    if (!activeChat) return;
    if (!activeChat.messages) fetchMessages(activeChat.id);
  }, [activeChat, fetchMessages]);

  return (
    <Layout>
      {activeChat && <InboxChat chat={activeChat} sendMessage={sendMessage} />}
      <InboxChatList
        chats={chats}
        selectChat={selectActiveChat}
        selected={activeChat}
      />
    </Layout>
  );
};

export default Inbox;
