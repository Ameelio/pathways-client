import { Store } from "src/redux";
import url from "url";
// import { getApprovedConnections } from "./Connection";
// import { getContacts, getInmates, getStaff } from "./Persona";

export const API_URL = `${process.env.REACT_APP_BASE_URL}api/`;

export interface ApiResponse {
  date: number;
  good: boolean;
  status?: "OK" | "ERROR" | "succeeded" | 200;
  message?: string;
  data: Record<string, unknown> | Record<string, unknown>[] | unknown;
}

export function fetchTimeout(
  fetchUrl: string,
  options: Record<string, unknown>,
  timeout = 15000
): Promise<Response> {
  return Promise.race([
    fetch(fetchUrl, { ...options, mode: "cors" }),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}

export function toQueryString(options: string[][]) {
  return options.map((x) => x[0] + "=" + encodeURIComponent(x[1])).join("&");
}

export async function fetchAuthenticated(
  fetchUrl: string,
  options: Record<string, unknown> = {},
  timeout = 15000
): Promise<ApiResponse> {
  const state = Store.getState();

  const requestOptions = {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.session.authInfo.token}`,
      "X-Ameelio-User-Type": "inmate",
      "X-Ameelio-Inmate-Id": `${state.session.authInfo.id}`,
    },
  };

  console.log(
    url.resolve(`${API_URL}/inmate/${state.session.authInfo.id}`, fetchUrl)
  );
  const response = await fetchTimeout(
    `${API_URL}/inmate/${state.session.authInfo.id}/${fetchUrl}`,
    requestOptions,
    timeout
  );

  const body = await response.json();

  return body;
}

// export async function initializeAppData() {
//   await Promise.allSettled([
//     getInmates(),
//     getApprovedConnections(),
//     getStaff(),
//     getContacts(),
//   ]);
// }
