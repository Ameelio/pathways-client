import React from "react";
import { Typography, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { TestConnectionModalData } from "src/types/UI";

interface Props {
  data: TestConnectionModalData;
  closeModal: () => void;
}

const TestConnectionModal = ({ data, closeModal }: Props) => {
  const { t } = useTranslation("call");

  return (
    <Modal
      title={t("testConnection.title")}
      visible={true}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      onOk={closeModal}
      className="rounded-sm w-full"
    >
      <Typography.Text>{""}</Typography.Text>
    </Modal>
  );
};

export default TestConnectionModal;
