import { API_URL, fetchTimeout } from "./Common";
import { setSession } from "src/redux/modules/session";
import { Store } from "src/redux";
import { User } from "src/types/User";
import { Language } from "src/types/Session";

async function initializeSession(data: any, language: Language) {
  const user: User = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    profileImgPath: data.profileImagePath,
    inmateIdentification: data.inmateIdentification,
    quota: data.quota,
    location: data.location,
    race: data.race,
  };
  Store.dispatch(
    setSession({
      user,
      authInfo: { id: data.id, type: "inmate" },
      isLoggedIn: true,
      language,
    })
  );

  // TO
  // localStorage.setItem(TOKEN_KEY, token);
}

export async function loginWithCredentials(cred: {
  inmateNumber: string;
  pin: string;
  facilityId: number;
  language: Language;
}): Promise<void> {
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
  await initializeSession(body.data, cred.language);
}
