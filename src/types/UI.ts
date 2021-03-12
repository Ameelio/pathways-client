import { Call } from "./Call";

export type ModalType =
  | "INACTIVE_MODAL"
  | "CANCEL_CALL_MODAL"
  | "RESOURCES_MODAL"
  | "TEST_CONNECTION_MODAL";

export interface FAQResource {
  title: string;
  body: string;
  hideCancel?: boolean;
  okBtnText?: string;
  cancelBtnText?: string;
}
export interface CancelCallModalData {
  activeType: "CANCEL_CALL_MODAL";
  entity: Call;
}
export interface ResourceModalData {
  activeType: "RESOURCE_MODAL";
  entity: FAQResource;
}
export interface InactiveModalData {
  activeType: "INACTIVE_MODAL";
  entity: null;
}

export interface TestConnectionModalData {
  activeType: "TEST_CONNECTION_MODAL";
  entity: null;
}
