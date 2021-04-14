import React, { useEffect, useState } from "react";
import RoomClient from "src/pages/Call/RoomClient";
import { Typography, Layout, Avatar } from "antd";
import { Call, CallParticipant, ControlledStream } from "src/types/Call";
import { AudioMutedOutlined } from "@ant-design/icons";
import {
  genFullName,
  getInitials,
  openNotificationWithIcon,
  showToast,
} from "src/utils/utils";
import { useTranslation } from "react-i18next";
import "src/i18n/config";
import Chat from "src/components/Call/Chat";
import VideoOverlay from "src/components/Call/VideoOverlay";
import VideoMePlaceholder from "src/components/Call/VideoMePlaceholder";
import { WaitingRoomCard } from "./WaitingRoomCard";
import { FAQResource } from "src/types/UI";
import { Timer } from "./Timer";
import Video from "./Video";
import Audio from "./Audio";
import { User } from "src/types/User";
import LeaveCallSound from "src/assets/Sounds/LeaveCall.wav";
import JoinedCallSound from "src/assets/Sounds/EnterCall.wav";
import useSound from "use-sound";

declare global {
  interface Window {
    Debug: any;
  }
}

interface Props {
  call: Call | undefined;
  user: User;
  remoteAudios: Record<number, MediaStream>;
  remoteVideos: Record<number, MediaStream>;
  roomClient: RoomClient;
  localVideo?: ControlledStream;
  localAudio?: ControlledStream;
  push: (path: string) => void;
  openInfoModal: (resource: FAQResource) => void;
  openTestConnectionModal: () => void;
}

