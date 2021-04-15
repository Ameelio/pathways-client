import { Call } from "./Call";

export type ModalType =
  | "INACTIVE_MODAL"
  | "CANCEL_CALL_MODAL"
  | "RESOURCE_MODAL"
  | "TEST_CONNECTION_MODAL"
  | "CALL_RATING_MODAL";

export interface FAQResource {
  title: string;
  body: string;
  hideCancel?: boolean;
  okBtnText?: string;
  cancelBtnText?: string;
}

interface BaseModal {
  activeType: ModalType;
  entity: any;
}

export interface CancelCallModalData extends BaseModal {
  activeType: "CANCEL_CALL_MODAL";
  entity: Call;
}
export interface ResourceModalData extends BaseModal {
  activeType: "RESOURCE_MODAL";
  entity: FAQResource;
}
export interface InactiveModalData extends BaseModal {
  activeType: "INACTIVE_MODAL";
  entity: null;
}

export interface TestConnectionModalData extends BaseModal {
  activeType: "TEST_CONNECTION_MODAL";
  entity: null;
}

export interface CallRatingModalData extends BaseModal {
  activeType: "CALL_RATING_MODAL";
  entity: Call;
}
