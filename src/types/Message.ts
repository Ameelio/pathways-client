export interface BaseMessage {
  senderId: number;
  senderType: "inmate" | "user" | "doc";
  contents: string;
  createdAt: string; // ISO string
  status: "success" | "error" | "sending";
}

export interface CallMessage extends BaseMessage {
  callId: number;
}

export interface ChatMesssage extends BaseMessage {
  chatId: number;
}
