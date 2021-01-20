import { RootState } from ".";
import { callAdapter } from "./modules/call";

// get selectors from entity adapter
export const {
  selectAll: selectAllCalls,
  selectById: selectCallById,
} = callAdapter.getSelectors<RootState>((state) => state.calls);
