import { Contact } from "./User";
import { BaseVisit } from "./Visit";

export type InPersonVisitStatus =
  | "ended"
  | "scheduled"
  | "terminated"
  | "live"
  | "pending_approval"
  | "cancelled"
  | "rejected"
  | "no_show";

export interface BaseInPersonVisit extends BaseVisit {
  status: InPersonVisitStatus;
}

export interface InPersonVisit extends BaseInPersonVisit {
  userParticipants: Contact[];
}
