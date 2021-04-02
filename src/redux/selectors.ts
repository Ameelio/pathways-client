import { RootState } from ".";
import { callAdapter } from "./modules/call";
import { connectionAdapter } from "./modules/connection";
import { contactsAdapter } from "./modules/contactsSlice";
import { BaseCall, Call } from "src/types/Call";
import { notEmpty } from "src/utils/utils";

// get selectors from entity adapter
export const {
  selectAll: selectAllCalls,
  selectById: selectCallById,
} = callAdapter.getSelectors<RootState>((state) => state.calls);

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById,
} = contactsAdapter.getSelectors<RootState>((state) => state.contacts);

const getCallEntities = (
  state: RootState,
  call: BaseCall
): Call | undefined => {
  const connection = selectContactById(state, call.connectionId);
  if (!connection) return;

  // TODO add kiosk info soon
  // const kiosk = selectKioskById(state, call.kioskId);
  // if (!kiosk) return;

  return call;
};

export const selectAllCallInfo = (state: RootState, callId: number) => {
  const plainCall = selectCallById(state, callId);
  if (!plainCall) return;
  return getCallEntities(state, plainCall) as Call;
};

export const selectUpcomingCalls = (state: RootState) => {
  return selectAllCalls(state)
    .map((call) => selectAllCallInfo(state, call.id))
    .filter(notEmpty)
    .filter((call) => call.status !== "ended" && call.status !== "terminated");
};

export const selectEndedCalls = (state: RootState) => {
  return selectAllCalls(state).filter(
    (call) => call.status === "ended" || call.status === "terminated"
  );
};
