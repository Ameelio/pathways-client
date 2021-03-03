import { SaveOutlined } from "@ant-design/icons";
import {
  Space,
  PageHeader,
  Button,
  Row,
  Card,
  Typography,
  Col,
  Layout,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { differenceInMinutes, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "src/types/User";
import { genFullName } from "src/utils/utils";
import { BaseCall } from "src/types/Call";
import { AVATAR_LARGE } from "src/utils/constants";

interface Props {
  user: User;
  calls: BaseCall[];
  onEdit: () => void;
}

const ProfileInfo: React.FC<Props> = ({ user, calls, onEdit }) => {
  const { t } = useTranslation("profile");
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    const total = calls
      .map((call) =>
        differenceInMinutes(new Date(call.end), new Date(call.start))
      )
      .reduce((a, b) => a + b);
    setTotalMinutes(total);
  }, [calls]);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
      <Layout.Content>
        <div
          className="h-16 opacity-40"
          style={{ backgroundColor: "#F0DEFF" }}
        />
        <Space direction="vertical" size="large" className="w-100 p-6 pt-9">
          <PageHeader className="p-6 border border-solid border-opacity-1 border-gray-200">
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Space>
                <Avatar src={user.profileImgPath} size={AVATAR_LARGE} />
                <Space direction="vertical">
                  <Typography.Title level={4}>
                    <Typography.Text strong>
                      {genFullName(user)}
                    </Typography.Text>
                  </Typography.Title>
                  <Typography.Title level={5}>
                    <Typography.Text>{user.location}</Typography.Text>
                  </Typography.Title>
                </Space>
              </Space>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                size="large"
                style={{ borderRadius: 4 }}
              >
                {t("profileInfo.editProfile")}
              </Button>
            </Space>
          </PageHeader>
          <Row gutter={32}>
            <Col span={16}>
              <Card title={t("profileInfo.about")}>
                <p>
                  <Typography.Text>{`${t("profileInfo.name")}: ${genFullName(
                    user
                  )}`}</Typography.Text>
                </p>
                <p>
                  <Typography.Text>{`${t("profileInfo.home")}: ${
                    user.location
                  }`}</Typography.Text>
                </p>
                <p>
                  <Typography.Text>{`${t("profileInfo.birthday")}: ${format(
                    new Date(user.dateOfBirth),
                    "MMMM d, yyyy"
                  )}`}</Typography.Text>
                </p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title={t("profileInfo.history")}>
                <Row>
                  <Col span={4}>
                    <p>
                      <Typography.Text type="secondary">
                        {t("profileInfo.totalCalls")}
                      </Typography.Text>
                    </p>
                    <p>
                      <Typography.Text>{calls.length}</Typography.Text>
                    </p>
                  </Col>
                  <Col span={16} offset={2}>
                    <p>
                      <Typography.Text type="secondary">
                        {t("profileInfo.totalMinutes")}
                      </Typography.Text>
                    </p>
                    <p>
                      <Typography.Text>{totalMinutes}</Typography.Text>
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Space>
      </Layout.Content>
    </Layout>
  );
};

export default ProfileInfo;
