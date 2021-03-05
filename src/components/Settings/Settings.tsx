import React, { useEffect, useState } from "react";
import { Language } from "src/types/Session";
import PageLayout from "src/components/Common/PageLayout";
import { Card, Col, Row, Select, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "src/utils/constants";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation("settings");
  const [languageOptions, setLanguageOptions] = useState<
    JSX.Element[] | undefined
  >();

  useEffect(() => {
    const { Option } = Select;
    const tempLanguageOptions = [];
    for (const key in LANGUAGES) {
      tempLanguageOptions.push(
        <Option value={key}>{LANGUAGES[key as Language]}</Option>
      );
    }
    setLanguageOptions(tempLanguageOptions);
  }, []);

  return (
    <PageLayout>
      <Space direction="vertical" size="large" className="w-100 p-6 pt-9">
        <Row gutter={32}>
          <Col span={12}>
            <Card title={t("language.title")}>
              <p>
                <Typography.Text>{t("language.messageOne")}</Typography.Text>
              </p>
              <p>
                <Typography.Text type="secondary">
                  {t("language.messageTwo")}
                </Typography.Text>
              </p>
              <div className="pt-4">
                <Typography.Text>{`${t("language.title")}:`}</Typography.Text>
                {/* TODO: Right now, this only changes the language on the frontend via i18n. We need to also update the database
                                whenever we have an API endpoint for it */}
                <Select
                  className="pl-4"
                  defaultValue={i18n.language}
                  onChange={(value) => i18n.changeLanguage(value)}
                >
                  {languageOptions}
                </Select>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("resources.title")}>
              <Row className="pb-2">
                <Typography.Link href="/" target="_blank">
                  {t("resources.contactVerification")}
                </Typography.Link>
              </Row>
              <Row className="pb-2">
                <Typography.Link href="/" target="_blank">
                  {t("resources.callInfo")}
                </Typography.Link>
              </Row>
              <Row className="pb-2">
                <Typography.Link href="/" target="_blank">
                  {t("resources.privacyInfo")}
                </Typography.Link>
              </Row>
            </Card>
          </Col>
        </Row>
      </Space>
    </PageLayout>
  );
};

export default Settings;
