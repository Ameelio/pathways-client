import { Card, Row } from "antd";
import React, { useEffect, useState } from "react";
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
  const [connectionItems, setConnectionItems] = useState<JSX.Element[] | null>(
    null
  );
  const [activeContactTab, setActiveContactTab] = useState("approved");
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

  useEffect(() => {
    setConnectionItems(
      connections
        .filter((connection) => connection.status === activeContactTab)
        .map((connection) => <ConnectionItem connection={connection} />)
    );
  }, [activeContactTab, connections]);

  return (
    <Card
      title={t("connection.title")}
      tabList={tabList}
      activeTabKey={activeContactTab}
      onTabChange={(key) => setActiveContactTab(key)}
    >
      <Row justify="space-around">{connectionItems}</Row>
    </Card>
  );
};

export default ConnectionsList;
