import { Space, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ReactElement } from "react";
import { KioskConfirmationModalData } from "src/types/UI";
import Lottie from "react-lottie";
import KioskLottie from "src/assets/Lottie/Kiosk.json";
import { useTranslation } from "react-i18next";
import { getLottieOptions } from "src/utils/UI";

interface Props {
  data: KioskConfirmationModalData;
  handleConfirm: () => void;
  handleLogout: () => void;
}

export default function KioskConfirmationModal({
  data,
  handleConfirm,
  handleLogout,
}: Props): ReactElement {
  const call = data.entity;
  const { t } = useTranslation(["modals", "common"]);

  return (
    <Modal
      title={t("modals:kioskConfirmationModal.title")}
      visible={true}
      onOk={handleConfirm}
      onCancel={handleLogout}
      className="rounded-sm w-full flex flex-col align-center"
    >
      <Lottie
        options={getLottieOptions(KioskLottie)}
        height="50%"
        width="50%"
      />
      <Space direction="vertical" className="w-full">
        <Typography.Text>
          {t("modals:kioskConfirmationModal.subtitle")}
        </Typography.Text>
        <Typography.Text>{call.kioskName}</Typography.Text>
        <Typography.Text>
          {t("modals:kioskConfirmationModal.body")}
        </Typography.Text>
      </Space>
    </Modal>
  );
}
