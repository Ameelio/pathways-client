import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux";
import RoomClient from "src/pages/Call/RoomClient";
import * as mediasoupClient from "mediasoup-client";
import io from "socket.io-client";
import { Button, Space, Spin, Typography } from "antd";
import { Call } from "src/types/Call";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { selectCallById } from "src/redux/selectors";
import "./index.css";
import {
  AudioMutedOutlined,
  AudioOutlined,
  MessageOutlined,
  PoweroffOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";

declare global {
  interface Window {
    Debug: any;
  }
}

type TParams = { id: string };

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<TParams>
) => ({
  call: selectCallById(state, ownProps.match.params.id),
  authInfo: state.session.authInfo,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Loader({ message }: { message: string }): ReactElement {
  return (
    <div className="video-loading-spinner">
      <Spin tip={message} />
    </div>
  );
}

const CallBase: React.FC<PropsFromRedux> = React.memo(({ call, authInfo }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [rc, setRc] = useState<RoomClient>();
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [showOverlay, setShowOverlay] = useState(true);
  const [participantHasJoined, setParticipantHasJoined] = useState(false);

  const [participant, setParticipant] = useState(() => {
    const video = document.createElement("video");
    video.style.width = "100%";
    video.style.height = "100%";
    return video;
  });

  useEffect(() => {
    if (!socket) {
      const s = io.connect(
        `${process.env.REACT_APP_MEDIASOUP_HOSTNAME}` || "localhost:8000",
        {
          transports: ["websocket"],
        }
      );
      setSocket(s);
    }
  }, [setSocket, socket]);

  const joinRoom = useCallback(async () => {
    if (!call) return;
    const rc = new RoomClient(mediasoupClient, socket, call.id);
    await rc.init();

    setRc(rc);
  }, [call, socket]);

  // Asynchronously load the room
  useEffect(() => {
    setLoading(true);
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
        console.log("init room");
        setIsAuthed(true);
        setLoading(false);
      })();
    }
  }, [call, authInfo, socket, joinRoom, isAuthed]);

  useEffect(() => {
    if (rc && isAuthed) {
      (async () => {
        // Enumerate media devices
        const devices = await navigator.mediaDevices.enumerateDevices();

        console.log(devices);

        // Get a video input (should be the only one) to send
        const videoInput = Array.from(devices).filter(
          (device) => device.kind === "videoinput"
        )[0];

        console.log("producing video");

        // Produce video with it
        await rc.produce("videoType", videoInput);

        // Get a audio input (should be the only one) to send

        // Don't produce audio for now
        const audioInput = Array.from(devices).filter(
          (device) => device.kind === "audioinput"
        )[0];

        console.log("producing audio");

        // Produce video with it
        await rc.produce("audioType", audioInput);
      })();
    }
  }, [isAuthed, rc]);

  const measuredRef = useCallback(
    (node) => {
      if (node !== null && rc && isAuthed) {
        (async () => {
          rc.on(
            "consume",
            async (
              kind: string,
              stream: MediaStream,
              user: { type: string; id: number }
            ) => {
              if (node && kind !== "inmate") {
                console.log("CONSUME: outside stream");
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
              }
            }
          );
        })();
      }
    },
    [rc, isAuthed]
  );

  const meRef = useCallback(
    (node) => {
      if (node !== null && rc && isAuthed) {
        (async () => {
          rc.on(
            "consume",
            async (
              kind: string,
              stream: MediaStream,
              user: { type: string; id: number }
            ) => {
              if (node && user.type === "inmate") {
                console.log("CONSUME: inmate stream");
                if (kind === "video") {
                  const video = document.createElement("video");
                  video.style.width = "300px";
                  video.style.height = "200px";
                  video.srcObject = stream;
                  video.autoplay = true;
                  node.appendChild(video);
                }
              }
            }
          );
        })();
      }
    },
    [rc, isAuthed]
  );

  const getMessage = (): string => {
    if (!isAuthed) {
      return "Initializing video call...";
    } else if (!participantHasJoined) {
      return `Waiting for ${"Gabe"} to join the call...`;
    }
    return "Loading...";
  };

  return (
    <div className="video-wrapper" ref={measuredRef}>
      <div className="video-me" ref={meRef} />
      <Space className="video-info-overlay">
        <MessageOutlined />
        <Typography.Title level={4}>
          {format(new Date(), "HH:mm")}
        </Typography.Title>
      </Space>
      {!participantHasJoined && <Loader message={getMessage()} />}
      <Space className="video-overlay" align="center">
        <Button
          shape="round"
          icon={true ? <AudioOutlined /> : <AudioMutedOutlined />}
          size="large"
        />
        <Button shape="round" icon={<PoweroffOutlined />} size="large" />
        <Button
          shape="round"
          icon={true ? <VideoCameraOutlined /> : <AudioMutedOutlined />}
          size="large"
        />
      </Space>
    </div>
  );
});

export default connector(CallBase);
