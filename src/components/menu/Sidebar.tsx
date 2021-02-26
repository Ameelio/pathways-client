import React, { ReactElement, useState } from "react";
import { Menu, Layout, Space, Row, Avatar, Typography, Divider } from "antd";
import Icon, {
  EllipsisOutlined,
  HomeOutlined,
  ScheduleOutlined,
  SettingFilled,
} from "@ant-design/icons";
import logo from "src/assets/logo.svg";
import { User } from "src/types/User";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import { genFullName } from "src/utils/utils";
import { push } from "connected-react-router";

const { Sider } = Layout;
interface Props {
  navigate: (path: string) => void;
  isVisible: boolean;
  pathname: string;
  user: User;
}

export default function Sidebar({
  navigate,
  isVisible,
  pathname,
  user,
}: Props): ReactElement {
  if (
    !isVisible ||
    pathname.indexOf("call") !== -1 ||
    pathname.indexOf("feedback") !== -1
  )
    return <div />;
  return (
    <Sider
      theme="light"
      style={{ boxShadow: "2px 0px 8px rgba(0, 0, 0, 0.15)" }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row style={{ paddingTop: 8 }}>
          <Logo className="login-logo" />
        </Row>
        <Row></Row>
        <Row
          align="middle"
          style={{ paddingLeft: 10, cursor: "pointer" }}
          onClick={() => navigate(`profile/${user.id}`)}
        >
          <Space>
            <Avatar src={user.profileImgPath} size="large" />
            <Typography.Text>{genFullName(user)}</Typography.Text>
          </Space>
        </Row>
        <Menu
          mode="inline"
          defaultSelectedKeys={["home"]}
          style={{ width: "100%" }}
        >
          <Menu.Item
            key="home"
            icon={<HomeOutlined />}
            onClick={() => navigate("home")}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="calls"
            icon={<ScheduleOutlined />}
            onClick={() => console.log("take me to calls")}
          >
            Calls
          </Menu.Item>
          <Divider />
          <Menu.Item
            key="settings"
            icon={<EllipsisOutlined />}
            onClick={() => console.log("take me to settings")}
          >
            Settings
          </Menu.Item>
        </Menu>
      </Space>
    </Sider>
  );
}
