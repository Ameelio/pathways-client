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
import {
  Button,
  Space,
  Spin,
  Typography,
  Layout,
  PageHeader,
  Input,
  Divider,
} from "antd";
import { Call, CallMessage, CallParticipant } from "src/types/Call";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { selectCallById } from "src/redux/selectors";
import "./index.css";
import {
  AudioMutedOutlined,
  AudioOutlined,
  MessageOutlined,
  PoweroffOutlined,
  ShopTwoTone,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { useUserMedia } from "./useUserMedia";
import { goBack } from "connected-react-router";
import { HEARTBEAT_INTERVAL, WRAPPER_PADDING } from "src/utils/constants";

const { Sider } = Layout;
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

const mapDispatchToProps = { goBack };
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Loader({ message }: { message: string }): ReactElement {
  return (
    <div className="video-loading-spinner">
      <Spin tip={message} />
    </div>
  );
}

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    width: { min: 640, ideal: 1920 },
    height: { min: 400, ideal: 1080 },
  },
};

function MessageDisplay({ message }: { message: CallMessage }): ReactElement {
  const { type } = message.from;
  const getDisplayName = () => {
    switch (type) {
      case "inmate":
        return "You";
      case "monitor":
        return "DOC";
      case "user":
        return "Loved One";
    }
  };
  return (
    <Space
      direction="vertical"
      align={type === "inmate" ? "end" : "start"}
      style={{ width: "100%" }}
    >
      <Space>
        <Typography.Text strong>{getDisplayName()}</Typography.Text>
        <Typography.Text type="secondary">
          {format(new Date(message.timestamp), "HH:mm")}
        </Typography.Text>
      </Space>
      <Typography.Text>{message.content}</Typography.Text>
    </Space>
  );
}

const CallBase: React.FC<PropsFromRedux> = React.memo(
  ({ call, authInfo, goBack }) => {
    const [isAuthed, setIsAuthed] = useState(false);
    const [rc, setRc] = useState<RoomClient>();
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const [showOverlay, setShowOverlay] = useState(true);
    const [participantHasJoined, setParticipantHasJoined] = useState(false);
    const [chatCollapsed, setChatCollapsed] = useState(false);
    const mediaStream = useUserMedia(CAPTURE_OPTIONS);
    const [draftMessage, setDraftMessage] = useState("");
    const [messages, setMessages] = useState<CallMessage[]>([]);

    const meRef = useRef<HTMLVideoElement>(null);
    if (meRef.current && !meRef.current.srcObject && mediaStream) {
      meRef.current.srcObject = mediaStream;
    }

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

    useEffect(() => {
      if (rc && isAuthed) {
        rc.on(
          "textMessage",
          async (from: CallParticipant, contents: string, meta: string) => {
            console.log("receiving message");
            setMessages([
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
                user: CallParticipant
              ) => {
                console.log(`CONSUME RECEIVED: ${user.type} ${kind}`);
                if (node && user.type === "user") {
                  console.log("CONSUME: user stream");
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

    let lastHeartbeatTime = new Date().getTime();
    useEffect(() => {
      if (rc && call) {
        const now = new Date().getTime();
        if (now - lastHeartbeatTime > HEARTBEAT_INTERVAL) {
          rc.request("heartbeat", { callId: call.id });
          lastHeartbeatTime = now;
        }
      }
    }, [rc, call]);

    const getMessage = (): string => {
      if (!isAuthed) {
        return "Initializing video call...";
      } else if (!participantHasJoined) {
        return `Waiting for ${"Gabe"} to join the call...`;
      }
      return "Loading...";
    };

    let timeout: any;
    const onMouseMove = () => {
      setShowOverlay(true);
      (() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setShowOverlay(false), 5000);
      })();
    };

    const onSendMessage = async () => {
      console.log("sending message");
      if (!socket || !call) return;
      setDraftMessage("");
      //TODO add property sent and change image visibility depending on whether it actually went through
      setMessages([
        ...messages,
        {
          content: draftMessage,
          from: {
            type: "inmate",
            id: authInfo.id,
          },
          timestamp: new Date().toLocaleDateString(),
        },
      ]);
      const { participants } = await new Promise((resolve, reject) => {
        socket.emit("info", { callId: call.id }, resolve);
      });
      await new Promise((resolve) => {
        // TODO fetch actual credentials from redux
        socket.emit(
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
      <Layout>
        <div
          className="video-wrapper ant-layout-content"
          ref={measuredRef}
          onMouseMove={() => onMouseMove()}
        >
          <video className="video-me" autoPlay={true} ref={meRef} />
          {!participantHasJoined && <Loader message={getMessage()} />}
          {showOverlay && (
            <Space className="video-overlay-actions" align="center">
              <Button
                shape="round"
                icon={true ? <AudioOutlined /> : <AudioMutedOutlined />}
                size="large"
              />
              <Button
                shape="round"
                icon={<PoweroffOutlined />}
                size="large"
                onClick={() => goBack()}
              />
              <Button
                shape="round"
                icon={true ? <VideoCameraOutlined /> : <AudioMutedOutlined />}
                size="large"
              />
            </Space>
          )}
        </div>
        {(!chatCollapsed || showOverlay) && (
          <Sider
            theme="light"
            style={{ height: "100vh", maxHeight: "100vh" }}
            width={300}
            collapsible
            collapsed={chatCollapsed}
            onCollapse={(collapsed) => setChatCollapsed(collapsed)}
          >
            {!chatCollapsed && <PageHeader title="Chat" />}

            <div className="chat-container" style={WRAPPER_PADDING}>
              <Space direction="vertical" style={{ overflowY: "scroll" }}>
                {messages.map((message) => (
                  <MessageDisplay message={message} />
                ))}
              </Space>
              <div className="chat-input">
                <Divider />
                <Input.TextArea
                  value={draftMessage}
                  rows={2}
                  onChange={(e) => setDraftMessage(e.target.value)}
                  onPressEnter={(_e) => onSendMessage()}
                  onSubmit={(_e) => onSendMessage()}
                  placeholder="Type here..."
                  autoFocus
                  bordered={false}
                />
              </div>
            </div>
          </Sider>
        )}
      </Layout>
    );
  }
);

export default connector(CallBase);
