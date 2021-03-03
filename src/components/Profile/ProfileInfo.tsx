import { SaveOutlined } from "@ant-design/icons";
import { Space, PageHeader, Button, Row, Card, Typography, Col } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Layout, { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
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
  const totalMinutes = calls
    .map((call) =>
      differenceInMinutes(new Date(call.end), new Date(call.start))
    )
    .reduce((a, b) => a + b);
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
      <Content>
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
                  <Title level={4}>
                    <Text strong>{genFullName(user)}</Text>
                  </Title>
                  <Title level={5}>
                    <Text>{user.location}</Text>
                  </Title>
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
                  <Text>{`${t("profileInfo.name")}: ${genFullName(
                    user
                  )}`}</Text>
                </p>
                <p>
                  <Text>{`${t("profileInfo.home")}: ${user.location}`}</Text>
                </p>
                <p>
                  <Text>{`${t("profileInfo.birthday")}: ${format(
                    new Date(user.dateOfBirth),
                    "MMMM d, yyyy"
                  )}`}</Text>
                </p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title={t("profileInfo.history")}>
                <Row>
                  <Col span={4}>
                    <p>
                      <Text type="secondary">
                        {t("profileInfo.totalCalls")}
                      </Text>
                    </p>
                    <p>
                      <Text>{calls.length}</Text>
                    </p>
                  </Col>
                  <Col span={16} offset={2}>
                    <p>
                      <Text type="secondary">
                        {t("profileInfo.totalMinutes")}
                      </Text>
                    </p>
                    <p>
                      <Text>{totalMinutes}</Text>
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};

export default ProfileInfo;
