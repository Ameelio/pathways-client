import { Image, Modal, Space, Typography } from "antd";
import React from "react";
import { BiographyModalData } from "src/types/UI";

interface Props {
  data: BiographyModalData;
  closeModal: () => void;
}

const BiographyModal = ({ closeModal, data }: Props) => {
  const { author, authorDescription, authorImagePath } = data.entity;
  return (
    <Modal
      onOk={closeModal}
      onCancel={closeModal}
      title={author}
      cancelButtonProps={{ className: "invisible" }}
      visible={true}
    >
      <Space size="large" direction="vertical" align="center">
        <Image src={authorImagePath} preview={false} />

        <Typography.Text>{authorDescription}</Typography.Text>
      </Space>
    </Modal>
  );
};

export default BiographyModal;
