import { Connection } from "./Connection";

export interface BasePersona {
  id: string;
  firstName: string;
  lastName: string;
  profileImagePath?: string;
}

export interface User extends BasePersona {
  inmateIdentification: string;
  dateOfBirth: string;
  quota: number;
  location: string;
  race: string;
  needsApproval: boolean;
  needsMonitor: boolean;
}

export interface Contact extends BasePersona {
  email: string;
  status: string;
  statusDetails: string;
  relationship: string;
  lastCallId?: number;
}
