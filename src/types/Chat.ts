import { Contact } from "./User";

export interface ChatMessage {
  chatId: string;
  senderId: string;
  senderType: "inmate" | "user";
  contents: string;
  createdAt: string; // ISO string
  status: "success" | "error" | "sending";
}

export interface BaseChat {
  id: string;
  contactIds: string[];
}

export interface Chat extends BaseChat {
  contacts: Contact[];
  messages: ChatMessage[];
}
