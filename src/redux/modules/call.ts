import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import camelcaseKeys from "camelcase-keys";
import { fetchAuthenticated } from "src/api/Common";
import { Call } from "src/types/Call";

export const fetchCalls = createAsyncThunk("calls/fetchAll", async () => {
  const body = await fetchAuthenticated(`calls`);
  if (body.status !== 200) {
    throw body;
  }

  const calls = ((body.data as Record<string, unknown>)
    .calls as Call[]).map((call) => camelcaseKeys(call));

  return calls;
});

export const callAdapter = createEntityAdapter<Call>();

export const callSlice = createSlice({
  name: "calls",
  initialState: callAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCalls.fulfilled, (state, action) =>
      callAdapter.setAll(state, action.payload)
    );
  },
});

export const callActions = callSlice.actions;
