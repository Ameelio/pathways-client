import { Space, Row, Col, Typography, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
import { genFullName } from "src/utils/utils";
import { closeModal } from "src/redux/modules/modalsSlice";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/redux";

const CancelCallModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("modals");

  const data = useAppSelector((state) => state.modals.data);

  if (data.activeType !== "CANCEL_CALL_MODAL") return <div />;

  const call = data.entity;
  const fullName = genFullName(call.connection.user);
  const startDate = format(new Date(call.start), "EEEE, MMMM d");
  const startTime = format(new Date(call.start), "h:mm aaa OOO");
  const duration =
    call && differenceInMinutes(new Date(call.end), new Date(call.start));
  const firstName = call.connection.user.firstName;

  return (
    <Modal
      title={t("cancelCallModal.title")}
      visible={true}
      okText={t("cancelCallModal.okText")}
      onOk={() => dispatch(closeModal())}
      onCancel={() => dispatch(closeModal())}
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
