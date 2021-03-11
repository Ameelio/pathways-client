export type Language = "en" | "es";

export interface AuthInfo {
  token: string;
  id: number;
  type: "inmate";
}
