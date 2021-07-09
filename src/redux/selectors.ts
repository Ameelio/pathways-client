import { RootState } from ".";
import { callAdapter } from "./modules/call";
import { contactsAdapter } from "./modules/contactsSlice";
import { BaseCall } from "src/types/Call";
import { createSelector } from "reselect";
import { chatMessagesAdapter } from "./modules/messages";
import { inPersonVisitAdapter } from "./modules/inPersonVisit";

// Create aliases for entity adapter selectors
export const {
  selectAll: selectAllCalls,
  selectById: selectCallById,
} = callAdapter.getSelectors<RootState>((state) => state.calls);

export const {
  selectAll: selectAllInPersonVisits,
  selectById: selectInPersonVisitById,
} = inPersonVisitAdapter.getSelectors<RootState>(
  (state) => state.inPersonVisits
);

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById,
  selectEntities: selectContactEntities,
} = contactsAdapter.getSelectors<RootState>((state) => state.contacts);

export const {
  selectAll: selectAllBaseChats,
} = chatMessagesAdapter.getSelectors<RootState>((state) => state.chats);

export const selectUpcomingCalls = createSelector(
  selectAllCalls,
  (baseCalls: BaseCall[]) =>
    baseCalls.filter(
      (call) => call.status !== "ended" && call.status !== "terminated"
    )
);

export const selectEndedCalls = createSelector(
  selectAllCalls,
  (baseCalls: BaseCall[]) =>
    baseCalls.filter(
      (call) => call.status === "ended" || call.status === "terminated"
    )
);
