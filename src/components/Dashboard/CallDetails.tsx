import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Drawer, Row, Space, Typography } from "antd";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/redux";
import { Call } from "src/types/Call";
import { openModal } from "src/redux/modules/modalsSlice";
import { getParticipantsFullNames } from "src/utils";
import ContactAvatarGroup from "../Avatar/UserAvatarGroup";
import { FAQ_LIST } from "src/constants/FAQ";
import i18n from "src/i18n/config";

interface Props {
  selectedCall: Call | null;
  onClose: () => void;
}

const CallDetails: React.FC<Props> = ({ selectedCall, onClose }) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation("dashboard");
  const duration =
    selectedCall &&
    differenceInMinutes(
      new Date(selectedCall.scheduledEnd),
      new Date(selectedCall.scheduledStart)
    );

  const expectationFAQ = FAQ_LIST.find((faq) => faq.key === "expectation");
  return selectedCall ? (
    <Drawer
      title="Call Details"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={selectedCall ? true : false}
      getContainer={false}
      style={{ position: "absolute" }}
    >
      <Space direction="vertical" size="large">
        <Row>
          <Space>
            <Col>
              <CalendarOutlined className="text-2xl" />
            </Col>
            <Col className="text-sm">
              <div>
                <Typography.Text>
                  {format(
                    new Date(selectedCall.scheduledStart),
                    "EEEE, MMMM d"
                  )}
                </Typography.Text>
              </div>
              <div>
                <Typography.Text type="secondary">
                  {format(
                    new Date(selectedCall.scheduledStart),
                    "h:mm aaa OOO"
                  )}{" "}
                  • {`${duration}mins`}
                </Typography.Text>
              </div>
            </Col>
          </Space>
        </Row>
        <Row>
          <Space>
            <Col>
              <UserOutlined className="text-2xl" />
            </Col>
            <Col>
              <ContactAvatarGroup contacts={selectedCall.userParticipants} />
            </Col>
            <Col style={{ fontSize: 14 }}>
              <Typography.Text type="secondary">
                {getParticipantsFullNames(selectedCall)}
              </Typography.Text>
            </Col>
          </Space>
        </Row>
        <Row>
          <Typography.Text type="secondary">
            {t("call.cancelDescription")}
          </Typography.Text>
        </Row>
        <Row>
          <Button
            className="rounded-sm"
            onClick={() =>
              dispatch(
                openModal({
                  activeType: "CANCEL_CALL_MODAL",
                  entity: selectedCall,
                })
              )
            }
          >
            {t("call.cancel")}
          </Button>
        </Row>
        <Divider />
        <Row>
          <Typography.Link
            onClick={() =>
              dispatch(
                openModal({
                  activeType: "RESOURCE_MODAL",
                  entity: {
                    title:
                      (i18n.language === "es"
                        ? expectationFAQ?.es.question
                        : expectationFAQ?.en.question) || "",
                    body:
                      (i18n.language === "es"
                        ? expectationFAQ?.es.answer
                        : expectationFAQ?.en.answer) || "",
                  },
                })
              )
            }
          >
            {t("call.whatToExpect")}
          </Typography.Link>
        </Row>
        <Row>
          <Typography.Link
            onClick={() => window.open("/privacy_policy.pdf")}
            target="_blank"
          >
            {t("call.privacyNotice")}
          </Typography.Link>
        </Row>
      </Space>
    </Drawer>
  ) : null;
};

export default CallDetails;
