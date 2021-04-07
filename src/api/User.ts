import { API_URL, fetchTimeout } from "./Common";
import { setSession } from "src/redux/modules/session";
import { Store } from "src/redux";
import { User } from "src/types/User";
import { Language } from "src/types/Session";

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
  };
  Store.dispatch(
    setSession({
      user,
      authInfo: { id: data.id, type: "inmate", token },
      isLoggedIn: true,
      language,
    })
  );
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
  const cookies = response.headers.get("cookie") || "";
  const re = /(?<=connect.sid=)([^\s;]+)/gm;
  const found = cookies.match(re);
  if (!found || found.length !== 1) throw new Error("Cannot find header token");
  await initializeSession(found[0], body.data, cred.language);
}
