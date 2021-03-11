import React from "react";
import { closeModal } from "src/redux/modules/modalsSlice";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/redux";
import { Typography, Modal } from "antd";

const ResourcesModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.modals.data);
  const { t } = useTranslation("modals");

  if (data.activeType !== "RESOURCE_MODAL") return <div />;
  const resource = data.entity;

  return (
    <Modal
      title={resource.title}
      visible={true}
      onOk={() => dispatch(closeModal())}
      onCancel={() => dispatch(closeModal())}
      className="rounded-sm w-full"
    >
      <Typography.Text>{resource.body}</Typography.Text>
    </Modal>
  );
};

export default ResourcesModal;
