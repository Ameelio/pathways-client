import { fetchAuthenticated } from "./Common";

export async function rateCall(callId: string, rating: number): Promise<void> {
  await fetchAuthenticated(`calls/${callId}`, {
    method: "PATCH",
    body: JSON.stringify({
      rating,
    }),
  });
}
