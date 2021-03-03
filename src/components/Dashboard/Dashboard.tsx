import { Col, Row, Space } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Call } from "src/types/Call";
import { Connection } from "src/types/Connection";
import CallsList from "./CallsList";
import ConnectionsList from "./ConnectionsList";
import DashboardHeader from "./DashboardHeader";
import CallDetails from "./CallDetails";

interface Props {
  calls: Call[];
  connections: Connection[];
}
const Dashboard: React.FC<Props> = ({ calls, connections }) => {
  const [selectedCall, setSelectedCall] = useState<null | Call>(null);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <div
          style={{
            height: "60px",
            backgroundColor: "#F0DEFF",
            opacity: 0.4,
          }}
        />
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
              />
            </Col>
            <Col span={8}>
              <ConnectionsList calls={calls} connections={connections} />
            </Col>
          </Row>
        </Space>
      </Content>
      <CallDetails
        selectedCall={selectedCall}
        onClose={() => setSelectedCall(null)}
      />
    </Layout>
  );
};

export default Dashboard;
