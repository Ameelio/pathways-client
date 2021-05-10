import { Contact } from "./User";

export interface ChatMessage {
  chatId: number;
  senderId: number;
  senderType: "inmate" | "user";
  contents: string;
  createdAt: string; // ISO string
  status: "success" | "error" | "sending";
}

export interface BaseChat {
  id: number;
  contactIds: number[];
}

export interface Chat extends BaseChat {
  contacts: Contact[];
  messages: ChatMessage[];
}
