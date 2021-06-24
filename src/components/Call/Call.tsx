import React, { useCallback, useEffect, useState } from "react";
import { Typography, Layout } from "antd";
import {
  Call,
  CallParticipant,
  ControlledStream,
  InCallStatus,
  InCallParticipantStatus,
} from "src/types/Call";
import { AudioMutedOutlined, VideoCameraOutlined } from "@ant-design/icons";
import {
  getFullName,
  getInitials,
  openNotificationWithIcon,
  showToast,
} from "src/utils/utils";
import { useTranslation } from "react-i18next";
import "src/i18n/config";
import Chat from "src/components/Chat";
import VideoOverlay from "src/components/Call/VideoOverlay";
import VideoMePlaceholder from "src/components/Call/VideoMePlaceholder";
import { WaitingRoomCard } from "./WaitingRoomCard";
import { FAQResource } from "src/types/UI";
import { Timer } from "./Timer";
import Video from "./Video";
import Audio from "./Audio";
import { User } from "src/types/User";
import LeaveCallSound from "src/assets/Sounds/LeaveCall.wav";
import useSound from "use-sound";
import { useCallMessages } from "src/hooks/useRoom";
import RoomClient from "src/pages/Call/RoomClient";
import MessageReceivedSound from "src/assets/Sounds/MessageReceived.mp3";
import { getContactsFirstNames } from "src/utils";
import ContactAvatarGroup from "../Avatar/UserAvatarGroup";
import { differenceInSeconds } from "date-fns";
import { FADING_ANIMATION_DURATION } from "src/constants";
import { WRAPPER_PADDING } from "src/utils/constants";
import * as Sentry from "@sentry/react";

declare global {
  interface Window {
    Debug: any;
  }
}

interface Props {
  call: Call;
  user: User;
  remoteAudios: Record<string, MediaStream>;
  remoteVideos: Record<string, MediaStream>;
  room: RoomClient;
  localVideo?: ControlledStream;
  localAudio?: ControlledStream;
  participantJoinStatus: InCallParticipantStatus;
  leaveCall: () => void;
  push: (path: string) => void;
  openInfoModal: (resource: FAQResource) => void;
  openTestConnectionModal: () => void;
  updateCallStatus: (status: InCallStatus) => void;
}

