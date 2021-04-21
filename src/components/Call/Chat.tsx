import { Divider, Input, Layout, PageHeader, Space, Typography } from "antd";
import React, { useState } from "react";
import { Call, CallMessage } from "src/types/Call";
import { WRAPPER_PADDING } from "src/utils/constants";
import MessageDisplay from "src/components/Call/MessageDisplay";
import { useTranslation } from "react-i18next";
import RoomClient from "src/pages/Call/RoomClient";

interface Props {
  room: RoomClient;
  inmateId: number;
  call: Call;
  messages: CallMessage[];
  addCallMessage: (message: CallMessage) => void;
  chatCollapsed: boolean;
  hasUnreadMessages: boolean;
}

const Chat: React.FC<Props> = ({
  room,
  inmateId,
  call,
  messages,
  addCallMessage,
  chatCollapsed,
}) => {
  const { Sider } = Layout;
  const { t } = useTranslation("call");

  const [draftMessage, setDraftMessage] = useState("");

  const onSendMessage = async () => {
    setDraftMessage("");
    room
      .request("textMessage", {
        callId: call.id,
        contents: draftMessage,
      })
      .then(
        () =>
          addCallMessage({
            contents: draftMessage,
            senderType: "inmate",
            senderId: inmateId,
            createdAt: new Date().toISOString(),
            status: "success",
            callId: call.id,
          }),
        (rejection: string) => {
          // TODO: log Sentry rejection error
          // https://github.com/Ameelio/connect-doc-client/issues/60
          console.log(rejection);
          addCallMessage({
            contents: draftMessage,
            senderType: "inmate",
            senderId: inmateId,
            createdAt: new Date().toISOString(),
            status: "error",
            callId: call.id,
          });
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
      trigger={null}
    >
      {!chatCollapsed && (
        <div className="flex flex-col h-full">
          <PageHeader title={t("chat.title")} />
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
        </div>
      )}
    </Sider>
  );
};

export default Chat;
