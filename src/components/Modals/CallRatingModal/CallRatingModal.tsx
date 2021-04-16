import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Rate, Space, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ReactElement } from "react";
import { CallRatingModalData } from "src/types/UI";
import Lottie from "react-lottie";
import { closeModal } from "src/redux/modules/modalsSlice";
import GoodbyeLottie from "src/assets/Lottie/Goodbye.json";
import { useTranslation } from "react-i18next";
import { getParticipantsFirstNames } from "src/utils";
import { getLottieOptions } from "src/utils/UI";

interface Props {
  data: CallRatingModalData;
  rateCall: (rating: number) => void;
  closeModal: () => void;
}

export default function CallRatingModal({
  data,
  rateCall,
}: Props): ReactElement {
  const resource = data.entity;
  const { t } = useTranslation("modals");

  const desc = [
    t("callRatingModal.terrible"),
    t("callRatingModal.bad"),
    t("callRatingModal.normal"),
    t("callRatingModal.good"),
    t("callRatingModal.wonderful"),
  ];

  return (
    <Modal
      title={t("callRatingModal.title", {
        names: getParticipantsFirstNames(resource),
      })}
      visible={true}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      okButtonProps={{
        style: { display: "none" },
      }}
      className="rounded-sm w-full flex flex-col align-center"
    >
      <Lottie
        options={getLottieOptions(GoodbyeLottie)}
        height="50%"
        width="50%"
      />
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <Typography.Text>{t("callRatingModal.howYouFeeling")}</Typography.Text>
        <Rate
          character={<HeartFilled style={{ fontSize: 36 }} />}
          allowHalf
          tooltips={desc}
          onChange={(value: number) => {
            rateCall(value);
            closeModal();
          }}
        />
      </Space>
    </Modal>
  );
}
