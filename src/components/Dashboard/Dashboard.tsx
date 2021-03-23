import { Col, Row, Space } from "antd";
import React, { useState } from "react";
import { Call } from "src/types/Call";
import { Connection } from "src/types/Connection";
import CallsList from "./CallsList";
import ConnectionsList from "./ConnectionsList";
import DashboardHeader from "./DashboardHeader";
import CallDetails from "./CallDetails";
import PageLayout from "src/components/Common/PageLayout";
import { FAQResource } from "src/types/UI";

interface Props {
  calls: Call[];
  connections: Connection[];
  openInfoModal: (resource: FAQResource) => void;
}
const Dashboard: React.FC<Props> = ({ calls, connections, openInfoModal }) => {
  const [selectedCall, setSelectedCall] = useState<null | Call>(null);
  return (
    <PageLayout>
      <Space direction="vertical" size="large" className="w-100 p-6 pt-9">
        <Row>
          <Col span={24}>
            <DashboardHeader />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <CallsList
              calls={calls}
              selectCall={(call: Call) => setSelectedCall(call)}
              openInfoModal={openInfoModal}
            />
          </Col>
          <Col span={8}>
            <ConnectionsList calls={calls} connections={connections} />
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
