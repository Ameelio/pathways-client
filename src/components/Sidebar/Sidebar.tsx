import React, { ReactElement } from "react";
import { Menu, Layout, Space, Row, Typography, Divider } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { User } from "src/types/User";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import { getFullName } from "src/utils/utils";
import { useTranslation } from "react-i18next";
import IndividualAvatar from "../Avatar/IndividualAvatar";

const { Sider } = Layout;
interface Props {
  user: User;
  navigate: (path: string) => void;
  logout: () => void;
}

export default function Sidebar({
  user,
  navigate,
  logout,
}: Props): ReactElement {
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
            <IndividualAvatar
              src={user.profileImagePath}
              size={64}
              fallback={getFullName(user)}
            />
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
          {/* TODO: Uncomment when we roll out inbox */}
          {/* <Menu.Item
            key="inbox"
            icon={<InboxOutlined />}
            onClick={() => navigate("/inbox")}
          >
            {t("inbox")}
          </Menu.Item> */}
          <Menu.Item
            key="settings"
            icon={<SettingOutlined />}
            onClick={() => navigate("/settings")}
          >
            {t("settings")}
          </Menu.Item>
          <Divider />
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={logout}
            className="text-blue-500"
          >
            {t("logout")}
          </Menu.Item>
        </Menu>
      </Space>
    </Sider>
  );
}
