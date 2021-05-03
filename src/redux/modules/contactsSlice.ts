import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import camelcaseKeys from "camelcase-keys";
import { fetchAuthenticated } from "src/api/Common";
import i18n from "src/i18n/config";
import { Contact } from "src/types/User";
import { showToast } from "src/utils";

export const contactsAdapter = createEntityAdapter<Contact>();

const FETCH_CONTACTS = "contacts/fetchAll";
export const fetchContacts = createAsyncThunk(FETCH_CONTACTS, async () => {
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
    builder.addCase(fetchContacts.rejected, () =>
      showToast(
        FETCH_CONTACTS,
        i18n.t("api.fetchContacts", { ns: "error" }),
        "error"
      )
    );
  },
});
