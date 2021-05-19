import React, { ReactElement } from "react";
import { Menu, Layout, Space, Row, Avatar, Typography, Divider } from "antd";
import {
  HomeOutlined,
  InboxOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { User } from "src/types/User";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import { getFullName } from "src/utils/utils";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;
interface Props {
  user: User;
  navigate: (path: string) => void;
}

export default function Sidebar({ user, navigate }: Props): ReactElement {
  const { t } = useTranslation("common");
  return (
    <Sider theme="light" className="shadow-lg">
      <Space direction="vertical" className="w-full" size="large">
        <Row className="mt-4 ml-4 cursor-pointer" onClick={() => navigate("/")}>
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
            {t("home")}
          </Menu.Item>
          <Menu.Item
            key="calls"
            icon={<ScheduleOutlined />}
            onClick={() => navigate("/calls")}
          >
            {t("calls")}
          </Menu.Item>
          <Menu.Item
            key="inbox"
            icon={<InboxOutlined />}
            onClick={() => navigate("/inbox")}
          >
            {t("inbox")}
          </Menu.Item>
          <Divider />
          <Menu.Item
            key="settings"
            icon={<SettingOutlined />}
            onClick={() => navigate("/settings")}
          >
            {t("settings")}
          </Menu.Item>
        </Menu>
      </Space>
    </Sider>
  );
}
