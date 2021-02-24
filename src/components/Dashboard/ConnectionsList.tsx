import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Connection } from "src/types/Connection";
import { generateBgColor, genFullName, getInitials } from "src/utils/utils";

interface Props {
  connections: Connection[];
}

const ConnectionsList: React.FC<Props> = ({ connections }: Props) => {
  const { t } = useTranslation("dashboard");

  const tabList = [
    {
      key: "approved",
      tab: t("connection.approved"),
    },
    {
      key: "pending",
      tab: t("connection.pending"),
    },
  ];

  const [activeContactTab, setActiveContactTab] = useState("approved");

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
                  size={80}
                  style={{
                    backgroundColor: generateBgColor(
                      genFullName(connection.user)
                    ),
                  }}
                >
                  {getInitials(genFullName(connection.user))}
                </Avatar>
                <Typography.Text>
                  {genFullName(connection.user)}
                </Typography.Text>
              </Space>
            </Col>
          ))}
      </Row>
    </Card>
  );
};

export default ConnectionsList;
