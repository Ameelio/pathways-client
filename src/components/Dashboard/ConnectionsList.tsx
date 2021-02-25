import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Call } from "src/types/Call";
import { Connection } from "src/types/Connection";
import { genFullName } from "src/utils/utils";
import { selectEndedCalls } from "src/redux/selectors";
import { differenceInDays } from "date-fns";

interface Props {
  calls: Call[];
  connections: Connection[];
}

const ConnectionsList: React.FC<Props> = ({ calls, connections }: Props) => {
  const { t } = useTranslation("dashboard");
  const endedCalls = useSelector(selectEndedCalls);

  const tabList = [
    {
      key: "approved",
      tab: t("connection.active"),
    },
    {
      key: "pending",
      tab: t("connection.pending"),
    },
  ];

  const [activeContactTab, setActiveContactTab] = useState("approved");

  // TODO: Remove this messy function and pass the days past in the api endpoint
  const getDaysPastNum = (connectionId: number) => {
    if (!endedCalls) return 0;
    const last = Math.max.apply(
      Math,
      endedCalls
        .filter((call) => call.connectionId === connectionId)
        .map((call) => call.end)
    );
    const lastCall = endedCalls.find((call) => call.end === last);
    if (lastCall) return differenceInDays(new Date(lastCall.end), new Date());
    return 0;
  };

  return (
    <Card
      title={t("connection.title")}
      tabList={tabList}
      activeTabKey={activeContactTab}
      onTabChange={(key) => setActiveContactTab(key)}
    >
      <Row justify="space-around">
        {connections
          .filter((connection) => connection.status === activeContactTab)
          .map((connection) => (
            <Col
              key={connection.id}
              className="d-flex flex-column align-items-center"
            >
              <Space direction="vertical">
                <Avatar
                  shape="square"
                  size={80}
                  src={connection.user.profileImgPath}
                />
                <div>
                  <div>
                    <Typography.Text>
                      {genFullName(connection.user)}
                    </Typography.Text>
                  </div>
                  {connection.status === "approved" && (
                    <div>
                      <Typography.Text type="secondary">
                        {t("connection.lastCall", {
                          daysPastNum: getDaysPastNum(connection.id),
                        })}
                      </Typography.Text>
                    </div>
                  )}
                </div>
              </Space>
            </Col>
          ))}
      </Row>
    </Card>
  );
};

export default ConnectionsList;
