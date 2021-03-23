import { UNAUTHENTICATED_USER_ID } from "src/utils/constants";
import { User } from "src/types/User";
import { AuthInfo, Language } from "src/types/Session";

interface SessionState {
  isLoggedIn: boolean;
  authInfo: AuthInfo;
  user: User;
  language: Language;
}

// Constants & Shapes
const SET_SESSION = "user/SET_SESSION";
const LOGOUT = "user/LOGOUT";

interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: SessionState;
}
interface LogoutAction {
  type: typeof LOGOUT;
}

type UserActionTypes = LogoutAction | SetSessionAction;

export const logout = (): UserActionTypes => {
  return {
    type: LOGOUT,
  };
};

export const setSession = (userState: SessionState): UserActionTypes => {
  return {
    type: SET_SESSION,
    payload: userState,
  };
};

// Reducer
const initialState: SessionState = {
  authInfo: { token: "", id: UNAUTHENTICATED_USER_ID, type: "inmate" },
  user: {
    id: UNAUTHENTICATED_USER_ID,
    firstName: "",
    lastName: "",
    location: "",
    dateOfBirth: "",
    inmateNumber: "",
    quota: 0,
    sentence: "",
    sentenceLength: "",
    race: "",
  },
  isLoggedIn: false,
  language: "en",
};

export function sessionReducer(
  state = initialState,
  action: UserActionTypes
): SessionState {
  switch (action.type) {
    case SET_SESSION:
      return action.payload;
    case LOGOUT:
      //   sessionStorage.clear();
      return {
        ...state,
        authInfo: { token: "", id: UNAUTHENTICATED_USER_ID, type: "inmate" },
        user: {
          id: UNAUTHENTICATED_USER_ID,
          firstName: "",
          lastName: "",
          location: "",
          dateOfBirth: "",
          inmateNumber: "",
          quota: 0,
          sentence: "",
          sentenceLength: "",
          race: "",
        },
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
