import { Layout } from "antd";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const PageLayout: React.FC = ({ children }: Props) => (
  <Layout className="min-h-screen">
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

export default PageLayout;
