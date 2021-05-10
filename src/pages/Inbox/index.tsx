import React from "react";
import Inbox from "src/components/Inbox";
import { useChats } from "src/hooks/useChats";
import { useAppSelector } from "src/redux";
import { selectAllContacts } from "src/redux/selectors";
interface Props {}

const FAKE_CHATS = [
  {
    id: 1,
    contactIds: [1],
  },
];

const FAKE_MESSAGES: Record<number, any> = {
  1: [
    {
      chatId: 1,
      senderId: 1,
      senderType: "user",
      createdAt: new Date().toISOString(),
      status: "success",
      contents: "Hey! What's up?",
    },
    {
      chatId: 1,
      senderId: 2,
      senderType: "inmate",
      createdAt: new Date().toISOString(),
      status: "success",
      contents: "Not much! How about you?",
    },
  ],
};

const InboxPage: React.FC<Props> = (props) => {
  const contacts = useAppSelector(selectAllContacts);

  const chats = useChats(FAKE_CHATS, contacts, FAKE_MESSAGES);
  console.log(chats);
  return <Inbox chats={chats} />;
};

export default InboxPage;
