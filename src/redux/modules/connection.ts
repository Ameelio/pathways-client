import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import camelcaseKeys from "camelcase-keys";
import { Connection } from "src/types/Connection";
import { fetchAuthenticated } from "src/api/Common";

export const fetchConnections = createAsyncThunk(
  "connections/fetchAll",
  async () => {
    const body = await fetchAuthenticated(`connections`);
    console.log("hey");
    console.log(body);
    if (!body.data) {
      throw body;
    }

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
  },
});

export const connectionActions = connectionSlice.actions;
