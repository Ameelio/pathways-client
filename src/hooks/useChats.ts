import { useEffect, useState } from "react";
import { BaseChat, Chat, ChatMessage } from "src/types/Chat";
import { Contact } from "src/types/User";

// TODO: update this once we finalize the messaging modelling
// This gets all chats from selector, finds full contact objects + messages for that chat
export const useChats = (
  baseChats: BaseChat[],
  contacts: Contact[],
  messageDict: Record<string, ChatMessage[]> // number: ID of the chat
) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const hydratedChats: Chat[] = baseChats.map((chat) => {
      const chatMessages = messageDict[chat.id] || [];
      const chatContacts = contacts.filter((contact) =>
        chat.contactIds.includes(contact.id)
      );
      return { ...chat, messages: chatMessages, contacts: chatContacts };
    });

    setChats(hydratedChats);
  }, [baseChats, contacts, messageDict]);

  return chats;
};
