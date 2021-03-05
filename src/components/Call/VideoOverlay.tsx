import {
  AudioMutedOutlined,
  AudioOutlined,
  MessageOutlined,
  PoweroffOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Badge, Button, Space } from "antd";
import React from "react";
import RoomClient from "src/pages/Call/RoomClient";
import { Call } from "src/types/Call";
import { showToast } from "src/utils/utils";

interface Props {
  audioOn: boolean;
  toggleAudio: () => void;
  videoOn: boolean;
  toggleVideo: () => void;
  chatCollapsed: boolean;
  toggleChat: () => void;
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
  call,
  roomClient,
  hasUnreadMessages,
}) => {
  return (
    <Space className="video-overlay-actions" align="center" size="large">
      <Button
        shape="round"
        icon={
          audioOn ? (
            <AudioOutlined style={{ fontSize: 24 }} />
          ) : (
            <AudioMutedOutlined style={{ fontSize: 24 }} />
          )
        }
        size="large"
        danger={!audioOn}
        type={audioOn ? "default" : "primary"}
        onClick={() => {
          audioOn ? roomClient?.pauseAudio() : roomClient?.resumeAudio();
          showToast(
            "microphone",
            `You ${audioOn ? "muted" : "unmuted"} your microphone`,
            "info"
          );
          toggleAudio();
        }}
      />
      <Button
        shape="round"
        icon={<PoweroffOutlined color="red" />}
        size="large"
        onClick={() => navigate(`/feedback/${call?.id}`)}
      />
      <Button
        shape="round"
        danger={!videoOn}
        icon={
          videoOn ? (
            <VideoCameraOutlined style={{ fontSize: 24 }} />
          ) : (
            <VideoCameraOutlined style={{ fontSize: 24 }} />
          )
        }
        size="large"
        type={videoOn ? "default" : "primary"}
        onClick={() => {
          videoOn ? roomClient?.pauseWebcam() : roomClient?.resumeWebcam();
          showToast(
            "webcam",
            `You ${videoOn ? "turned off" : "turned on"} your webcam`,
            "info"
          );
          toggleVideo();
        }}
      />
      <Button
        shape="round"
        style={{ backgroundColor: chatCollapsed ? "#fff" : "#f5f5f5" }}
        icon={
          chatCollapsed ? (
            <Badge dot={hasUnreadMessages}>
              <MessageOutlined style={{ fontSize: 24 }} />
            </Badge>
          ) : (
            <MessageOutlined style={{ fontSize: 24 }} />
          )
        }
        size="large"
        onClick={toggleChat}
      />
    </Space>
  );
};

export default VideoOverlay;
