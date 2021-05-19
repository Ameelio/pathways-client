import { Space, Typography } from "antd";
import React from "react";
import ContactAvatarGroup from "src/components/Avatar/UserAvatarGroup";
import { ChatMessage } from "src/types/Chat";
import { Contact } from "src/types/User";
import { getContactsFirstNames } from "src/utils";

interface Props {
  contacts: Contact[];
  lastMessage?: ChatMessage;
}

const InboxChatListItem: React.FC<Props> = ({ contacts, lastMessage }) => {
  const hasUnreadMessages = true;
  return (
    <Space align="center" className="w-full flex">
      <ContactAvatarGroup contacts={contacts} size={40} />
      <Space direction="vertical">
        <Typography.Text className="truncate">
          {getContactsFirstNames(contacts)}
        </Typography.Text>
        {lastMessage && (
          <Typography.Text type="secondary" className="truncate">
            {lastMessage.contents}
          </Typography.Text>
        )}
      </Space>
      {hasUnreadMessages && (
        <span className="flex h-3 w-3 self-end">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
      )}
    </Space>
  );
};

export default InboxChatListItem;
