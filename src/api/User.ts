import { API_URL, fetchAuthenticated, fetchTimeout } from "./Common";
import url from "url";
import { setSession } from "src/redux/modules/session";
import { Store } from "src/redux";
import { REMEMBER_TOKEN_KEY, TOKEN_KEY } from "src/utils/constants";
import { User } from "src/types/User";

interface RawUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  addr_line_1: string;
  addr_line_2: string;
  city: string;
  state: string;
  postal: string;
  credit: number;
  coins: number;
  profile_img_path: string;
  phone: string;
  referer: string;
  country: string;
  created_at: string;
  referral_link: string;
}

function cleanUser(user: RawUser): User {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    profileImgPath: user.profile_img_path,
  };
}

async function initializeSession(body: any) {
  const user = cleanUser(body.data as RawUser);
  const { token: apiToken, remember: rememberToken } = body.data;
  Store.dispatch(
    setSession({
      user,
      authInfo: { rememberToken, apiToken },
      isLoggedIn: true,
    })
  );

  // TO
  localStorage.setItem(TOKEN_KEY, apiToken);
  localStorage.setItem(REMEMBER_TOKEN_KEY, rememberToken);
  // loadData();
}

export async function loginWithToken(): Promise<void> {
  try {
    const rememberToken = await localStorage.getItem(REMEMBER_TOKEN_KEY);
    if (!rememberToken) {
      throw Error("Cannot load token");
    }
    const response = await fetchTimeout(
      url.resolve(API_URL, "auth/login/remember"),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          remember: rememberToken,
        }),
      }
    );
    const body = await response.json();
    if (body.status !== 200) throw body;
    await initializeSession(body);
  } catch (err) {
    throw Error(err);
  }
}

export async function loginWithCredentials(cred: {
  email: string;
  password: string;
  remember?: boolean;
}): Promise<void> {
  const response = await fetchTimeout(url.resolve(API_URL, "auth/login"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: cred.email,
      password: cred.password,
    }),
  });
  const body = await response.json();
  if (body.status !== 200) throw body;
  console.log(body);
  // const user = cleanUser(body.data as RawUser);
  // const { token: apiToken, remember: rememberToken } = body.data;
  // Store.dispatch(
  //   setSession({
  //     user,
  //     authInfo: { rememberToken, apiToken },
  //     isLoggedIn: true,
  //   })
  // );
  // // TO
  // localStorage.setItem(TOKEN_KEY, apiToken);
  // localStorage.setItem(REMEMBER_TOKEN_KEY, rememberToken);
  await initializeSession(body);
}
