import { Card, Col, Row, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Call } from "src/types/Call";
import { BaseInPersonVisit, InPersonVisit } from "src/types/InPersonVisit";
import { BaseVisit } from "src/types/Visit";
import { weekDays } from "src/utils/constants";
import VisitItem from "./VisitItem";

interface Props {
  calls: Call[];
  inPersonVisits: InPersonVisit[];
  visits: BaseVisit[];
  selectCall: (call: Call) => void;
  joinCall: (call: Call) => void;
  seeAllCalls: () => void;
}

const VisitsList: React.FC<Props> = ({
  calls,
  visits,
  selectCall,
  joinCall,
  seeAllCalls,
}: Props) => {
  const { t } = useTranslation("dashboard");
  const [filteredVisits, setFilteredVisits] = useState<BaseVisit[]>([]);
  const [activeVisitTab, setActiveVisitTab] = useState("allTypes");
  const tabList = [
    {
      key: "allTypes",
      tab: "All Types",
    },
    {
      key: "videoCalls",
      tab: "Video Calls",
    },
    {
      key: "inPersonVisits",
      tab: "In-Person Visits",
    },
  ];

  useEffect(() => {
    switch (activeVisitTab) {
      case "allTypes":
        setFilteredVisits(visits);
        break;
      case "videoCalls":
        setFilteredVisits(
          visits.filter((visit) => visit.visitType.category === "call")
        );
        break;
      case "inPersonVisits":
        setFilteredVisits(
          visits.filter(
            (visit) => visit.visitType.category === "in_person_visit"
          )
        );
    }
  }, [activeVisitTab, visits]);

  const getVisitItems = () => {
    const visitsByDate = filteredVisits.filter(
      (visit, index, self) =>
        index ===
        self.findIndex(
          (v) =>
            new Date(v.scheduledStart).getDay() ===
            new Date(visit.scheduledStart).getDay()
        )
    );
    const dates = visitsByDate.map((visit) => {
      const date = new Date(visit.scheduledStart);
      return `${new Date(visit.scheduledStart)}, ${date.getDay()}`;
    });
    return dates.map((date) => {
      const values = date.split(",");
      const scheduledStart = values[0];
      const weekDay = weekDays[parseInt(values[1])];
      console.log("heyyyyy");
      console.log(scheduledStart);
      const dayOfMonth = new Date(scheduledStart).getDate();
      const visitsAtDate = filteredVisits.filter(
        (visit) =>
          new Date(visit.scheduledStart).getDay() ===
          new Date(scheduledStart).getDay()
      );
      return (
        <Space>
          <Col flex={2}>
            <Space direction="vertical" align="center">
              <Typography.Title level={5} type="secondary">
                {weekDay.toUpperCase()}
              </Typography.Title>
              <Typography.Text strong>{dayOfMonth}</Typography.Text>
            </Space>
          </Col>
          <Col flex={10}>
            {visitsAtDate.map((visit) => (
              <VisitItem
                visit={visit as Call | BaseInPersonVisit}
                selectCall={selectCall}
                joinCall={joinCall}
                key={visit.id}
              />
            ))}
          </Col>
        </Space>
      );
    });
  };

  return (
    <Card
      title={"Events"}
      tabList={tabList}
      activeTabKey={activeVisitTab}
      onTabChange={(key) => setActiveVisitTab(key)}
      extra={
        <Typography.Link onClick={seeAllCalls}>
          {t("call.seeAll")}
        </Typography.Link>
      }
      className="rounded-md"
    >
      {getVisitItems()}
    </Card>
  );
};

export default VisitsList;
