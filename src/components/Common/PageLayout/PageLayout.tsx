import { Layout } from "antd";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const PageLayout: React.FC = ({ children }: Props) => (
  <Layout className="min-h-screen">
    <Layout.Content>
      <div
        style={{
          height: "60px",
          backgroundColor: "#F0DEFF",
          opacity: 0.4,
        }}
      />
      {children}
    </Layout.Content>
  </Layout>
);

export default PageLayout;
