import { Contact } from "./User";

export type ISOString = string;

export type VisitType = {
  name: string;
  category: "call" | "in_person_visit";
};

export interface BaseVisit {
  id: string;
  scheduledStart: ISOString;
  scheduledEnd: ISOString;
  approved: boolean;
  connectionId: string;
  statusDetails: string;
  userIds: string[];
  kioskId: string;
  kioskName: string;
  visitType: VisitType;
  userParticipants: Contact[];
}
