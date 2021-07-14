import { Col, Row, Space } from "antd";
import React, { useState } from "react";
import { Call } from "src/types/Call";
import CallsList from "./CallsList";
import ConnectionsList from "./ConnectionsList";
import DashboardHeader from "./DashboardHeader";
import CallDetails from "./CallDetails";
import PageLayout from "src/components/Common/PageLayout";
import { Contact } from "src/types/User";
import { Quote } from "src/types/Common";

interface Props {
  calls: Call[];
  contacts: Contact[];
  joinCall: (call: Call) => void;
  seeAllCalls: () => void;
  openBio: (quote: Quote) => void;
}
const Dashboard: React.FC<Props> = ({
  calls,
  contacts,
  joinCall,
  seeAllCalls,
  openBio,
}) => {
  const [selectedCall, setSelectedCall] = useState<null | Call>(null);
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
            <CallsList
              calls={calls}
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
