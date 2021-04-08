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
  type: "monitor" | "inmate" | "user";
  id: number;
}

export interface CallMessage {
  content: string;
  from: CallParticipant;
  timestamp: string;
}

export interface ControlledStream {
  stream: MediaStream;
  paused: boolean;
}

export type MediaType = "video" | "audio";
