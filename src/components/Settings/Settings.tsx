import React from "react";
import { Language } from "src/types/Session";
import PageLayout from "src/components/Common/PageLayout";
import { Col, Collapse, Row, Select, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "src/utils/constants";
import { openModal } from "../../redux/modules/modalsSlice";
import { useAppDispatch } from "src/redux";
import Card from "src/components/Card";
import { FAQ_LIST } from "src/constants/FAQ";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation("settings");

  const dispatch = useAppDispatch();
  const { Option } = Select;

  return (
    <PageLayout>
      <Space direction="vertical" size="large" className="w-full p-6 pt-9">
        <Row gutter={36}>
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
                  {Object.keys(LANGUAGES).map((key, index) => (
                    <Option key={`${key}-${index}`} value={key}>
                      {LANGUAGES[key as Language]}
                    </Option>
                  ))}
                </Select>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("resources.title")}>
              {/* TODO: uncomment when we have thsis content */}
              {/* <Row className="pb-2">
                <Typography.Link
                  onClick={() =>
                    dispatch(
                      openModal({
                        activeType: "RESOURCE_MODAL",
                        entity: { title: "Hello", body: "World" },
                      })
                    )
                  }
                >
                  {t("resources.videoWelcome")}
                </Typography.Link>
              </Row>
              <Row className="pb-2">
                <Typography.Link
                  onClick={() =>
                    dispatch(
                      openModal({
                        activeType: "RESOURCE_MODAL",
                        entity: { title: "Hello", body: "World" },
                      })
                    )
                  }
                >
                  {t("resources.videoFeatures")}
                </Typography.Link>
              </Row> */}
              <Row className="pb-2">
                <Typography.Link
                  onClick={() => window.open("/privacy_policy.pdf")}
                >
                  {t("resources.callPolicies")}
                </Typography.Link>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card title={t("faq.title")}>
              <Collapse ghost>
                {FAQ_LIST.map((faq) => (
                  <Collapse.Panel
                    key={faq.key}
                    header={
                      i18n.language === "es" ? faq.es.question : faq.en.question
                    }
                  >
                    <Typography.Text>
                      {i18n.language === "es" ? faq.es.answer : faq.en.answer}
                    </Typography.Text>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Space>
    </PageLayout>
  );
};

export default Settings;
