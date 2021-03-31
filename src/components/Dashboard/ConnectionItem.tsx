import { Avatar, Col, Space, Typography } from "antd";
import { differenceInDays } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { Connection } from "src/types/Connection";
import { genFullName } from "src/utils/utils";

interface Props {
  connection: Connection;
}

const ConnectionItem: React.FC<Props> = ({ connection }) => {
  const { t } = useTranslation("dashboard");

  const getDaysPastNum = () => {
    return differenceInDays(
      new Date(),
      new Date(connection.lastCall.scheduledEnd)
    );
  };

  return (
    <Col key={connection.id} className="d-flex flex-column align-items-center">
      <Space direction="vertical">
        <Avatar
          shape="square"
          size={80}
          src={connection.user.profileImagePath}
        />
        <div>
          <div>
            <Typography.Text>{genFullName(connection.user)}</Typography.Text>
          </div>
          {connection.status === "active" && (
            <div>
              <Typography.Text type="secondary">
                {t("connection.lastCall", {
                  daysPastNum: getDaysPastNum(),
                })}
              </Typography.Text>
            </div>
          )}
        </div>
      </Space>
    </Col>
  );
};

export default ConnectionItem;
