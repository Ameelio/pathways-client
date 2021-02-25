import { Space, Row, Col, Typography, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { genFullName } from "src/utils/utils";
import { closeModal } from "src/components/Modals/modalsSlice";
import { useTranslation } from "react-i18next";
import { RootState } from "src/redux";

const mapStateToProps = (state: RootState) => ({
  call: state.modals.cancelCall,
});

const mapDispatchToProps = { closeModal };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const CancelCallModal: React.FC<PropsFromRedux> = ({ call, closeModal }) => {
  const { t } = useTranslation("dashboard");
  const fullName = call ? genFullName(call.connection.user) : "";
  const startDate = call ? format(new Date(call.start), "EEEE, MMMM d") : "";
  const startTime = call ? format(new Date(call.start), "h:mm aaa OOO") : "";
  const duration =
    call && differenceInMinutes(new Date(call.end), new Date(call.start));
  const firstName = call ? call.connection.user.firstName : "";

  return (
    <Modal
      title={t("call.cancelModal.title")}
      visible={true}
      okText={t("call.cancelModal.okText")}
      onOk={closeModal}
      onCancel={closeModal}
      style={{ borderRadius: 4 }}
    >
      <Space direction="vertical" size="large">
        <Row>
          <Typography.Text>
            {t("call.cancelModal.messageOne", { connectionName: fullName })}
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
            {t("call.cancelModal.messageTwo", {
              connectionFirstName: firstName,
            })}
          </Typography.Text>
        </Row>
        <Row />
      </Space>
      <Select
        placeholder={t("call.cancelModal.dropdownPlaceholder")}
        style={{ width: "100%" }}
      ></Select>
    </Modal>
  );
};

export default connector(CancelCallModal);
