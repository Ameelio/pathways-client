import { RootState } from ".";
import { callAdapter } from "./modules/call";
import { connectionAdapter } from "./modules/connection";
import { BaseCall, Call } from "src/types/Call";
import { notEmpty } from "src/utils/utils";
// get selectors from entity adapter
export const {
  selectAll: selectAllCalls,
  selectById: selectCallById,
} = callAdapter.getSelectors<RootState>((state) => state.calls);

export const {
  selectAll: selectAllConnections,
  selectById: selectConnectionById,
} = connectionAdapter.getSelectors<RootState>((state) => state.connections);

const getCallEntities = (
  state: RootState,
  call: BaseCall
): Call | undefined => {
  const connection = selectConnectionById(state, call.connectionId);
  if (!connection) return;

  // TODO add kiosk info soon
  // const kiosk = selectKioskById(state, call.kioskId);
  // if (!kiosk) return;

  return { ...call, connection };
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
