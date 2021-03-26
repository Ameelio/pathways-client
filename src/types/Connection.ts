import { Contact } from "./User";

export interface Connection {
  id: number;
  userId: number;
  inmateId: number;
  status: string;
  statusDetails: string;
  relationship: string;
  user: Contact;
  lastCall: {
    id: number;
    scheduledStart: Date;
    scheduledEnd: Date;
  };
}
