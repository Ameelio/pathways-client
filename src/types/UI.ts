import { Call } from "./Call";
import { Quote } from "./Common";

export type ModalType =
  | "INACTIVE_MODAL"
  | "CANCEL_CALL_MODAL"
  | "RESOURCE_MODAL"
  | "TEST_CONNECTION_MODAL"
  | "KIOSK_CONFIRMATION_MODAL"
  | "BIO_MODAL"
  | "PROFILE_PHOTO_MODAL";

export interface FAQResource {
  title: string;
  body: string;
  videoLink?: string;
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

export interface KioskConfirmationModalData extends BaseModal {
  activeType: "KIOSK_CONFIRMATION_MODAL";
  entity: Call;
}

export interface BiographyModalData extends BaseModal {
  activeType: "BIO_MODAL";
  entity: Quote;
}

export interface ProfilePhotoModalData extends BaseModal {
  activeType: "PROFILE_PHOTO_MODAL";
  entity: string[];
}
