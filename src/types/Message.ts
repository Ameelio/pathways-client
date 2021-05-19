export interface BaseMessage {
  senderId: string;
  senderType: "inmate" | "user" | "doc";
  contents: string;
  createdAt: string; // ISO string
  status: "success" | "error" | "sending";
}

export interface CallMessage extends BaseMessage {
  callId: string;
}

export interface ChatMesssage extends BaseMessage {
  chatId: string;
}
