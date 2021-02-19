import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  Avatar,
  Badge,
} from "antd";
import { CallMessage, CallParticipant } from "src/types/Call";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { selectAllCallInfo } from "src/redux/selectors";
import "./index.css";
import {
  AudioMutedOutlined,
  AudioOutlined,
  MessageOutlined,
  PoweroffOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { useUserMedia } from "./useUserMedia";
import { push } from "connected-react-router";
import { WRAPPER_PADDING } from "src/utils/constants";
import {
  genFullName,
  getInitials,
  openNotificationWithIcon,
  showToast,
} from "src/utils/utils";

const { Sider } = Layout;
declare global {
  interface Window {
    Debug: any;
  }
}

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

type TParams = { id: string };

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<TParams>
) => ({
  call: selectAllCallInfo(state, parseInt(ownProps.match.params.id)),
  authInfo: state.session.authInfo,
  initials: getInitials(genFullName(state.session.user)),
});

const mapDispatchToProps = { push };
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const CallBase: React.FC<PropsFromRedux> = React.memo(
  ({ call, authInfo, push, initials }) => {
    const [isAuthed, setIsAuthed] = useState(false);
    const [rc, setRc] = useState<RoomClient>();
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const [showOverlay, setShowOverlay] = useState(true);
    const [participantHasJoined, setParticipantHasJoined] = useState(false);
    const [chatCollapsed, setChatCollapsed] = useState(false);
    const mediaStream = useUserMedia(CAPTURE_OPTIONS);
    const [draftMessage, setDraftMessage] = useState("");
    const [messages, setMessages] = useState<CallMessage[]>([]);
    const [audioOn, setAudioOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [peerAudioOn, setPeerAudioOn] = useState(true);
    const [peerVideoOn, setPeerVideoOn] = useState(true);

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

    // TODO fix this
    useEffect(() => {
      if (rc && isAuthed) {
        console.log("listening to text message");
        rc.socket.on(
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
              openNotificationWithIcon("DOC Warning", contents, "warning");
            }
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

        rc.socket.on(
          "peerUpdate",
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
    }, [isAuthed, rc]);

    useEffect(() => {
      if (!chatCollapsed) setHasUnreadMessages(false);
    }, [hasUnreadMessages, chatCollapsed]);

    useEffect(() => {
      if (call && participantHasJoined)
        showToast(
          "peerVideo",
          `${call.connection.user.firstName} turned ${
            peerVideoOn ? "on" : "off"
          } their video`,
          "info"
        );
    }, [peerVideoOn, call, participantHasJoined]);

    useEffect(() => {
      if (call && participantHasJoined)
        showToast(
          "peerAudio",
          `${call.connection.user.firstName} ${
            peerAudioOn ? "unmuted" : "muted`"
          } their microphone`,
          "info"
        );
    }, [peerAudioOn, call, participantHasJoined]);

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
          `${call.connection.user.firstName} joined the call.`,
          "Your call will connect soon.",
          "info"
        );
    }, [participantHasJoined, call]);

    if (!call) return <div />;

    const getMessage = (): string => {
      if (!isAuthed) {
        return "Initializing video call...";
      } else if (!participantHasJoined) {
        return `Waiting for ${call.connection.user.firstName} to join the call...`;
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
          onMouseOver={() => onMouseMove()}
        >
          {!peerVideoOn && (
            <div className="vh-100 vw-100 d-flex">
              <Avatar
                size={128}
                style={{
                  color: "#fff",
                  backgroundColor: "#00a2ae",
                  margin: "auto",
                }}
              >
                {getInitials(genFullName(call.connection.user)).toUpperCase()}
              </Avatar>
            </div>
          )}
          {!peerAudioOn && (
            <div className="peer-name-container">
              <AudioMutedOutlined className="peer-muted-audio" />
              <Typography.Text style={{ color: "white", fontSize: 16 }}>
                {" "}
                {genFullName(call.connection.user)}
              </Typography.Text>
            </div>
          )}
          {videoOn ? (
            <video className="video-me" autoPlay={true} ref={meRef} />
          ) : (
            <div className="video-me" style={{ backgroundColor: "black" }}>
              <Avatar
                size={64}
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  margin: "auto",
                }}
              >
                {initials}
              </Avatar>
            </div>
          )}
          {!participantHasJoined && <Loader message={getMessage()} />}
          {showOverlay && (
            <Space
              className="video-overlay-actions"
              align="center"
              size="large"
            >
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
                  audioOn ? rc?.muteAudio() : rc?.unmuteAudio();
                  showToast(
                    "microphone",
                    `You ${audioOn ? "muted" : "unmuted"} your microphone`,
                    "info"
                  );
                  setAudioOn((audioOn) => !audioOn);
                }}
              />
              <Button
                shape="round"
                icon={<PoweroffOutlined color="red" />}
                size="large"
                onClick={() => push(`/feedback/${call?.id}`)}
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
                  videoOn ? rc?.disableWebcam() : rc?.enableWebcam();
                  showToast(
                    "webcam",
                    `You ${videoOn ? "turned off" : "turned on"} your webcam`,
                    "info"
                  );
                  setVideoOn((isVideoOn) => !isVideoOn);
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
                onClick={() => {
                  if (chatCollapsed) setHasUnreadMessages(false);
                  setChatCollapsed((collapsed) => !collapsed);
                }}
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

            {!chatCollapsed && (
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
            )}
          </Sider>
        )}
      </Layout>
    );
  }
);

export default connector(CallBase);
