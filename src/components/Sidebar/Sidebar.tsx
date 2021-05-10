import React, { ReactElement } from "react";
import { Menu, Layout, Space, Row, Avatar, Typography, Divider } from "antd";
import {
  EllipsisOutlined,
  HomeOutlined,
  InboxOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { User } from "src/types/User";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import { getFullName } from "src/utils/utils";

const { Sider } = Layout;
interface Props {
  user: User;
  navigate: (path: string) => void;
}

export default function Sidebar({ user, navigate }: Props): ReactElement {
  return (
    <Sider theme="light" className="shadow-lg">
      <Space direction="vertical" className="w-full">
        <Row className="p-2 cursor-pointer" onClick={() => navigate("/")}>
          <Logo className="login-logo" />
        </Row>
        <Row
          align="middle"
          className="pl-4 cursor-pointer"
          onClick={() => navigate(`/profile/${user.id}`)}
        >
          <Space>
            <Avatar src={user.profileImagePath} size="large" />
            <Typography.Text>{getFullName(user)}</Typography.Text>
          </Space>
        </Row>
        <Menu mode="inline" defaultSelectedKeys={["home"]} className="w-full">
          <Menu.Item
            key="home"
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="calls"
            icon={<ScheduleOutlined />}
            onClick={() => navigate("/calls")}
          >
            Calls
          </Menu.Item>
          <Menu.Item
            key="inbox"
            icon={<InboxOutlined />}
            onClick={() => navigate("/inbox")}
          >
            Inbox
          </Menu.Item>
          <Divider />
          <Menu.Item
            key="settings"
            icon={<EllipsisOutlined />}
            onClick={() => navigate("/settings")}
          >
            Settings
          </Menu.Item>
        </Menu>
      </Space>
    </Sider>
  );
}
