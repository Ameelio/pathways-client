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
    needsApproval: data.needsApproval,
    needsMonitor: data.needsMonitor,
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
  const token = response.headers.get("Authorization") || "";
  // const re = /(?<=connect.sid=)([^\s;]+)/gm;
  // const found = cookies.match(re);
  // console.log('found?')
  // console.log(found)
  if (!token) throw new Error("Cannot find header token");
  await initializeSession(token, body.data, cred.language);
}
