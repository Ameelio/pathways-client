import { Divider, Input, Layout, PageHeader, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Call, CallMessage, CallParticipant } from "src/types/Call";
import { WRAPPER_PADDING } from "src/utils/constants";
import MessageDisplay from "src/components/Call/MessageDisplay";
import { openNotificationWithIcon } from "src/utils/utils";
import RoomClient from "src/pages/Call/RoomClient";
import { useTranslation } from "react-i18next";
import MessageReceivedSound from "src/assets/Sounds/MessageReceived.mp3";
import useSound from "use-sound";

interface Props {
  roomClient: RoomClient | undefined;
  inmateId: number;
  call: Call;
}

const Chat: React.FC<Props> = ({ roomClient, inmateId, call }) => {
  const { Sider } = Layout;
  const { t } = useTranslation("call");

  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const [messages, setMessages] = useState<CallMessage[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const [playMessageReceived] = useSound(MessageReceivedSound);

  useEffect(() => {
    if (roomClient) {
      roomClient.socket.on(
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
            openNotificationWithIcon(t("doc.warning"), contents, "warning");
          }
          setMessages((messages) => [
            ...messages,
            {
              contents,
              senderId: from.id,
              senderType: from.type,
              createdAt: new Date().toISOString(),
              callId: call.id,
              status: "success",
            },
          ]);
        }
      );
    }
  }, [roomClient, t, call.id]);

  useEffect(() => {
    if (chatCollapsed && hasUnreadMessages) playMessageReceived();
    if (!chatCollapsed) setHasUnreadMessages(false);
  }, [hasUnreadMessages, chatCollapsed, playMessageReceived]);

  const onSendMessage = async () => {
    if (!roomClient) return;
    setDraftMessage("");
    //  TODO: update status of call message depending on whether promise fulfills or not
    // need to first add status (success, status, pending)
    // https://github.com/Ameelio/pathways-client/issues/32
    roomClient
      .request("textMessage", {
        callId: call.id,
        contents: draftMessage,
      })
      .then(
        () =>
          setMessages([
            ...messages,
            {
              contents: draftMessage,
              senderType: "inmate",
              senderId: inmateId,
              createdAt: new Date().toISOString(),
              status: "success",
              callId: call.id,
            },
          ]),
        (rejection: string) => {
          // TODO: log rejection error
          console.log(rejection);
          setMessages([
            ...messages,
            {
              contents: draftMessage,
              senderType: "inmate",
              senderId: inmateId,
              createdAt: new Date().toISOString(),
              status: "error",
              callId: call.id,
            },
          ]);
        }
      );
  };

  return (
    <Sider
      theme="light"
      style={{ height: "100vh", maxHeight: "100vh" }}
      width={300}
      collapsible
      collapsed={chatCollapsed}
      onCollapse={() => setChatCollapsed(true)}
    >
      {!chatCollapsed && <PageHeader title={t("chat.title")} />}

      {!chatCollapsed && (
        <div className="flex flex-col h-full" style={WRAPPER_PADDING}>
          <Space direction="vertical" style={{ overflowY: "scroll" }}>
            <Typography.Text mark>{t("chat.monitorWarning")}</Typography.Text>
            {messages.map((message) => (
              <MessageDisplay message={message} />
            ))}
          </Space>
          <div className="mt-auto mb-8 flex-shrink-0">
            <Divider />
            <Input.TextArea
              value={draftMessage}
              rows={2}
              onChange={(e) => setDraftMessage(e.target.value)}
              onPressEnter={(_e) => onSendMessage()}
              onSubmit={(_e) => onSendMessage()}
              placeholder={t("chat.placeholder")}
              autoFocus
              bordered={false}
            />
          </div>
        </div>
      )}
    </Sider>
  );
};

export default Chat;
