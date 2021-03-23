import * as mediasoupClient from "mediasoup-client";
import { Transport } from "mediasoup-client/lib/types";
import { MediaType } from "src/types/Call";
import { getMedia } from "src/utils";
/*
  Copyright 2020 Ameelio.org.
  Published under the GPL v3.

  You can obtain a copy of the GPL v3 at:
  https://www.gnu.org/licenses/gpl-3.0.en.html

  This file was inspired by code from https://github.com/Dirvann/mediasoup-sfu-webrtc-video-rooms,
  which was published under the Apache License.
  Copyright 2020 github.com/Dirvann.

  You can obtain a copy of the Apache License at:
  http://www.apache.org/licenses/LICENSE-2.0

  This file was substantially modified by Ameelio to streamline
  the signalling protocol and change the structure of how a RoomClient
  is initialized and what events it exposes for easier use by
  Ameelio's client-side code, and to refactor and restructure the code
  for easier maintainenance, among other changes.
*/
// window.rc = null;
// window.consumers = [];
// window.producers = [];

const config = {
  video: {
    width: { min: 640, ideal: 1920 },
    height: { min: 400, ideal: 1080 },
    encodings: [
      {
        rid: "r0",
        maxBitrate: 100000,
        scalabilityMode: "S1T3",
      },
      {
        rid: "r1",
        maxBitrate: 300000,
        scalabilityMode: "S1T3",
      },
      {
        rid: "r2",
        maxBitrate: 900000,
        scalabilityMode: "S1T3",
      },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  },
};

// function getMediaConstraints(
//   type: MediaType,
//   deviceId?: number
// ): MediaStreamConstraints {
//   if (type === "audio") {
//     return { audio: true };
//   } else {
//     return {
//       video: true,
//     };
//   }
// }

export async function stopStream(stream: MediaStream) {
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
}

class RoomClient {
  private callId: number;
  private producerTransport: Transport | null;
  private consumerTransport: Transport | null;
  private device: mediasoupClient.Device | null;
  private consumers: Record<string, mediasoupClient.types.Consumer>;
  private producers: Record<string, mediasoupClient.types.Producer>;
  private handlers: Record<string, ((...args: unknown[]) => void)[]>;

  public socket: SocketIOClient.Socket;

  constructor(socket: SocketIOClient.Socket, callId: number) {
    this.socket = socket;
    this.callId = callId;

    this.producerTransport = null;
    this.consumerTransport = null;

    this.device = null;

    this.consumers = {};
    this.producers = {};

    this.handlers = { consume: [] };
  }

  async request(name: string, data: unknown): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit(name, data, (response: any) => {
        if (response.error) reject(response.error);
        else resolve(response);
      });
    });
  }

  async handleTransportConnect(transport: Transport) {
    return new Promise((resolve: (value?: unknown) => void, reject) => {
      // Wait for the producer transport to connect...
      transport.on(
        "connect",
        async ({ dtlsParameters }, callback: () => void, errback) => {
          await this.request("establishDtls", {
            dtlsParameters,
            callId: this.callId,
            transportId: transport.id,
          });
          callback();
          resolve();
        }
      );
    });
  }

  async init() {
    // Request to join the room.
    const {
      producerTransportInfo,
      consumerTransportInfo,
      routerRtpCapabilities,
    } = await this.request("join", { callId: this.callId });

    // Load up a local media device consistent with server
    this.device = await this.loadDevice(routerRtpCapabilities);
    if (!this.device) return;

    // Set up both transports and promise to send
    // dtls info when they connect (this won't occur until
    // someone actually produces).
    if (producerTransportInfo) {
      this.producerTransport = this.device.createSendTransport(
        producerTransportInfo
      );
      this.handleTransportConnect(this.producerTransport);
    }

    this.consumerTransport = this.device.createRecvTransport(
      consumerTransportInfo
    );
    this.handleTransportConnect(this.consumerTransport);

    // Declare what our device is capable of.
    await this.request("declareRtpCapabilities", {
      rtpCapabilities: this.device.rtpCapabilities,
    });

    // We don't actually need to wait for this request to come back.
    this.request("finishConnecting", { callId: this.callId });

    // When our producer transport is producing a new stream,
    // inform the server.
    if (this.producerTransport) {
      this.producerTransport.on(
        "produce",
        async ({ kind, rtpParameters }, callback, errback) => {
          const { producerId } = await this.request("produce", {
            callId: this.callId,
            kind,
            rtpParameters,
          });

          callback({ id: producerId });
        }
      );
    }

    // When we get a consumer, fire an event.
    this.socket.on("consume", async (info: any) => {
      const consumeResult = await this.consume(info);
      if (!consumeResult) return;
      const { consumer, stream } = consumeResult;
      this.socket.emit("resumeConsumer", {
        callId: this.callId,
        consumerId: consumer.id,
      });
      this.handlers["consume"].forEach((f) => f(info.kind, stream, info.user));
    });
  }

  async produce(
    type: MediaType,
    deviceId?: number
  ): Promise<MediaStream | null> {
    if (!this.producerTransport) return null;
    const stream = await getMedia(type, deviceId);

    const track = (type === "audio"
      ? stream.getAudioTracks()
      : stream.getVideoTracks())[0];

    const params: any = { track };

    if (type === "video") {
      params.encodings = config.video.encodings;
      params.codecOptions = config.video.codecOptions;
    }

    const producer = await this.producerTransport.produce(params);
    this.producers[producer.id] = producer;
    return stream;
  }

  async loadDevice(
    routerRtpCapabilities: mediasoupClient.types.RtpCapabilities
  ) {
    const device = new mediasoupClient.Device();

    await device.load({ routerRtpCapabilities });

    return device;
  }

  async consume(info: mediasoupClient.types.ConsumerOptions) {
    if (!this.consumerTransport) return;
    const consumer = await this.consumerTransport.consume(info);
    const stream = new MediaStream([consumer.track]);
    this.consumers[consumer.id] = consumer;
    return { consumer, stream };
  }

  async on(event: string, fn: (...args: any) => void) {
    if (!(event in this.handlers)) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(fn);
  }

  async terminate() {
    await this.request("terminate", { callId: this.callId });
  }

  async pauseVideo() {
    Object.values(this.producers)?.forEach((producer) => {
      if (producer.kind === "video") {
        producer.pause();
        this.socket.emit("producerUpdate", {
          callId: this.callId,
          contents: {
            producerId: producer.id,
            active: false,
            type: "video",
          },
        });
      }
    });
    this.handlers["pauseVideo"].forEach((f) => f());
  }

  async resumeVideo() {
    Object.values(this.producers)?.forEach((producer) => {
      if (producer.kind === "video") {
        producer.resume();
        this.socket.emit("producerUpdate", {
          callId: this.callId,
          contents: {
            producerId: producer.id,
            active: true,
            type: "video",
          },
        });
      }
    });
    this.handlers["resumeVideo"].forEach((f) => f());
  }

  async pauseAudio() {
    Object.values(this.producers)?.forEach((producer) => {
      if (producer.kind === "audio") {
        producer.pause();
        this.socket.emit("producerUpdate", {
          callId: this.callId,
          contents: {
            producerId: producer.id,
            active: false,
            type: "audio",
          },
        });
      }
    });
    this.handlers["pauseAudio"].forEach((f) => f());
  }

  async resumeAudio() {
    Object.values(this.producers)?.forEach((producer) => {
      if (producer.kind === "audio") {
        producer.resume();
        this.socket.emit("producerUpdate", {
          callId: this.callId,
          contents: {
            producerId: producer.id,
            active: true,
            type: "audio",
          },
        });
      }
    });
    this.handlers["resumeAudio"].forEach((f) => f());
  }

  async destroy() {
    this.socket.off("connect");
    this.socket.off("consume");
    this.socket.off("textMessage");
    this.socket.close();

    if (this.consumerTransport) this.consumerTransport.close();
    if (this.producerTransport) this.producerTransport.close();
    this.consumerTransport = null;
    this.producerTransport = null;

    Object.values(this.producers).forEach((producer) => {
      producer.close();
    });
    Object.values(this.consumers).forEach((consumer) => {
      consumer.close();
    });
    this.consumers = {};
    this.producers = {};

    this.handlers = {};
  }
}

export default RoomClient;
