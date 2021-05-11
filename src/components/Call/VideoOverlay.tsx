import {
  AudioMutedOutlined,
  AudioOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Badge, Button, Col, Row, Space, Spin } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import IconButton from "../Common/Buttons/IconButton";

interface Props {
  loading: boolean;
  audioOn: boolean;
  toggleAudio: () => void;
  videoOn: boolean;
  toggleVideo: () => void;
  chatCollapsed: boolean;
  toggleChat: () => void;
  timerOn: boolean;
  toggleTimer: () => void;
  terminateCall: () => void;
  hasUnreadMessages: boolean;
}

const VideoOverlay: React.FC<Props> = ({
  loading,
  audioOn,
  toggleAudio,
  videoOn,
  toggleVideo,
  chatCollapsed,
  toggleChat,
  terminateCall,
  timerOn,
  toggleTimer,
  hasUnreadMessages,
}) => {
  const { t } = useTranslation("call");
  return !loading ? (
    <Row className="absolute bottom-0 bg-white w-full p-4" align="middle">
      <Col span={2}>
        <Button
          danger
          size="large"
          onClick={() => terminateCall()}
          className="align-self-end"
        >
          {t("videoOverlay.leaveCall")}
        </Button>
      </Col>

      <Col span={8} offset={6}>
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
            onClick={toggleAudio}
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
            onClick={toggleVideo}
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
              !timerOn ? t("videoOverlay.showTime") : t("videoOverlay.hideTime")
            }`}
          />
        </Space>
      </Col>
    </Row>
  ) : (
    <Row className="absolute bottom-0 bg-white w-full p-4 flex" align="middle">
      <Col className="m-auto">
        <Spin />
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
