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
      okText={t("common:confirm")}
      cancelText={t("common:logout")}
    >
      <Lottie
        options={getLottieOptions(KioskLottie)}
        // height="20%"
        width="45%"
      />
      <Space size="large" direction="vertical">
        <Space direction="vertical" className="w-full">
          <Typography.Text underline>
            {t("modals:kioskConfirmationModal.locationHeader")}
          </Typography.Text>
          <Typography.Text>
            {t("modals:kioskConfirmationModal.locationBody")}
          </Typography.Text>
          <Typography.Text>
            {t("modals:kioskConfirmationModal.subtitle")}{" "}
            <Typography.Text strong>{call.kioskName}</Typography.Text>
          </Typography.Text>
        </Space>
        <Space direction="vertical">
          <Typography.Text underline>
            {t("modals:kioskConfirmationModal.privacyHeader")}
          </Typography.Text>
          <Typography.Text>
            {t("modals:kioskConfirmationModal.privacyBody")}
          </Typography.Text>
        </Space>
      </Space>
    </Modal>
  );
}
