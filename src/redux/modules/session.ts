import { UNAUTHENTICATED_USER_ID } from "src/utils/constants";
import { User } from "src/types/User";
import { Language } from "src/types/Session";

interface AuthInfo {
  id: number;
  type: "inmate";
  token: string;
}

type SessionStatus = "inactive" | "active" | "loading";

interface SessionState {
  isLoggedIn: boolean;
  authInfo: AuthInfo;
  user: User;
  language: Language;
  status: SessionStatus;
}

// Constants & Shapes
const SET_SESSION = "user/SET_SESSION";
const LOGOUT = "user/LOGOUT";
const SET_SESSION_STATUS = "user/SET_STATUS";
const SET_PROFILE_IMAGE = "user/SET_PROFILE_IMAGE";

interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: SessionState;
}
interface LogoutAction {
  type: typeof LOGOUT;
}

interface SetSessionStatusAction {
  type: typeof SET_SESSION_STATUS;
  payload: SessionStatus;
}

interface SetProfileImageAction {
  type: typeof SET_PROFILE_IMAGE;
  payload: string;
}

type UserActionTypes =
  | LogoutAction
  | SetSessionAction
  | SetSessionStatusAction
  | SetProfileImageAction;

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

export const setSessionStatus = (status: SessionStatus): UserActionTypes => {
  return {
    type: SET_SESSION_STATUS,
    payload: status,
  };
};

export const setProfileImage = (imgPath: string): UserActionTypes => {
  return {
    type: SET_PROFILE_IMAGE,
    payload: imgPath,
  };
};

// Reducer
const initialState: SessionState = {
  authInfo: { id: UNAUTHENTICATED_USER_ID, type: "inmate", token: "" },
  user: {
    id: UNAUTHENTICATED_USER_ID,
    firstName: "",
    lastName: "",
    location: "",
    dateOfBirth: "",
    inmateIdentification: "",
    quota: 0,
    race: "",
    needsMonitor: true,
    needsApproval: true,
  },
  isLoggedIn: false,
  language: "en",
  status: "inactive",
};

export function sessionReducer(
  state = initialState,
  action: UserActionTypes
): SessionState {
  switch (action.type) {
    case SET_SESSION:
      return action.payload;
    case LOGOUT:
      return {
        authInfo: { id: UNAUTHENTICATED_USER_ID, type: "inmate", token: "" },
        user: {
          id: UNAUTHENTICATED_USER_ID,
          firstName: "",
          lastName: "",
          location: "",
          dateOfBirth: "",
          inmateIdentification: "",
          quota: 0,
          race: "",
          needsApproval: true,
          needsMonitor: true,
        },
        isLoggedIn: false,
        status: "inactive",
        language: "en",
      };
    case SET_SESSION_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        user: {
          ...state.user,
          profileImagePath: action.payload,
        },
      };
    default:
      return state;
  }
}
