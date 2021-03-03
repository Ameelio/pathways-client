import React, { ReactElement } from "react";
import { Menu, Layout, Space, Row, Avatar, Typography, Divider } from "antd";
import {
  EllipsisOutlined,
  HomeOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { User } from "src/types/User";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import { genFullName } from "src/utils/utils";
import { useHistory } from "react-router";

const { Sider } = Layout;
interface Props {
  isVisible: boolean;
  pathname: string;
  user: User;
}

export default function Sidebar({
  isVisible,
  pathname,
  user,
}: Props): ReactElement {
  const history = useHistory();
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
          onClick={() => history.push(`/profile/${user.id}`)}
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
            onClick={() => history.push("/")}
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
