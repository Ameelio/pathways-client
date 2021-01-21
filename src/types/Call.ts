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
