import { Call } from "./Call";

export type ModalType =
  | "CANCEL_CALL_MODAL"
  | "RESOURCES_MODAL"
  | "INACTIVE_MODAL";
export interface FAQResource {
  title: string;
  body: string;
}
export type CancelCallModal = { activeType: "CANCEL_CALL_MODAL"; entity: Call };
export type ResourceModal = {
  activeType: "RESOURCE_MODAL";
  entity: FAQResource;
};
export type InactiveModal = { activeType: "INACTIVE_MODAL"; entity: null };
