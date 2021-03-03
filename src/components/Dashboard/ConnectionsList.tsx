import { Card, Row } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Call } from "src/types/Call";
import { Connection } from "src/types/Connection";
import ConnectionItem from "./ConnectionItem";

interface Props {
  calls: Call[];
  connections: Connection[];
}

const ConnectionsList: React.FC<Props> = ({ calls, connections }: Props) => {
  const { t } = useTranslation("dashboard");
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
            <ConnectionItem connection={connection} />
          ))}
      </Row>
    </Card>
  );
};

export default ConnectionsList;
