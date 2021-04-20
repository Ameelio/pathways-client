import { fetchAuthenticated } from "./Common";

export async function rateCall(callId: number, rating: number): Promise<void> {
  await fetchAuthenticated(`calls/${callId}`, {
    method: "PATCH",
    body: JSON.stringify({
      rating,
    }),
  });
}
