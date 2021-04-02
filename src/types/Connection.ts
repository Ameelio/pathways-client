export interface Connection {
  id: number;
  userId: number;
  inmateId: number;
  status: string;
  statusDetails: string;
  relationship: string;
  lastCall: {
    id: number;
    scheduledStart: Date;
    scheduledEnd: Date;
  };
}
