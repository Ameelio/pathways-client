import { Avatar, Col, Space, Typography } from "antd";
import { differenceInDays } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/redux";
import { selectEndedCalls } from "src/redux/selectors";
import { Connection } from "src/types/Connection";
import { genFullName } from "src/utils/utils";

interface Props {
  connection: Connection;
}

const ConnectionItem: React.FC<Props> = ({ connection }) => {
  const { t } = useTranslation("dashboard");
  const endedCalls = useAppSelector(selectEndedCalls);

  // TODO: Remove this messy function and pass the days past in the api endpoint
  const getDaysPastNum = (connectionId: number) => {
    if (!endedCalls) return 0;
    const last = Math.max.apply(
      Math,
      endedCalls
        .filter((call) => call.connectionId === connectionId)
        .map((call) => call.end)
    );
    const lastCall = endedCalls.find((call) => call.end === last);
    if (lastCall) return differenceInDays(new Date(lastCall.end), new Date());
    return 0;
  };
  return (
    <Col key={connection.id} className="d-flex flex-column align-items-center">
      <Space direction="vertical">
        <Avatar shape="square" size={80} src={connection.user.profileImgPath} />
        <div>
          <div>
            <Typography.Text>{genFullName(connection.user)}</Typography.Text>
          </div>
          {connection.status === "approved" && (
            <div>
              <Typography.Text type="secondary">
                {t("connection.lastCall", {
                  daysPastNum: getDaysPastNum(connection.id),
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
