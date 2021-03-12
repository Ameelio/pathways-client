import React, { useCallback, useEffect, useRef, useState } from "react";
import RoomClient from "src/pages/Call/RoomClient";
import * as mediasoupClient from "mediasoup-client";
import io from "socket.io-client";
import { Typography, Layout, Avatar } from "antd";
import { Call, CallParticipant } from "src/types/Call";
import { AudioMutedOutlined } from "@ant-design/icons";
import { useUserMedia } from "./useUserMedia";
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
import { AuthInfo } from "src/types/Session";
import { WaitingRoomCard } from "./WaitingRoomCard";
import { FAQResource } from "src/types/UI";
import { Timer } from "./Timer";

declare global {
  interface Window {
    Debug: any;
  }
}

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    width: { min: 640, ideal: 1920 },
    height: { min: 400, ideal: 1080 },
  },
};

interface Props {
  call: Call | undefined;
  authInfo: AuthInfo;
  initials: string;
  push: (path: string) => void;
  openInfoModal: (resource: FAQResource) => void;
}

const CallBase: React.FC<Props> = React.memo(
  ({ call, authInfo, push, initials, openInfoModal }) => {
    const { t } = useTranslation("call");

    const [isAuthed, setIsAuthed] = useState(false);
    const [rc, setRc] = useState<RoomClient>();
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const [showOverlay, setShowOverlay] = useState(true);
    const [participantHasJoined, setParticipantHasJoined] = useState(false);
    const [chatCollapsed, setChatCollapsed] = useState(true);
    const mediaStream = useUserMedia(CAPTURE_OPTIONS);
    const [audioOn, setAudioOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [peerAudioOn, setPeerAudioOn] = useState(true);
    const [peerVideoOn, setPeerVideoOn] = useState(true);
    const [timerOn, setTimerOn] = useState(false);

    const meRef = useRef<HTMLVideoElement>(null);
    if (meRef.current && !meRef.current.srcObject && mediaStream) {
      meRef.current.srcObject = mediaStream;
    }

    useEffect(() => {
      if (!socket) {
        const s = io.connect(
          `${process.env.REACT_APP_MEDIASOUP_HOSTNAME}` || "localhost:8000"
          // {
          //   transports: ["websocket"],
          // }
        );
        setSocket(s);
      }
      return () => {
        socket?.close();
      };
    }, [setSocket, socket]);

    const joinRoom = useCallback(async () => {
      if (!call) return;
      const rc = new RoomClient(mediasoupClient, socket, call.id);
      await rc.init();

      setRc(rc);
    }, [call, socket]);

    // Asynchronously load the room
    useEffect(() => {
      if (!isAuthed && socket && call) {
        (async () => {
          console.log(socket);
          if (!socket.connected) {
            console.log("Not connected, so waiting until connected.");
            window.Debug = socket;
            await new Promise((resolve) => socket.on("connect", resolve));
            console.log("OK");
          }

          await new Promise((resolve) => {
            // TODO fetch actual credentials from redux
            socket.emit(
              "authenticate",
              {
                type: authInfo.type,
                id: authInfo.id,
                token: authInfo.token,
              },
              resolve
            );
          });
          await joinRoom();
          setIsAuthed(true);
        })();
      }
    }, [call, authInfo, socket, joinRoom, isAuthed]);

    useEffect(() => {
      if (rc && isAuthed) {
        (async () => {
          // Enumerate media devices
          const devices = await navigator.mediaDevices.enumerateDevices();

          // Get a video input (should be the only one) to send
          const videoInput = Array.from(devices).filter(
            (device) => device.kind === "videoinput"
          )[0];

          // Produce video with it
          await rc.produce("videoType", videoInput);

          // Get a audio input (should be the only one) to send

          // Don't produce audio for now
          const audioInput = Array.from(devices).filter(
            (device) => device.kind === "audioinput"
          )[0];

          // Produce video with it
          await rc.produce("audioType", audioInput);
        })();
      }
    }, [isAuthed, rc]);

    // TODO fix this
    useEffect(() => {
      if (rc && isAuthed) {
        rc.socket.on(
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
            from.type === "user" && contents.type === "audio"
              ? setPeerAudioOn(contents.active)
              : setPeerVideoOn(contents.active);
          }
        );
      }
    }, [isAuthed, rc, t]);

    useEffect(() => {
      if (!chatCollapsed) setHasUnreadMessages(false);
    }, [hasUnreadMessages, chatCollapsed]);

    useEffect(() => {
      if (call && participantHasJoined)
        showToast(
          "peerVideo",
          `${call.connection.user.firstName} ${
            peerVideoOn ? t("peer.videoOn") : t("peer.videoOff")
          }`,
          "info"
        );
    }, [peerVideoOn, call, participantHasJoined, t]);

    useEffect(() => {
      if (call && participantHasJoined)
        showToast(
          "peerAudio",
          `${call.connection.user.firstName} ${
            peerAudioOn ? t("peer.unmuted") : t("peer.muted")
          }`,
          "info"
        );
    }, [peerAudioOn, call, participantHasJoined, t]);

    const measuredRef = useCallback(
      (node) => {
        if (node !== null && rc && isAuthed) {
          (async () => {
            rc.on(
              "consume",
              async (
                kind: string,
                stream: MediaStream,
                user: CallParticipant
              ) => {
                if (node && user.type === "user") {
                  if (kind === "video") {
                    const video = document.createElement("video");
                    video.style.width = "100%";
                    video.style.height = "100%";
                    video.srcObject = stream;
                    video.autoplay = true;
                    node.appendChild(video);
                  } else if (kind === "audio") {
                    const audio = document.createElement("audio");
                    audio.srcObject = stream;
                    audio.autoplay = true;
                    node.appendChild(audio);
                  }

                  setParticipantHasJoined(true);
                } else if (node && user.type === "inmate") {
                }
              }
            );
          })();
        }
      },
      [rc, isAuthed]
    );

    useEffect(() => {
      if (participantHasJoined && call)
        openNotificationWithIcon(
          `${call.connection.user.firstName} ${t("peer.joinedCallTitle")}.`,
          t("peer.joinedCallBody"),
          "info"
        );
    }, [participantHasJoined, call, t]);

    if (!call) return <div />;

    const getMessage = (): string => {
      if (!isAuthed) {
        return t("waitingRoom.initialization");
      } else if (!participantHasJoined) {
        return `${t("waitingRoom.waitingForPrefix")} ${
          call.connection.user.firstName
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

    return (
      <Layout>
        <div
          className="ant-layout-content w-screen h-screen flex bg-gray-800"
          ref={measuredRef}
          onMouseMove={() => onMouseMove()}
          onMouseOver={() => onMouseMove()}
        >
          {timerOn && (
            <Timer
              endTime={call.end}
              className="absolute right-4 top-4 bg-opacity-80	 bg-gray-900 text-white px-4 py-2 rounded-md"
            />
          )}
          {!peerVideoOn && (
            <Avatar size={128} className="bg-blue-500	m-auto text-white	">
              {getInitials(genFullName(call.connection.user)).toUpperCase()}
            </Avatar>
          )}
          {!peerAudioOn && (
            <div className="absolute bottom-20 left-4 bg-black bg-opacity-50 py-1 px-2">
              <AudioMutedOutlined className="text-red-600 text-xs" />
              <Typography.Text className="text-white text-base">
                {" "}
                {genFullName(call.connection.user)}
              </Typography.Text>
            </div>
          )}
          {videoOn ? (
            <video
              className="w-2/12 absolute top-4 left-4 flex"
              autoPlay={true}
              ref={meRef}
            />
          ) : (
            <VideoMePlaceholder initials={initials} />
          )}
          {!participantHasJoined && (
            <WaitingRoomCard
              call={call}
              title={getMessage()}
              navigateBack={() => push("/")}
              openInfoModal={openInfoModal}
            />
          )}
          {showOverlay && (
            <VideoOverlay
              audioOn={audioOn}
              toggleAudio={() => {
                audioOn ? rc?.pauseAudio() : rc?.resumeAudio();
                showToast(
                  "microphone",
                  `You ${audioOn ? "muted" : "unmuted"} your microphone`,
                  "info"
                );
                setAudioOn((audioOn) => !audioOn);
              }}
              videoOn={videoOn}
              toggleVideo={() => {
                videoOn ? rc?.pauseWebcam() : rc?.resumeWebcam();
                showToast(
                  "webcam",
                  `You ${videoOn ? "turned off" : "turned on"} your webcam`,
                  "info"
                );
                setVideoOn((isVideoOn) => !isVideoOn);
              }}
              chatCollapsed={chatCollapsed}
              toggleChat={() => {
                if (chatCollapsed) setHasUnreadMessages(false);
                setChatCollapsed((collapsed) => !collapsed);
              }}
              timerOn={timerOn}
              toggleTimer={() => setTimerOn((timerOn) => !timerOn)}
              navigate={() => push(`/feedback/${call?.id}`)}
              call={call}
              roomClient={rc}
              hasUnreadMessages={hasUnreadMessages}
            />
          )}
        </div>
        {!chatCollapsed && (
          <Chat
            roomClient={rc}
            isAuthed={isAuthed}
            authInfo={authInfo}
            socket={socket}
            call={call}
          />
        )}
      </Layout>
    );
  }
);
export default CallBase;
