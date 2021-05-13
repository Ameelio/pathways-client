export type Language = "en" | "es";

export interface AuthInfo {
  token: string;
  id: string;
  type: "inmate";
}
