import { Typography } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { BaseCall } from "src/types/Call";
import { User } from "src/types/User";

interface Props {
  calls: BaseCall[];
  user: User;
}

const Calls: React.FC<Props> = ({ calls, user }) => {
  return (
    <Layout>
      <Content>
        <Typography.Text>Hey Calls</Typography.Text>
      </Content>
    </Layout>
  );
};

export default Calls;
