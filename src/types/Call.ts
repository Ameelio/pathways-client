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

export type ISOString = string;

export type InCallStatus = "live" | "missing_monitor" | "ended" | "terminated";
type GeneralCallStatus =
  | "ended"
  | "scheduled"
  | "terminated"
  | "live"
  | "pending_approval"
  | "cancelled"
  | "rejected"
  | "no_show";

export type CallStatus = InCallStatus | GeneralCallStatus;

export interface BaseCall {
  id: number;
  scheduledStart: ISOString;
  scheduledEnd: ISOString;
  approved: boolean;
  status: CallStatus;
  connectionId: number;
  statusDetails: string;
  userIds: number[];
  kioskId: number;
  kioskName: string;
  videoHandler?: CallHandler;
}

export interface Call extends BaseCall {
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
