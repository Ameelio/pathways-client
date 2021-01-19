import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Inmate } from "src/types/User";
import { fetchAuthenticated } from "../../api/Common";
import { Contact } from "../../types/User";

// export const fetchContacts = createAsyncThunk(
//     "calls/fetchAll",
//     async () => {
//       const body = await fetchAuthenticated(
//         `/calls?${createCallOptionsParam(filters)}`
//       );
//       if (body.status !== 200) {
//         throw body;
//       }

//       const visitations = ((body.data as Record<string, unknown>)
//         .calls as RawVisitation[]).map(cleanVisitation) as RecordedVisitation[];

//       return visitations;
//     }
//   );

export const contactsAdapter = createEntityAdapter<Contact>();

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsAdapter.getInitialState(),
  reducers: {
    contactsAddMany: contactsAdapter.addMany,
  },
});

export const contactsActions = contactsSlice.actions;
