import React, { ReactElement, useState } from "react";
import { Menu, Layout } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const { Sider } = Layout;
interface Props {
  navigate: (path: string) => void;
  isVisible: boolean;
  pathname: string;
}

export default function Sidebar({
  navigate,
  isVisible,
  pathname,
}: Props): ReactElement {
  const [collapsed, setCollapsed] = useState(false);

  if (
    !isVisible ||
    pathname.indexOf("call") !== -1 ||
    pathname.indexOf("feedback") !== -1
  )
    return <div />;
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed((collapsed) => !collapsed)}
    >
      <div className="logo" />
      <Menu mode="inline" defaultSelectedKeys={["home"]}>
        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          onClick={() => navigate("home")}
        >
          Home
        </Menu.Item>
        {/* <Menu.Item
          key="contacts"
          icon={<UserOutlined />}
          onClick={() => navigate("home")}
        >
          Contacts
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
}
