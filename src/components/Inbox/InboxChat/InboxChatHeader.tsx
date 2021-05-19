import { Layout, Space, Typography } from "antd";
import React from "react";
import { Contact } from "src/types/User";
import { getContactsFirstNames } from "src/utils";
import ContactAvatarGroup from "../../Avatar/UserAvatarGroup";

interface Props {
  contacts: Contact[];
}

const InboxChatHeader: React.FC<Props> = ({ contacts }) => {
  return (
    <Layout.Header className="bg-white shadow-md">
      <Space align="center">
        <ContactAvatarGroup contacts={contacts} size="large" />
        <Typography.Title level={4}>
          {getContactsFirstNames(contacts)}
        </Typography.Title>
      </Space>
    </Layout.Header>
  );
};

export default InboxChatHeader;
