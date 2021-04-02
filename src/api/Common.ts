import { Store } from "src/redux";
import { FacilitiesAPIResponse } from "./interfaces/apiResponses";

export const API_URL = `${process.env.REACT_APP_CONNECT_API_URL}`;

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
    },
    credentials: "include",
  };

  const response = await fetchTimeout(
    `${API_URL}inmates/${state.session.authInfo.id}/${fetchUrl}`,
    requestOptions,
    timeout
  );

  if (response.status !== 200 && response.status !== 201) {
    throw response;
  }

  const body = await response.json();

  return body;
}

export async function fetchFacilities(
  timeout = 1500
): Promise<FacilitiesAPIResponse> {
  const requestOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const response = await fetchTimeout(
    `${API_URL}public/facilities`,
    requestOptions,
    timeout
  );

  const body = await response.json();

  return body;
}