const CallBase: React.FC<Props> = React.memo(
  ({
    call,
    user,
    room,
    localVideo,
    localAudio,
    remoteAudios,
    remoteVideos,
    participantJoinStatus,
    leaveCall,
    push,
    openInfoModal,
    openTestConnectionModal,
    updateCallStatus,
  }) => {
    const { t } = useTranslation("call");

    const [showOverlay, setShowOverlay] = useState(true);
    const [chatCollapsed, setChatCollapsed] = useState(true);
    const [peerAudioOn, setPeerAudioOn] = useState(true);
    const [peerVideoOn, setPeerVideoOn] = useState(true);
    const [timerOn, setTimerOn] = useState(false);
    const [status, setStatus] = useState<InCallStatus>();

    const alertDocMessageMemo = useCallback(
      (contents: string) =>
        openNotificationWithIcon(t("doc.warning"), contents, "warning"),
      [t]
    );
    const {
      messages,
      addCallMessage,
      hasUnreadMessages,
      setHasUnreadMessages,
    } = useCallMessages(call.id, room, alertDocMessageMemo);

    const [playLeaveCall] = useSound(LeaveCallSound);

    const [playMessageReceived] = useSound(MessageReceivedSound);

    // TODO fix this
    useEffect(() => {
      room.socket.on(
        "producerUpdate",
        async ({
          from,
          producerId,
          paused,
          type,
        }: {
          from: CallParticipant;
          producerId: string;
          paused: boolean;
          type: "audio" | "video";
        }) => {
          console.log("[producerUpdate] received update");
          if (from.type !== "user") return;
          type === "audio" ? setPeerAudioOn(!paused) : setPeerVideoOn(!paused);
        }
      );
    }, [room, t]);

    useEffect(() => {
      room.socket.on("callStatus", async (status: InCallStatus) => {
        console.log("[callStatusUpdate] Status update:", status);
        setStatus(status);
      });
    }, [room]);

    // play a cool sound effect if a new message is received
    useEffect(() => {
      if (!chatCollapsed) setHasUnreadMessages(false);
      if (chatCollapsed && hasUnreadMessages) playMessageReceived();
    }, [
      hasUnreadMessages,
      chatCollapsed,
      setHasUnreadMessages,
      playMessageReceived,
    ]);

    useEffect(() => {
      if (participantJoinStatus === "joined")
        showToast(
          "peerVideo",
          `${getContactsFirstNames(call.userParticipants)} ${
            peerVideoOn ? t("peer.videoOn") : t("peer.videoOff")
          }`,
          "info"
        );
    }, [peerVideoOn, call.userParticipants, participantJoinStatus, t]);

    useEffect(() => {
      if (participantJoinStatus === "joined")
        showToast(
          "peerAudio",
          `${getContactsFirstNames(call.userParticipants)} ${
            peerAudioOn ? t("peer.unmuted") : t("peer.muted")
          }`,
          "info"
        );
    }, [peerAudioOn, call.userParticipants, participantJoinStatus, t]);

    useEffect(() => {
      if (!status) return;
      switch (status) {
        case "missing_monitor":
          showToast("callStatus", t("callStatus.missingMonitor"), "loading", 0);
          break;
        case "live":
          showToast("callStatus", t("callStatus.live"), "info");
          break;
        case "terminated":
          leaveCall();
          showToast("callStatus", t("callStatus.terminated"), "info");
          break;
        case "ended":
          leaveCall();
          showToast("callStatus", t("callStatus.ended"), "info");
          break;
        default:
          break;
      }
      updateCallStatus(status);
    }, [status, t]);

    if (!call) return <div />;

    const getMessage = (): string => {
      if (!room) {
        return t("waitingRoom.initialization");
      } else if (participantJoinStatus === "no_show") {
        return `${t("waitingRoom.waitingForPrefix")} ${getContactsFirstNames(
          call.userParticipants
        )} ${t("waitingRoom.waitingForSuffix")}...`;
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

    const handleSendMessage = (message: string) => {
      room
        .request("textMessage", {
          callId: call.id,
          contents: message,
        })
        .then(
          () =>
            addCallMessage({
              contents: message,
              senderType: "inmate",
              senderId: user.id,
              createdAt: new Date().toISOString(),
              status: "success",
              callId: call.id,
            }),
          (rejection: string) => {
            Sentry.captureException(rejection);
            addCallMessage({
              contents: message,
              senderType: "inmate",
              senderId: user.id,
              createdAt: new Date().toISOString(),
              status: "error",
              callId: call.id,
            });
          }
        );
    };

    const videoKeys = Object.keys(remoteVideos);
    const audioKeys = Object.keys(remoteAudios);

    const isCallEnding =
      differenceInSeconds(new Date(call.scheduledEnd), new Date()) <=
      FADING_ANIMATION_DURATION;
    return (
      <Layout>
        <div
          className="ant-layout-content flex flex-col bg-gray-800"
          onMouseMove={() => onMouseMove()}
          onMouseOver={() => onMouseMove()}
        >
          {peerVideoOn &&
            videoKeys.map((key: string) => (
              <div className="w-full h-full">
                <Video
                  srcObject={remoteVideos[key]}
                  className="m-auto h-screen"
                  autoPlay={true}
                  isFadingOut={isCallEnding}
                />
                {/* Blurb with metadata */}
                <div className="absolute bottom-20 left-4 bg-black bg-opacity-50 py-1 px-2 rounded flex salign-center">
                  {!peerAudioOn && (
                    <AudioMutedOutlined className="text-red-600 text-base" />
                  )}
                  {!peerVideoOn && (
                    <VideoCameraOutlined className="text-red-600 text-base ml-1" />
                  )}
                  <Typography.Text className="text-white text-base ml-1">
                    {" "}
                    {getContactsFirstNames(call.userParticipants)}
                  </Typography.Text>
                </div>
              </div>
            ))}
          {audioKeys.map((key: string) => (
            <Audio
              srcObject={remoteAudios[key]}
              autoPlay={true}
              isFadingOut={isCallEnding}
            />
          ))}
          {timerOn && (
            <Timer
              endTime={call.scheduledEnd}
              className="absolute left-4 bottom-32 bg-opacity-80"
            />
          )}
          {!peerVideoOn && (
            <ContactAvatarGroup
              size={128}
              contacts={call.userParticipants}
              className="mx-auto my-auto"
            />
          )}
          {localVideo && localVideo.stream && !localVideo.paused ? (
            <Video
              srcObject={localVideo.stream}
              className="w-64 absolute top-4 left-4 flex"
              autoPlay={true}
            />
          ) : (
            <VideoMePlaceholder
              initials={getInitials(getFullName(user))}
              height={`${(room.videoAspectRatio || 0.5) * 16}rem`}
              className="w-64"
            />
          )}
          {participantJoinStatus !== "joined" && (
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
                if (!room || !localAudio) return;
                showToast(
                  "microphone",
                  `You ${
                    localAudio.paused ? "unmuted" : "muted"
                  } your microphone`,
                  "info"
                );
                localAudio.paused ? room.resumeAudio() : room.pauseAudio();
              }}
              videoOn={!!!localVideo?.paused}
              toggleVideo={() => {
                if (!room || !localVideo) return;
                showToast(
                  "webcam",
                  `You ${
                    localVideo.paused ? "turned on" : "turned off"
                  } your webcam`,
                  "info"
                );
                localVideo.paused ? room.resumeVideo() : room.pauseVideo();
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
                leaveCall();
              }}
              hasUnreadMessages={hasUnreadMessages}
            />
          )}
        </div>
        {!chatCollapsed && (
          <Layout.Sider
            theme="light"
            className="h-screen mh-screen shadow"
            width={300}
            collapsible
            collapsed={chatCollapsed}
            trigger={null}
          >
            <div
              style={WRAPPER_PADDING}
              className="mt-3 h-screen mh-screen flex flex-col"
            >
              <Typography.Title level={3}>{t("chat.title")}</Typography.Title>
              <Typography.Text className="text-blue-500">
                {t("chat.monitorWarning")}
              </Typography.Text>
              <Chat messages={messages} handleSendMessage={handleSendMessage} />
            </div>
          </Layout.Sider>
        )}
      </Layout>
    );
  }
);
export default CallBase;
