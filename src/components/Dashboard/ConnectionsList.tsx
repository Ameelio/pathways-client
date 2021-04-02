import { Card, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Call } from "src/types/Call";
import { Contact } from "src/types/User";
import ConnectionItem from "./ConnectionItem";

interface Props {
  calls: Call[];
  contacts: Contact[];
}

const ConnectionsList: React.FC<Props> = ({ calls, contacts }: Props) => {
  const { t } = useTranslation("dashboard");
  const [filteredContacts, setFilteredContacts] = useState<Contact[] | null>(
    null
  );
  const [activeContactTab, setActiveContactTab] = useState("active");
  const tabList = [
    {
      key: "active",
      tab: t("connection.active"),
    },
    {
      key: "pending",
      tab: t("connection.pending"),
    },
  ];

  useEffect(() => {
    setFilteredContacts(
      contacts.filter((contact) => contact.status === activeContactTab)
    );
  }, [activeContactTab, contacts]);

  const connectionItems = filteredContacts?.map((contact) => (
    <ConnectionItem key={contact.id} contact={contact} />
  ));

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
