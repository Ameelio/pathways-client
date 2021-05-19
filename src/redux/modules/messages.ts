import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityState,
} from "@reduxjs/toolkit";
import { fetchAuthenticated, UUID } from "src/api/Common";
import { showToast } from "src/utils";
import i18n from "src/i18n/config";
import { BaseChat, ChatMessage } from "src/types/Chat";

const FETCH_CHATS = "chatMessages/fetchAll";
const FETCH_CHAT_MESSAGES = "chatMessages/fetch";
const POST_CHAT_MESSAGE = "chatMessages/post";

export const fetchChats = createAsyncThunk(FETCH_CHATS, async () => {
  const body = await fetchAuthenticated(`chats`);
  const chats = (body.data as Record<string, unknown>).results as BaseChat[];

  return chats;
});

export const fetchChatMessages = createAsyncThunk(
  FETCH_CHAT_MESSAGES,
  async (chatId: UUID) => {
    const body = await fetchAuthenticated(`chats/${chatId}/messages`);
    const messages = (body.data as Record<string, unknown>)
      .results as ChatMessage[];
    return { chatId, messages };
  }
);

export const createChatMessage = createAsyncThunk(
  POST_CHAT_MESSAGE,
  async ({ chatId, contents }: { chatId: UUID; contents: string }) => {
    const body = await fetchAuthenticated(`chats/${chatId}/messages`, {
      method: "POST",
      body: contents,
    });
    const newMessage = body.data as ChatMessage;
    return newMessage;
  }
);

export const chatMessagesAdapter = createEntityAdapter<BaseChat>();

type ChatState = EntityState<BaseChat> & {
  messages: Record<UUID, ChatMessage[]>;
};

const initialState: ChatState = {
  ...chatMessagesAdapter.getInitialState(),
  messages: {},
};

export const chatMessageSlice = createSlice({
  name: "chatMessages",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      chatMessagesAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchChats.rejected, () =>
      showToast(FETCH_CHATS, i18n.t("api.fetchChats", { ns: "error" }), "error")
    );

    builder.addCase(fetchChatMessages.fulfilled, (state, action) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] =
        chatId in state.messages
          ? [...state.messages[chatId], ...messages]
          : messages;
    });

    builder.addCase(createChatMessage.fulfilled, (state, action) => {
      const message = action.payload;
      // are all objects created when this happens?
      state.messages[message.chatId] = [...state.messages[message.chatId]];
    });
  },
});