const CallBase: React.FC<Props> = React.memo(
  ({
    call,
    user,
    roomClient,
    localVideo,
    localAudio,
    remoteAudios,
    remoteVideos,
    push,
    openInfoModal,
    openTestConnectionModal,
  }) => {
    const { t } = useTranslation("call");

    const [showOverlay, setShowOverlay] = useState(true);
    const [participantHasJoined, setParticipantsHasJoined] = useState(false);
    const [chatCollapsed, setChatCollapsed] = useState(true);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [peerAudioOn, setPeerAudioOn] = useState(true);
    const [peerVideoOn, setPeerVideoOn] = useState(true);
    const [timerOn, setTimerOn] = useState(false);

    const [playJoinCall] = useSound(JoinedCallSound);
    const [playLeaveCall] = useSound(LeaveCallSound);

    useEffect(() => {
      Object.keys(remoteVideos).length > 0 ||
      Object.keys(remoteAudios).length > 0
        ? setParticipantsHasJoined(true)
        : setParticipantsHasJoined(false);
    }, [remoteVideos, remoteAudios]);

    // TODO fix this
    useEffect(() => {
      if (roomClient) {
        roomClient.socket.on(
          "producerUpdate",
          async ({
            from,
            contents,
          }: {
            from: CallParticipant;
            contents: {
              producerId: string;
              active: boolean;
              type: "audio" | "video";
            };
          }) => {
            if (from.type !== "user") return;
            contents.type === "audio"
              ? setPeerAudioOn(contents.active)
              : setPeerVideoOn(contents.active);
          }
        );
      }
    }, [roomClient, t]);

    useEffect(() => {
      if (!chatCollapsed) setHasUnreadMessages(false);
    }, [hasUnreadMessages, chatCollapsed]);

    useEffect(() => {
      if (call && participantHasJoined)
        showToast(
          "peerVideo",
          `${call.userParticipants[0].firstName} ${
            peerVideoOn ? t("peer.videoOn") : t("peer.videoOff")
          }`,
          "info"
        );
    }, [peerVideoOn, call, participantHasJoined, t]);

    useEffect(() => {
      if (call && participantHasJoined)
        showToast(
          "peerAudio",
          `${call.userParticipants[0].firstName} ${
            peerAudioOn ? t("peer.unmuted") : t("peer.muted")
          }`,
          "info"
        );
    }, [peerAudioOn, call, participantHasJoined, t]);

    useEffect(() => {
      if (participantHasJoined && call) {
        playJoinCall();
        openNotificationWithIcon(
          `${call.userParticipants[0].firstName} ${t("peer.joinedCallTitle")}.`,
          t("peer.joinedCallBody"),
          "info"
        );
      }
    }, [participantHasJoined, call, playJoinCall, t]);

    if (!call) return <div />;

    const getMessage = (): string => {
      if (!roomClient) {
        return t("waitingRoom.initialization");
      } else if (!participantHasJoined) {
        return `${t("waitingRoom.waitingForPrefix")} ${
          call.userParticipants[0].firstName
        } ${t("waitingRoom.waitingForSuffix")}...`;
      }
      return t("waitingRoom.loading");
    };

    let timeout: any;
    const onMouseMove = () => {
      setShowOverlay(true);
      (() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setShowOverlay(false), 5000);
      })();
    };

    // TODO once we support calls with multiple people at once, we can expand on this implementation
    const keys = Object.keys(remoteVideos).map((key) => parseInt(key));

    return (
      <Layout>
        <div
          className="ant-layout-content w-screen h-screen flex bg-gray-800"
          onMouseMove={() => onMouseMove()}
          onMouseOver={() => onMouseMove()}
        >
          {keys.map((key: number) => (
            <div className="w-full h-full">
              <Video
                srcObject={remoteVideos[key]}
                className="w-full h-full"
                autoPlay={true}
              />
              <Audio srcObject={remoteAudios[key]} autoPlay={true} />
            </div>
          ))}
          {timerOn && (
            <Timer
              endTime={call.scheduledEnd}
              className="absolute right-4 top-4 bg-opacity-80"
            />
          )}
          {!peerVideoOn && (
            <Avatar size={128} className="bg-blue-500	m-auto text-white	">
              {getInitials(genFullName(call.userParticipants[0])).toUpperCase()}
            </Avatar>
          )}
          {!peerAudioOn && (
            <div className="absolute bottom-20 left-4 bg-black bg-opacity-50 py-1 px-2">
              <AudioMutedOutlined className="text-red-600 text-xs" />
              <Typography.Text className="text-white text-base">
                {" "}
                {genFullName(call.userParticipants[0])}
              </Typography.Text>
            </div>
          )}
          {localVideo && localVideo.stream && !localVideo.paused ? (
            <Video
              srcObject={localVideo.stream}
              className="w-2/12 absolute top-4 left-4 flex"
              autoPlay={true}
            />
          ) : (
            <VideoMePlaceholder initials={getInitials(genFullName(user))} />
          )}
          {!participantHasJoined && (
            <WaitingRoomCard
              call={call}
              title={getMessage()}
              navigateBack={() => push("/")}
              openInfoModal={openInfoModal}
              openTestConnectionModal={openTestConnectionModal}
            />
          )}
          {showOverlay && (
            <VideoOverlay
              loading={!(localAudio && localVideo)}
              audioOn={!!!localAudio?.paused}
              toggleAudio={() => {
                if (!roomClient || !localAudio) return;
                showToast(
                  "microphone",
                  `You ${
                    localAudio.paused ? "unmuted" : "muted"
                  } your microphone`,
                  "info"
                );
                localAudio.paused
                  ? roomClient.resumeAudio()
                  : roomClient.pauseAudio();
              }}
              videoOn={!!!localVideo?.paused}
              toggleVideo={() => {
                if (!roomClient || !localVideo) return;
                showToast(
                  "webcam",
                  `You ${
                    localVideo.paused ? "turned on" : "turned off"
                  } your webcam`,
                  "info"
                );
                localVideo.paused
                  ? roomClient.resumeVideo()
                  : roomClient.pauseVideo();
              }}
              chatCollapsed={chatCollapsed}
              toggleChat={() => {
                if (chatCollapsed) setHasUnreadMessages(false);
                setChatCollapsed((collapsed) => !collapsed);
              }}
              timerOn={timerOn}
              toggleTimer={() => setTimerOn((timerOn) => !timerOn)}
              terminateCall={() => {
                playLeaveCall();
                push(`/feedback/${call?.id}`);
              }}
              hasUnreadMessages={hasUnreadMessages}
            />
          )}
        </div>
        {!chatCollapsed && (
          <Chat roomClient={roomClient} inmateId={user.id} call={call} />
        )}
      </Layout>
    );
  }
);
export default CallBase;
