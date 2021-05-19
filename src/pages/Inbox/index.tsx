import React from "react";
import { UUID } from "src/api/Common";
import Inbox from "src/components/Inbox";
import { useChats } from "src/hooks/useChats";
import { useAppDispatch, useAppSelector } from "src/redux";
import {
  createChatMessage,
  fetchChatMessages,
} from "src/redux/modules/messages";
import { selectAllBaseChats, selectAllContacts } from "src/redux/selectors";

interface Props {}

const InboxPage: React.FC<Props> = (props) => {
  const contacts = useAppSelector(selectAllContacts);
  const baseChats = useAppSelector(selectAllBaseChats);
  const messages = useAppSelector((state) => state.chats.messages);
  const dispatch = useAppDispatch();

  const chats = useChats(baseChats, contacts, messages);

  return (
    <Inbox
      chats={chats}
      fetchMessages={(chatId: UUID) => dispatch(fetchChatMessages(chatId))}
      sendMessage={(chatId: UUID, contents: string) =>
        dispatch(createChatMessage({ chatId, contents }))
      }
    />
  );
};

export default InboxPage;
