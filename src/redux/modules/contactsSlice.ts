import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import camelcaseKeys from "camelcase-keys";
import { fetchAuthenticated } from "src/api/Common";
import { Contact } from "src/types/User";

export const contactsAdapter = createEntityAdapter<Contact>();

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const body = await fetchAuthenticated(`contacts`);
  const contacts = ((body.data as Record<string, unknown>)
    .contacts as Contact[]).map((inmate) => camelcaseKeys(inmate));

  return contacts;
});

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      console.log("hi here in contact adapter");
      console.log(action);
      contactsAdapter.setAll(state, action.payload);
      //   const connections = action.payload
      //   const contacts = connections.map(connection => {
      //       return {
      //           ...connection.user,
      //           connection: connection.id
      //       }
      //   })
      //   const calls = action.payload
      //   const contacts = calls.map(call.user => )
      // connectionAdapter.setAll(state, action.payload);
    });
  },
});
