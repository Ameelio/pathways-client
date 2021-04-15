import { HeartOutlined } from "@ant-design/icons";
import { Rate, Space, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ReactElement } from "react";
import { CallRatingModalData } from "src/types/UI";
import Lottie from "react-lottie";
import { closeModal } from "src/redux/modules/modalsSlice";
import GoodbyeLottie from "src/assets/Lottie/Goodbye.json";

interface Props {
  data: CallRatingModalData;
  rateCall: (rating: number) => void;
  closeModal: () => void;
}

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: GoodbyeLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function CallRatingModal({
  data,
  rateCall,
}: Props): ReactElement {
  const resource = data.entity;
  return (
    <Modal
      title={`We hope you and ${resource.userParticipants[0].firstName} went well!`}
      visible={true}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      okButtonProps={{
        style: { display: "none" },
      }}
      className="rounded-sm w-full flex flex-col align-center"
    >
      <Lottie options={defaultOptions} height="50%" width="50%" />
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <Typography.Text>How are you feeling after your call?</Typography.Text>
        <Rate
          character={<HeartOutlined style={{ fontSize: 36 }} />}
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
