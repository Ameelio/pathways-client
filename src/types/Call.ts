import { Contact } from "./User";
import { BaseVisit } from "./Visit";

export interface Kiosk {
  id: string;
  name: string;
  description: string;
}

export interface CallHandler {
  host: string;
  port: string;
}

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

export interface BaseCall extends BaseVisit {
  status: CallStatus;
  videoHandler?: CallHandler;
}

export interface Call extends BaseCall {
  // userParticipants: Contact[];
}

export interface CallParticipant {
  type: "doc" | "inmate" | "user";
  id: string;
}

export interface ControlledStream {
  stream: MediaStream;
  paused: boolean;
}

export type MediaType = "video" | "audio";
