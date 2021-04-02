import { Connection } from "./Connection";

export interface BasePersona {
  id: number;
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
}

export interface Contact extends BasePersona {
  email: string;
  status: string;
  statusDetails: string;
  relationship: string;
  lastCall: {
    id: number;
    scheduledStart: Date;
    scheduledEnd: Date;
  };
}
