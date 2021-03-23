import React from "react";
import { Typography, Modal } from "antd";
import { ResourceModalData } from "src/types/UI";

interface Props {
  data: ResourceModalData;
  closeModal: () => void;
}

const InformationalModal: React.FC<Props> = ({ data, closeModal }) => {
  const resource = data.entity;
  return (
    <Modal
      title={resource.title}
      visible={true}
      okText={resource.okBtnText || "OK"}
      cancelButtonProps={{
        style: { display: data.entity.hideCancel ? "none" : "inline" },
      }}
      onOk={closeModal}
      onCancel={closeModal}
      className="rounded-sm w-full"
    >
      <Typography.Text>{resource.body}</Typography.Text>
    </Modal>
  );
};

export default InformationalModal;
