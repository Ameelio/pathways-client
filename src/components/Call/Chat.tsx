import { Divider, Input, Layout, PageHeader, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Call, CallMessage, CallParticipant } from "src/types/Call";
import { WRAPPER_PADDING } from "src/utils/constants";
import MessageDisplay from "src/components/Call/MessageDisplay";
import { openNotificationWithIcon } from "src/utils/utils";
import RoomClient from "src/pages/Call/RoomClient";
import { useTranslation } from "react-i18next";

interface Props {
  roomClient: RoomClient | undefined;
  // isAuthed: boolean;
  inmateId: number;
  // socket: SocketIOClient.Socket | undefined;
  call: Call;
}

const Chat: React.FC<Props> = ({ roomClient, inmateId, call }) => {
  const { Sider } = Layout;
  const { t } = useTranslation("call");

  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const [messages, setMessages] = useState<CallMessage[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  useEffect(() => {
    if (roomClient) {
      roomClient.socket.on(
        "textMessage",
        async ({
          from,
          contents,
          meta,
        }: {
          from: CallParticipant;
          contents: string;
          meta: string;
        }) => {
          setHasUnreadMessages(true);
          if (from.type === "monitor") {
            openNotificationWithIcon(t("doc.warning"), contents, "warning");
          }
          console.log("received message", contents);
          console.log(from);
          setMessages((messages) => [
            ...messages,
            {
              content: contents,
              from,
              timestamp: new Date().toLocaleDateString(),
            },
          ]);
        }
      );
    }
  }, [roomClient, t]);

  useEffect(() => {
    if (!chatCollapsed) setHasUnreadMessages(false);
  }, [hasUnreadMessages, chatCollapsed]);

  const onSendMessage = async () => {
    if (!roomClient) return;
    setDraftMessage("");
    //TODO add property sent and change image visibility depending on whether it actually went through
    setMessages([
      ...messages,
      {
        content: draftMessage,
        from: {
          type: "inmate",
          id: inmateId,
        },
        timestamp: new Date().toLocaleDateString(),
      },
    ]);
    const { participants } = await new Promise((resolve, reject) => {
      roomClient.socket.emit("info", { callId: call.id }, resolve);
    });
    await new Promise((resolve) => {
      // TODO fetch actual credentials from redux
      roomClient.socket.emit(
        "textMessage",
        {
          callId: call.id,
          contents: draftMessage,
          recipients: participants,
        },
        resolve
      );
    });
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
