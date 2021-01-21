import { RootState } from ".";
import { callAdapter } from "./modules/call";
import { connectionAdapter } from "./modules/connection";

// get selectors from entity adapter
export const {
  selectAll: selectAllCalls,
  selectById: selectCallById,
} = callAdapter.getSelectors<RootState>((state) => state.calls);

export const {
  selectAll: selectAllConnections,
  selectById: selectConnectionById,
} = connectionAdapter.getSelectors<RootState>((state) => state.connections);
