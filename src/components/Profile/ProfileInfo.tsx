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
          style={{
            height: "60px",
            backgroundColor: "#F0DEFF",
            opacity: 0.4,
          }}
        />
        <Space
          direction="vertical"
          size="large"
          style={{ padding: 24, paddingTop: 36 }}
          className="w-100"
        >
          <PageHeader
            style={{
              border: "1px solid #EEEEEE",
              padding: "25px",
            }}
          >
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Space>
                <Avatar
                  src={user.profileImgPath}
                  size="large"
                  style={{
                    width: "135px",
                    height: "135px",
                  }}
                />
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
          <Row>
            <Col span={15}>
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
            <Col span={1} />
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
                  <Col span={2} />
                  <Col span={16}>
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
