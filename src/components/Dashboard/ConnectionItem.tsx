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
    if (!endedCalls || !endedCalls.length) return null;
    const filteredEndedCalls = endedCalls.filter(
      (call) => call.connectionId === connectionId
    );
    if (!filteredEndedCalls || !filteredEndedCalls.length) return null;
    const sortedEndedCalls = filteredEndedCalls.sort(
      (callOne, callTwo) => callOne.end - callTwo.end
    );
    const lastCall = sortedEndedCalls[sortedEndedCalls.length - 1];
    return differenceInDays(new Date(lastCall.end), new Date());
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
