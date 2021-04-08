import { RootState } from ".";
import { callAdapter } from "./modules/call";
import { contactsAdapter } from "./modules/contactsSlice";
import { BaseCall } from "src/types/Call";
import { createSelector } from "reselect";

// get selectors from entity adapter
export const {
  selectAll: selectAllCalls,
  selectById: selectCallById,
} = callAdapter.getSelectors<RootState>((state) => state.calls);

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById,
  selectEntities: selectContactEntities,
} = contactsAdapter.getSelectors<RootState>((state) => state.contacts);

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
