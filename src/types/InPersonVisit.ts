import { Contact } from "./User";

export type ISOString = string;

export type InPersonVisitStatus =
  | "ended"
  | "scheduled"
  | "terminated"
  | "live"
  | "pending_approval"
  | "cancelled"
  | "rejected"
  | "no_show";

export interface BaseInPersonVisit {
  id: string;
  scheduledStart: ISOString;
  scheduledEnd: ISOString;
  approved: boolean;
  status: InPersonVisitStatus;
  connectionId: string;
  statusDetails: string;
  userIds: string[];
  kioskId: string;
  kioskName: string;
}

export interface InPersonVisit extends BaseInPersonVisit {
  userParticipants: Contact[];
}
