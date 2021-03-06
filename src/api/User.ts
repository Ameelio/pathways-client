import { API_URL, fetchAuthenticated, fetchTimeout } from "./Common";
import {
  setProfileImage,
  setSession,
  setSessionStatus,
} from "src/redux/modules/session";
import { Store } from "src/redux";
import { User } from "src/types/User";
import { Language } from "src/types/Session";
import { showToast } from "src/utils";

async function initializeSession(token: string, data: any, language: Language) {
  const user: User = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    profileImagePath: data.profileImagePath,
    inmateIdentification: data.inmateIdentification,
    quota: data.quota,
    location: data.location,
    race: data.race,
    needsApproval: data.needsApproval,
    needsMonitor: data.needsMonitor,
  };
  Store.dispatch(
    setSession({
      user,
      authInfo: { id: data.id, type: "inmate", token },
      isLoggedIn: true,
      language,
      status: "active",
    })
  );
}

export async function loginWithCredentials(cred: {
  inmateNumber: string;
  pin: string;
  facilityId: string;
  language: Language;
}): Promise<void> {
  Store.dispatch(setSessionStatus("loading"));

  try {
    const response = await fetchTimeout(`${API_URL}auth/member/login/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        facilityId: cred.facilityId,
        inmateIdentification: cred.inmateNumber,
        pin: cred.pin,
      }),
    });
    const body = await response.json();
    const token = response.headers.get("Authorization") || "";
    if (!token) throw new Error("Cannot find header token");
    await initializeSession(token, body.data, cred.language);
  } catch (err) {
    Store.dispatch(setSessionStatus("inactive"));
    showToast("login_error", "Invalid ID or Pin Code", "error");
  }
}

export async function updateProfile(profileImageUrl: string) {
  try {
    await fetchAuthenticated("", {
      method: "PATCH",
      body: JSON.stringify({
        profileImageUrl,
      }),
    });

    Store.dispatch(setProfileImage(profileImageUrl));
  } catch (err) {
    showToast(
      "update_profile_errror",
      "Failed to update image profile",
      "error"
    );
  }
}
