import { Layout, Row, Typography } from "antd";
import React from "react";
import { Chat } from "src/types/Chat";
import InboxChatListItem from "./InboxChatListItem";

interface Props {
  chats: Chat[];
  selected?: Chat;
  selectChat: (chat: Chat) => void;
}

const InboxContactList: React.FC<Props> = ({ chats, selected }) => {
  return (
    <Layout.Sider
      theme="light"
      width={300}
      className="p-4 border-gray-200 border-l-2"
    >
      <Typography.Title level={3}>Chats</Typography.Title>
      {chats.map((chat) => (
        <Row
          className={`${
            selected?.id === chat.id ? "bg-gray-200 p-4 rounded" : ""
          } `}
        >
          <InboxChatListItem
            contacts={chat.contacts}
            lastMessage={
              chat.messages.length > 0 ? chat.messages[0] : undefined
            }
          />
        </Row>
      ))}
    </Layout.Sider>
  );
};

export default InboxContactList;
