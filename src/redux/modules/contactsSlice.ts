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
      contactsAdapter.setAll(state, action.payload);
    });
  },
});
