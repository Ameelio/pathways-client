import { Avatar, Col, Row, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { BaseCall, Call } from "src/types/Call";
import { User } from "src/types/User";
import PageLayout from "src/components/Common/PageLayout";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { genFullName } from "src/utils/utils";

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

const Calls: React.FC<Props> = ({ calls, user }) => {
  const [tableData, setTableData] = useState<TableData[] | undefined>(
    undefined
  );
  const { t } = useTranslation("calls");
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
      title: "Cancel",
      dataIndex: "cancel",
    },
  ];

  useEffect(() => {
    setTableData(
      calls.map((call) => {
        return {
          date: format(new Date(call.start), "eeee, LLLL d"),
          time: `${format(new Date(call.start), "h:mm bbb")} - ${format(
            new Date(call.start),
            "h:mm bbb"
          )}`,
          participants: (
            <Space>
              <Avatar src={user.profileImgPath} size="small" />
              <Typography.Text>{genFullName(user)}</Typography.Text>
            </Space>
          ),
          cancel: (
            <Space>
              <Typography.Text>Cancel</Typography.Text>
            </Space>
          ),
        };
      })
    );
  }, [calls, user]);

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
