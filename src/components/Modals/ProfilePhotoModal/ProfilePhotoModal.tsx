import { Modal, Row, Col } from "antd";
import React, { useState } from "react";
import { ProfilePhotoModalData } from "src/types/UI";

interface Props {
  data: ProfilePhotoModalData;
  closeModal: () => void;
  saveProfile: (url: string) => void;
}

const ProfilePhotoModal: React.FC<Props> = ({
  data,
  closeModal,
  saveProfile,
}) => {
  const photos = data.entity;
  const [selected, setSelected] = useState<string>();
  return (
    <Modal
      onCancel={closeModal}
      onOk={() => {
        if (selected) {
          saveProfile(selected);
        }
      }}
      visible={true}
    >
      <Row gutter={[16, 16]}>
        {photos.map((photo) => (
          <Col span={8}>
            <img
              src={photo}
              className={selected === photo ? "border-2 border-blue-500	" : ""}
              onClick={() => setSelected(photo)}
              alt={"Profile option"}
            />
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default ProfilePhotoModal;
