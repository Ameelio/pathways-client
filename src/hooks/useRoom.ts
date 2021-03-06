import { useState, useEffect } from "react";
import RoomClient from "src/pages/Call/RoomClient";
import { CallParticipant } from "src/types/Call";
import { CallMessage } from "src/types/Message";

export const useCallMessages = (
  callId: string,
  room: RoomClient,
  alertDocMessage: (contents: string) => void
) => {
  const [messages, setMessages] = useState<CallMessage[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const addCallMessage = (message: CallMessage) => {
    setMessages([...messages, message]);
  };

  // TODO: wrap alertDocMessage in useCallback
  useEffect(() => {
    room.socket.on(
      "textMessage",
      async ({
        from,
        contents,
      }: {
        from: CallParticipant;
        contents: string;
      }) => {
        setHasUnreadMessages(true);
        if (from.type === "doc") {
          alertDocMessage(contents);
        }
        setMessages((messages) => [
          ...messages,
          {
            contents,
            senderId: from.id,
            senderType: from.type,
            createdAt: new Date().toISOString(),
            callId,
            status: "success",
          },
        ]);
      }
    );
  }, [callId, room, setHasUnreadMessages, alertDocMessage]);

  return { messages, addCallMessage, hasUnreadMessages, setHasUnreadMessages };
};
