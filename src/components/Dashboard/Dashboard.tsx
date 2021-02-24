import { Col, Row, Space } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Call } from "src/types/Call";
import { Connection } from "src/types/Connection";
import CallsList from "./CallsList";
import ConnectionsList from "./ConnectionsList";
import DashboardHeader from "./DashboardHeader";
import SelectedCall from "./SelectedCall";

interface Props {
  calls: Call[];
  connections: Connection[];
}
const Dashboard: React.FC<Props> = ({ calls, connections }) => {
  const [selectedCall, setSelectedCall] = useState(null);
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
        <Space
          direction="vertical"
          size="large"
          style={{ padding: 24, paddingTop: 36 }}
          className="w-100"
        >
          <Row>
            <Col span={24}>
              <DashboardHeader />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <CallsList calls={calls} selectCall={setSelectedCall} />
            </Col>
            <Col span={8}>
              <ConnectionsList connections={connections} />
            </Col>
          </Row>
        </Space>
      </Content>
      <SelectedCall
        selectedCall={selectedCall}
        onClose={() => setSelectedCall(null)}
      />
    </Layout>
  );
};

export default Dashboard;
