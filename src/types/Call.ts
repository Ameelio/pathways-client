export interface Kiosk {
  id: number;
}

export interface Call {
  id: number;
  start: number;
  end: number;
  approved: boolean;
  status: "ended" | "scheduled" | "terminated" | "rescheduled" | "live";
  connectionId: number;
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
