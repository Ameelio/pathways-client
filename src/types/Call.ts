export interface Kiosk {
  id: number;
}

export interface Call {
  id: number;
  start: number;
  end: number;
  kiosk: Kiosk;
  approved: boolean;
}
