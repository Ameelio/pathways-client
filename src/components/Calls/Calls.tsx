import { Button, Col, Row, Space, Table, Typography } from "antd";
import React from "react";
import { Call } from "src/types/Call";
import { Contact, User } from "src/types/User";
import PageLayout from "src/components/Common/PageLayout";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { getFullName } from "src/utils/utils";
import { useAppDispatch } from "src/redux";
import { openModal } from "src/redux/modules/modalsSlice";
import IndividualAvatar from "../Avatar/IndividualAvatar";
import { ISOString } from "src/types/Visit";

interface Props {
  calls: Call[];
  user: User;
}

const Calls: React.FC<Props> = ({ calls, user }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("calls");

  const tableColumns = [
    {
      title: "Date",
      key: "date",
      dataIndex: "scheduledStart",
      render: (date: ISOString) => {
        return (
          <Typography.Text>
            {format(new Date(date), "eeee, LLLL d")}
          </Typography.Text>
        );
      },
    },
    {
      title: "Scheduled Start",
      key: "start",
      dataIndex: "scheduledStart",
      render: (scheduledStart: ISOString) => {
        return (
          <Typography.Text>
            {format(new Date(scheduledStart), "h:mm bbb")}
          </Typography.Text>
        );
      },
    },
    {
      title: "Scheduled End",
      key: "end",
      dataIndex: "scheduledEnd",
      render: (scheduledEnd: ISOString) => {
        return (
          <Typography.Text>
            {format(new Date(scheduledEnd), "h:mm bbb")}
          </Typography.Text>
        );
      },
    },
    {
      title: "Participants",
      key: "userParticipants",
      dataIndex: "userParticipants",
      render: (participants: Contact[]) => {
        return (
          <Space direction="vertical">
            {participants.map((p) => (
              <Space>
                <IndividualAvatar
                  src={p.profileImagePath}
                  size={24}
                  fallback={getFullName(p)}
                />
                <Typography.Text>{getFullName(p)}</Typography.Text>
              </Space>
            ))}
          </Space>
        );
      },
    },
    {
      title: "",
      key: "cancel",
      render: (_text: string, call: Call) => (
        <Button
          type="link"
          onClick={() =>
            dispatch(
              openModal({ activeType: "CANCEL_CALL_MODAL", entity: call })
            )
          }
        >
          {t("cancel")}
        </Button>
      ),
    },
  ];

  return (
    <PageLayout>
      <Space className="p-8 w-full" direction="vertical">
        <Row className="pb-2">
          <Col>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                {t("callLimit")}
              </Typography.Text>
              <Space>
                <Typography.Text strong className="text-base">
                  {user.quota}
                </Typography.Text>
                {/* <Tooltip title="PLACEHOLDER FOR liz">
                  <Button icon={InfoOutlined} shape="circle" />
                </Tooltip> */}
              </Space>
            </Space>
          </Col>
        </Row>
        <Row>
          <Table className="w-full" columns={tableColumns} dataSource={calls} />
        </Row>
      </Space>
    </PageLayout>
  );
};

export default Calls;
