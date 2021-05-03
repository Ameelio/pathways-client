import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchAuthenticated } from "src/api/Common";
import RoomClient from "src/pages/Call/RoomClient";
import {
  BaseCall,
  CallHandler,
  CallParticipant,
  ControlledStream,
  CallStatus,
  InCallStatus,
} from "src/types/Call";
import { ThunkApi } from "../helper";
import io from "socket.io-client";
import { showToast } from "src/utils";
import { AuthInfo } from "src/types/Session";

export const fetchCalls = createAsyncThunk("calls/fetchAll", async () => {
  const body = await fetchAuthenticated(`calls`);

  const calls = (body.data as { results: BaseCall[] }).results;

  return calls;
});

export const cancelCall = createAsyncThunk(
  "calls/cancelCall",
  async ({ id, reason }: { id: number; reason: string }) => {
    await fetchAuthenticated(`calls/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ statusDetails: reason }),
    });

    return {
      id,
      changes: { statusDetails: reason, status: "cancelled" as CallStatus },
    };
  }
);

export const initializeVisit = createAsyncThunk(
  "visit/initializeVisit",
  async ({
    callId,
    setRc,
    authInfo,
    videoHandler,
  }: {
    callId: number;
    authInfo: AuthInfo;
    setRc: (rc: RoomClient) => void;
    videoHandler: CallHandler;
  }) => {
    const socket = io.connect(
      process.env.NODE_ENV === "production"
        ? `https://${videoHandler.host}`
        : `https://${videoHandler.host}:${videoHandler.port}`,
      {
        transports: ["websocket"],
      }
    );
    if (!socket.connected) {
      await new Promise((resolve) => socket.on("connect", resolve));
    }
    console.log("connected");
    await new Promise((resolve) => {
      socket.emit("authenticate", authInfo, resolve);
    });
    console.log("authenticated");
    const rc = new RoomClient(socket, callId);
    await rc.init();
    setRc(rc);
    return {
      callId,
    };
  }
);

export const initializeProducers = createAsyncThunk<
  void,
  {
    rc: RoomClient;
    setLocalAudio: React.Dispatch<
      React.SetStateAction<ControlledStream | undefined>
    >;
    setLocalVideo: React.Dispatch<
      React.SetStateAction<ControlledStream | undefined>
    >;
    setRc: (rc: RoomClient) => void;
  },
  ThunkApi
>(
  "visit/initializeProducers",
  async ({ rc, setLocalAudio, setLocalVideo, setRc }) => {
    const [videoStream, audioStream] = await Promise.all([
      rc.produce("video"),
      rc.produce("audio"),
    ]);

    if (!videoStream) throw Error("Unable to produce video");
    if (!audioStream) throw Error("Unable to produce audio");

    setLocalAudio({
      stream: audioStream,
      paused: false,
    });
    setLocalVideo({
      stream: videoStream,
      paused: false,
    });
    rc.on("pauseVideo", () => {
      setLocalVideo((cs) => {
        if (cs) {
          return {
            stream: cs.stream,
            paused: true,
          };
        }
      });
    });
    rc.on("resumeVideo", () => {
      setLocalVideo((cs) => {
        if (cs) {
          return {
            stream: cs.stream,
            paused: false,
          };
        }
      });
    });
    rc.on("pauseAudio", () => {
      setLocalAudio((cs) => {
        if (cs) {
          return {
            stream: cs.stream,
            paused: true,
          };
        }
      });
    });
    rc.on("resumeAudio", () => {
      setLocalAudio((cs) => {
        if (cs) {
          return {
            stream: cs.stream,
            paused: false,
          };
        }
      });
    });
    // update room client object
    setRc(rc);
  }
);

export const initializeRemotes = createAsyncThunk<
  void,
  {
    rc: RoomClient;
    setRemoteAudios: React.Dispatch<
      React.SetStateAction<Record<number, MediaStream>>
    >;
    setRemoteVideos: React.Dispatch<
      React.SetStateAction<Record<number, MediaStream>>
    >;
  },
  ThunkApi
>(
  "visit/initializeRemotes",
  async ({ rc, setRemoteAudios, setRemoteVideos }) => {
    rc.on(
      "consume",
      async (kind: string, stream: MediaStream, user: CallParticipant) => {
        console.log("got consume of ", kind, " from user", user);
        if (user.type !== "user") return;
        if (kind === "audio") {
          setRemoteAudios((existing) => {
            const newStreams = { ...existing };
            newStreams[user.id] = stream;
            return newStreams;
          });
        }
        if (kind === "video") {
          setRemoteVideos((existing) => {
            const newStreams = { ...existing };
            newStreams[user.id] = stream;
            return newStreams;
          });
        }
      }
    );
  }
);

export const callAdapter = createEntityAdapter<BaseCall>();

export const callSlice = createSlice({
  name: "calls",
  initialState: callAdapter.getInitialState(),
  reducers: {
    updateCallStatus: (
      state,
      action: PayloadAction<{ id: number; status: InCallStatus }>
    ) => {
      callAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { status: action.payload.status },
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCalls.fulfilled, (state, action) =>
      callAdapter.setAll(state, action.payload)
    );
    builder.addCase(initializeVisit.rejected, () =>
      showToast("initializeVisit", "Failed to initialize call.", "error")
    );
    builder.addCase(initializeProducers.rejected, () =>
      showToast(
        "initializeProducers",
        "Failed to initialize local streams.",
        "error"
      )
    );
    builder.addCase(initializeRemotes.rejected, () =>
      showToast("initializeProducers", "Failed to initialize remotes.", "error")
    );
    builder.addCase(cancelCall.fulfilled, (state, action) => {
      callAdapter.updateOne(state, action.payload);
      showToast("cancelCall", "Successfully cancelled call.", "success");
    });
    builder.addCase(cancelCall.rejected, () =>
      showToast("cancelCall", "Failed to cancel call.", "error")
    );
  },
});

export const { updateCallStatus } = callSlice.actions;
