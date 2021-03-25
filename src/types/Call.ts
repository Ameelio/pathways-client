import { Connection } from "./Connection";
import { User } from "./User";

export interface Kiosk {
  id: number;
}

export interface BaseCall {
  id: number;
  scheduledStart: Date;
  scheduledEnd: Date;
  approved: boolean;
  status: "ended" | "scheduled" | "terminated" | "rescheduled" | "live";
  connectionId: number;
  userParticipants: User[];
  kioskId: number;
}

export interface Call extends BaseCall {
  // connection: Connection;
  kiosk?: Kiosk;
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
