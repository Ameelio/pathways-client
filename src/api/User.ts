import { API_URL, fetchTimeout } from "./Common";
import url from "url";
import { setSession } from "src/redux/modules/session";
import { Store } from "src/redux";
import { TOKEN_KEY } from "src/utils/constants";
import { User } from "src/types/User";

async function initializeSession(body: any) {
  const user = body.data.user as User;
  const { token, id } = body.data.user;
  Store.dispatch(
    setSession({
      user,
      authInfo: { token, id, type: "inmate" },
      isLoggedIn: true,
    })
  );

  // TO
  localStorage.setItem(TOKEN_KEY, token);
}

export async function loginWithCredentials(cred: {
  inmateNumber: string;
  pin: string;
}): Promise<void> {
  const response = await fetchTimeout(url.resolve(API_URL, "inmate/auth"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      node_id: 2,
      inmate_number: cred.inmateNumber,
      pin: cred.pin,
    }),
  });
  const body = await response.json();
  if (body.status !== 200) throw body;
  await initializeSession(body);
}
