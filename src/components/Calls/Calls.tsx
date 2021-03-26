import { Avatar, Button, Col, Row, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { BaseCall, Call } from "src/types/Call";
import { User } from "src/types/User";
import PageLayout from "src/components/Common/PageLayout";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { genFullName } from "src/utils/utils";
import { useAppDispatch } from "src/redux";
import { openModal } from "src/redux/modules/modalsSlice";

interface Props {
  calls: BaseCall[];
  user: User;
}

interface TableData {
  date: string;
  time: string;
  participants: JSX.Element;
  cancel: JSX.Element;
}

const tableColumns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
  {
    title: "Participants",
    dataIndex: "participants",
  },
  {
    title: "",
    dataIndex: "cancel",
  },
];

const Calls: React.FC<Props> = ({ calls, user }) => {
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState<TableData[] | undefined>(
    undefined
  );
  const { t } = useTranslation("calls");

  useEffect(() => {
    setTableData(
      calls.map((call) => {
        return {
          date: format(new Date(call.scheduledStart), "eeee, LLLL d"),
          time: `${format(
            new Date(call.scheduledStart),
            "h:mm bbb"
          )} - ${format(new Date(call.scheduledStart), "h:mm bbb")}`,
          participants: (
            <Space>
              <Avatar src={user.profileImagePath} size="small" />
              <Typography.Text>{genFullName(user)}</Typography.Text>
            </Space>
          ),
          cancel: (
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
        };
      })
    );
  }, [calls, user, dispatch, t]);

  return (
    <PageLayout>
      <Space className="p-8 w-full" direction="vertical">
        <Row className="pb-2">
          <Col>
            <p className="pb-2">
              <Typography.Text type="secondary">
                {t("callLimit")}
              </Typography.Text>
            </p>
            <p>
              <Typography.Text strong className="text-base">
                {user.quota}
              </Typography.Text>
            </p>
          </Col>
        </Row>
        <Row>
          <Table
            className="w-full"
            columns={tableColumns}
            dataSource={tableData}
          />
        </Row>
      </Space>
    </PageLayout>
  );
};

export default Calls;
