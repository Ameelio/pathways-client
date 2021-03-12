import {
  AudioMutedOutlined,
  AudioOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  PoweroffOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Badge, Button, Col, Row, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import RoomClient from "src/pages/Call/RoomClient";
import { Call } from "src/types/Call";
import { showToast } from "src/utils/utils";
import IconButton from "../Common/Buttons/IconButton";

interface Props {
  audioOn: boolean;
  toggleAudio: () => void;
  videoOn: boolean;
  toggleVideo: () => void;
  chatCollapsed: boolean;
  toggleChat: () => void;
  timerOn: boolean;
  toggleTimer: () => void;
  navigate: (path: string) => void;
  call: Call;
  roomClient: RoomClient | undefined;
  hasUnreadMessages: boolean;
}

const VideoOverlay: React.FC<Props> = ({
  audioOn,
  toggleAudio,
  videoOn,
  toggleVideo,
  chatCollapsed,
  toggleChat,
  navigate,
  timerOn,
  toggleTimer,
  call,
  roomClient,
  hasUnreadMessages,
}) => {
  const { t } = useTranslation("call");
  return (
    <Row
      className="absolute bottom-0 bg-white w-full p-4"
      // justify="center"
      align="middle"
      // size="large"
    >
      <Col span={8} offset={8}>
        <Space size="large">
          <IconButton
            icon={
              audioOn ? (
                <AudioOutlined style={Style.iconButton} />
              ) : (
                <AudioMutedOutlined style={Style.iconButton} />
              )
            }
            danger={!audioOn}
            type={audioOn ? "default" : "primary"}
            onClick={() => {
              audioOn ? roomClient?.pauseAudio() : roomClient?.resumeAudio();
              showToast(
                "microphone",
                `${t("you.You")} ${
                  audioOn ? t("you.mutedMic") : t("you.unmutedMic")
                }`,
                "info"
              );
              toggleAudio();
            }}
            label={`${t("videoOverlay.mic")}${" "}${
              audioOn ? t("videoOverlay.on") : t("videoOverlay.off")
            }`}
          />
          <IconButton
            shape="round"
            danger={!videoOn}
            icon={
              videoOn ? (
                <VideoCameraOutlined style={Style.iconButton} />
              ) : (
                <VideoCameraOutlined style={Style.iconButton} />
              )
            }
            size="large"
            type={videoOn ? "default" : "primary"}
            onClick={() => {
              videoOn ? roomClient?.pauseWebcam() : roomClient?.resumeWebcam();
              showToast(
                "webcam",
                `${t("you.You")} ${
                  videoOn ? t("you.disabledWebcam") : t("you.enabledWebcam")
                }`,
                "info"
              );
              toggleVideo();
            }}
            label={`${t("videoOverlay.video")} ${
              videoOn ? t("videoOverlay.on") : t("videoOverlay.off")
            }`}
          />
          <IconButton
            shape="round"
            style={chatCollapsed ? Style.inactive : Style.active}
            icon={
              chatCollapsed ? (
                <Badge dot={hasUnreadMessages}>
                  <MessageOutlined style={Style.iconButton} />
                </Badge>
              ) : (
                <MessageOutlined style={Style.iconButton} />
              )
            }
            size="large"
            onClick={toggleChat}
            label={t("videoOverlay.chat")}
          />
          <IconButton
            shape="round"
            style={!timerOn ? Style.inactive : Style.active}
            icon={<ClockCircleOutlined style={Style.iconButton} />}
            size="large"
            onClick={toggleTimer}
            label={`${
              timerOn ? t("videoOverlay.showTime") : t("videoOverlay.hideTime")
            }`}
          />
        </Space>
      </Col>
      <Col span={2} offset={6}>
        <Button
          danger
          size="large"
          onClick={() => navigate(`/feedback/${call?.id}`)}
          className="align-self-end"
        >
          {t("videoOverlay.leaveCall")}
        </Button>
      </Col>
    </Row>
  );
};

const Style = {
  iconButton: {
    fontSize: 24,
  },
  active: {
    backgroundColor: "#f5f5f5",
  },
  inactive: {
    backgroundColor: "#fff",
  },
};
export default VideoOverlay;
