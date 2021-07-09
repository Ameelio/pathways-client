import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  Dictionary,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchAuthenticated } from "src/api/Common";
import i18n from "src/i18n/config";
import {
  BaseInPersonVisit,
  InPersonVisit,
  InPersonVisitStatus,
} from "src/types/InPersonVisit";
import { Contact } from "src/types/User";
import { notEmpty, showToast } from "src/utils";

const FETCH_IN_PERSON_VISITS = "inPersonVisits/fetchAll";
export const fetchInPersonVisits = createAsyncThunk(
  FETCH_IN_PERSON_VISITS,
  async () => {
    const body = await fetchAuthenticated(`in-person-visits`);

    const inPersonVisits = (body.data as { results: BaseInPersonVisit[] })
      .results;

    return inPersonVisits;
  }
);

export const inPersonVisitAdapter = createEntityAdapter<BaseInPersonVisit>();

export const inPersonVisitSlice = createSlice({
  name: "inPersonVisits",
  initialState: inPersonVisitAdapter.getInitialState(),
  reducers: {
    updateInPersonVisitStatus: (
      state,
      action: PayloadAction<{ id: string; status: InPersonVisitStatus }>
    ) => {
      inPersonVisitAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { status: action.payload.status },
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInPersonVisits.fulfilled, (state, action) =>
      inPersonVisitAdapter.setAll(state, action.payload)
    );
    builder.addCase(fetchInPersonVisits.rejected, () =>
      showToast(
        FETCH_IN_PERSON_VISITS,
        i18n.t("api.fetchCalls", { ns: "error" }),
        "error"
      )
    );
  },
});

export function loadInPersonVisitEntities(
  inPersonVisit: BaseInPersonVisit,
  contacts: Dictionary<Contact>
): InPersonVisit {
  const userParticipants = inPersonVisit.userIds
    .map((id) => contacts[id])
    .filter(notEmpty);
  return { ...inPersonVisit, userParticipants: userParticipants };
}

export function loadAllInPersonVisitEntities(
  inPersonVisits: BaseInPersonVisit[],
  contacts: Dictionary<Contact>
): InPersonVisit[] {
  return inPersonVisits.map((inPersonVisit) =>
    loadInPersonVisitEntities(inPersonVisit, contacts)
  );
}
