import { Col, Row, Space } from "antd";
import React, { useState } from "react";
import { Call } from "src/types/Call";
import ConnectionsList from "./ConnectionsList";
import DashboardHeader from "./DashboardHeader";
import CallDetails from "./CallDetails";
import PageLayout from "src/components/Common/PageLayout";
import { Contact } from "src/types/User";
import { Quote } from "src/types/Common";
import { InPersonVisit } from "src/types/InPersonVisit";
import VisitsList from "./VisitsList";
import { BaseVisit } from "src/types/Visit";

interface Props {
  calls: Call[];
  inPersonVisits: InPersonVisit[];
  visits: BaseVisit[];
  contacts: Contact[];
  joinCall: (call: Call) => void;
  seeAllCalls: () => void;
  openBio: (quote: Quote) => void;
}
const Dashboard: React.FC<Props> = ({
  calls,
  inPersonVisits,
  visits,
  contacts,
  joinCall,
  seeAllCalls,
  openBio,
}) => {
  const [selectedCall, setSelectedCall] = useState<null | Call>(null);
  console.log("heyv isits from dash");
  console.log(visits);
  return (
    <PageLayout>
      <Space direction="vertical" size="large" className="w-full p-6 pt-9">
        <Row>
          <Col span={24}>
            <DashboardHeader openBio={openBio} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <VisitsList
              calls={calls.slice(0, 3)}
              inPersonVisits={inPersonVisits.slice(0, 3)}
              visits={visits.slice(0, 3)}
              selectCall={(call: Call) => setSelectedCall(call)}
              joinCall={joinCall}
              seeAllCalls={seeAllCalls}
            />
          </Col>
          <Col span={8}>
            <ConnectionsList calls={calls} contacts={contacts} />
          </Col>
        </Row>
      </Space>
      <CallDetails
        selectedCall={selectedCall}
        onClose={() => setSelectedCall(null)}
      />
    </PageLayout>
  );
};

export default Dashboard;
