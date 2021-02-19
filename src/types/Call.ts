import { Connection } from "./Connection";

export interface Kiosk {
  id: number;
}

export interface BaseCall {
  id: number;
  start: number;
  end: number;
  approved: boolean;
  status: "ended" | "scheduled" | "terminated" | "rescheduled" | "live";
  connectionId: number;
  kioskId: number;
}

export interface Call extends BaseCall {
  connection: Connection;
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
