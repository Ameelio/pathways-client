import { Space, Row, Card, Typography, Col } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { differenceInMinutes, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "src/types/User";
import { getFullName } from "src/utils/utils";
import { BaseCall } from "src/types/Call";
import { AVATAR_LARGE } from "src/utils/constants";
import PageLayout from "src/components/Common/PageLayout";

interface Props {
  user: User;
  calls: BaseCall[];
  onEdit: () => void;
}

const ProfileInfo: React.FC<Props> = ({ user, calls, onEdit }) => {
  const { t } = useTranslation("profile");
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    if (calls.length) {
      const total = calls
        .map((call) =>
          differenceInMinutes(
            new Date(call.scheduledEnd),
            new Date(call.scheduledStart)
          )
        )
        .reduce((a, b) => a + b);
      setTotalMinutes(total);
    }
  }, [calls]);

  return (
    <PageLayout>
      <Space direction="vertical" size="large" className="w-full p-6 pt-9">
        <Card className="flex justify-between">
          <Space>
            <Avatar src={user.profileImagePath} size={AVATAR_LARGE} />
            <Space direction="vertical">
              <Typography.Title level={4}>{getFullName(user)}</Typography.Title>
              <Typography.Link onClick={onEdit}>
                {t("profileInfo.editProfile")}
              </Typography.Link>
            </Space>
          </Space>
        </Card>
        <Row gutter={32}>
          <Col span={14}>
            <Card title={t("profileInfo.about")}>
              <p>
                <Typography.Text>{`${t("profileInfo.name")}: ${getFullName(
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
          <Col span={10}>
            <Card title={t("profileInfo.history")}>
              <Row gutter={16}>
                <Col>
                  <p>
                    <Typography.Text type="secondary">
                      {t("profileInfo.totalCalls")}
                    </Typography.Text>
                  </p>
                  <p>
                    <Typography.Text>{calls.length}</Typography.Text>
                  </p>
                </Col>
                <Col>
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
    </PageLayout>
  );
};

export default ProfileInfo;
