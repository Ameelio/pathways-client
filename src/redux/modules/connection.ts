import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import camelcaseKeys from "camelcase-keys";
import { Connection } from "src/types/Connection";
import { fetchAuthenticated } from "src/api/Common";
import { showToast } from "src/utils";
import i18n from "src/i18n/config";

const FETCH_CONNECTIONS = "connections/fetchAll";
export const fetchConnections = createAsyncThunk(
  FETCH_CONNECTIONS,
  async () => {
    const body = await fetchAuthenticated(`connections`);
    const connections = ((body.data as Record<string, unknown>)
      .connections as Connection[]).map((inmate) => camelcaseKeys(inmate));

    return connections;
  }
);

export const connectionAdapter = createEntityAdapter<Connection>();

export const connectionSlice = createSlice({
  name: "connection",
  initialState: connectionAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConnections.fulfilled, (state, action) => {
      connectionAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchConnections.rejected, () =>
      showToast(
        FETCH_CONNECTIONS,
        i18n.t("api.fetchConnections", { ns: "error" }),
        "error"
      )
    );
  },
});

export const connectionActions = connectionSlice.actions;
