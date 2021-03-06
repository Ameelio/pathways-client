import { Col, Space, Typography } from "antd";
import React from "react";
// import { useTranslation } from "react-i18next";
import { Contact } from "src/types/User";
import { getFullName } from "src/utils/utils";
import IndividualAvatar from "../Avatar/IndividualAvatar";

interface Props {
  contact: Contact;
}

const ConnectionItem: React.FC<Props> = ({ contact }) => {
  // const { t } = useTranslation("dashboard");

  // TODO: https://github.com/Ameelio/pathways-client/issues/42
  // const getDaysPastNum = () => {
  //   return differenceInDays(
  //     new Date(),
  //     new Date(contact.lastCall.scheduledEnd)
  //   );
  //   return 1;
  // };

  return (
    <Col key={contact.id} className="flex flex-col align-center">
      <Space direction="vertical">
        <IndividualAvatar
          size={80}
          src={contact.profileImagePath}
          fallback={getFullName(contact)}
        />
        <div>
          <div>
            <Typography.Text>{getFullName(contact)}</Typography.Text>
          </div>
          {/* {contact.status === "active" && (
            <div>
              <Typography.Text type="secondary">
                {t("connection.lastCall", {
                  daysPastNum: getDaysPastNum(),
                })}
              </Typography.Text>
            </div>
          )} */}
        </div>
      </Space>
    </Col>
  );
};

export default ConnectionItem;
