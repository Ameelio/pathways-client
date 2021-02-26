import { CalendarOutlined, TeamOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Row,
  Space,
  Typography,
} from "antd";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/redux";
import { Call } from "src/types/Call";
import { genFullName } from "src/utils/utils";
import { openCancelCallModal } from "../Modals/modalsSlice";

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
      new Date(selectedCall.end),
      new Date(selectedCall.start)
    );

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
              <CalendarOutlined style={{ fontSize: "22px" }} />
            </Col>
            <Col style={{ fontSize: 14 }}>
              <div>
                <Typography.Text>
                  {format(new Date(selectedCall.start), "EEEE, MMMM d")}
                </Typography.Text>
              </div>
              <div>
                <Typography.Text type="secondary">
                  {format(new Date(selectedCall.start), "h:mm aaa OOO")} •{" "}
                  {`${duration}mins`}
                </Typography.Text>
              </div>
            </Col>
          </Space>
        </Row>
        <Row>
          <Space>
            <Col>
              <TeamOutlined style={{ fontSize: "22px" }} />
            </Col>
            <Col>
              <Avatar src={selectedCall.connection.user.profileImgPath} />
            </Col>
            <Col style={{ fontSize: 14 }}>
              <Typography.Text type="secondary">
                {genFullName(selectedCall.connection.user)}
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
            style={{ borderRadius: 4, color: "#448AF3" }}
            onClick={() => dispatch(openCancelCallModal(selectedCall))}
          >
            {t("call.cancel")}
          </Button>
        </Row>
        <Divider />
        <Row>
          <Typography.Link>{t("call.whatToExpect")}</Typography.Link>
        </Row>
        <Row>
          <Typography.Link>{t("call.privacyNotice")}</Typography.Link>
        </Row>
      </Space>
    </Drawer>
  ) : null;
};

export default CallDetails;
