import Modal from "antd/lib/modal/Modal";
import React from "react";
import { closeModal } from "src/components/Modals/modalsSlice";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/redux";

const ResourcesModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("modals");

  return (
    <Modal
      title={t("cancelCallModal.title")}
      visible={true}
      okText={t("cancelCallModal.okText")}
      onOk={() => dispatch(closeModal())}
      onCancel={() => dispatch(closeModal())}
      className="rounded-sm w-full"
    ></Modal>
  );
};

export default ResourcesModal;
