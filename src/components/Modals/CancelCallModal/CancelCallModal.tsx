import { Space, Row, Col, Typography, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { CancelCallModalData } from "src/types/UI";
import { getParticipantsFirstNames, getParticipantsFullNames } from "src/utils";

interface Props {
  data: CancelCallModalData;
  closeModal: () => void;
}

const CancelCallModal: React.FC<Props> = ({ data, closeModal }) => {
  const { t } = useTranslation("modals");
  const call = data.entity;
  const fullName = getParticipantsFullNames(call);
  const startDate = format(new Date(call.scheduledStart), "EEEE, MMMM d");
  const startTime = format(new Date(call.scheduledStart), "h:mm aaa OOO");
  const duration =
    call &&
    differenceInMinutes(
      new Date(call.scheduledEnd),
      new Date(call.scheduledEnd)
    );
  const firstName = getParticipantsFirstNames(call);

  return (
    <Modal
      title={t("cancelCallModal.title")}
      visible={true}
      okText={t("cancelCallModal.okText")}
      onOk={closeModal}
      onCancel={closeModal}
      className="rounded-sm"
    >
      <Space direction="vertical" size="large">
        <Row>
          <Typography.Text>
            {t("cancelCallModal.messageOne", { connectionName: fullName })}
          </Typography.Text>
        </Row>
        <Row>
          <Col>
            <div>
              <Typography.Text>{startDate}</Typography.Text>
            </div>
            <div>
              <Typography.Text>
                {startTime} • {`${duration}mins`}
              </Typography.Text>
            </div>
          </Col>
        </Row>
        <Row>
          <Typography.Text>
            {t("cancelCallModal.messageTwo", {
              connectionFirstName: firstName,
            })}
          </Typography.Text>
        </Row>
        <Row />
      </Space>
      <Select
        className="w-full"
        placeholder={t("cancelCallModal.dropdownPlaceholder")}
      ></Select>
    </Modal>
  );
};

export default CancelCallModal;
