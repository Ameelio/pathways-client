import { Contact } from "./User";

export interface Kiosk {
  id: number;
  name: string;
  description: string;
}

export interface CallHandler {
  host: string;
  port: string;
}

export interface BaseCall {
  id: number;
  scheduledStart: Date;
  scheduledEnd: Date;
  approved: boolean;
  status: "ended" | "scheduled" | "terminated" | "rescheduled" | "live";
  connectionId: number;
  userIds: number[];
  kioskId: number;
  videoHandler?: CallHandler;
}

export interface Call extends BaseCall {
  // TODO: load facility kiosks and load kiosk information here
  // https://github.com/Ameelio/pathways-client/issues/31
  kiosk?: Kiosk;
  userParticipants: Contact[];
}

export interface CallParticipant {
  type: "doc" | "inmate" | "user";
  id: number;
}

export interface CallMessage {
  callId: number;
  senderId: number;
  senderType: "inmate" | "user" | "doc";
  contents: string;
  createdAt: string; // ISO string
  status: "success" | "error" | "sending";
}

export interface ControlledStream {
  stream: MediaStream;
  paused: boolean;
}

export type MediaType = "video" | "audio";
