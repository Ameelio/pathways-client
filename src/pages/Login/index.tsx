import React, { useEffect, useState } from "react";
import { RootState, useAppSelector } from "src/redux";
import {
  Input,
  Layout,
  Button,
  Form,
  Typography,
  Space,
  Row,
  Radio,
  Col,
  Select,
} from "antd";
import { Redirect } from "react-router";
import { loginWithCredentials } from "src/api/User";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { getRandomItem } from "src/utils/utils";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import "./index.css";
import "src/i18n/config";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "src/utils/constants";
import { BACKGROUNDS } from "src/constants";
import { BORDER_RADIUS } from "src/styles/Layout";
import { fetchFacilities } from "src/api/Common";
import { FacilityRO } from "src/api/interfaces/apiResponses";

const { Content } = Layout;

const FORM_LAYOUT = {
  labelCol: { flex: "95px" },
  wrapperCol: { flex: 1 },
};

const FORM_TAIL_LAYOUT = {
  wrapperCol: { span: 24 },
};

const LoginContainer: React.FC = () => {
  const { t, i18n } = useTranslation("login");
  const { Option } = Select;

  const session = useAppSelector((state: RootState) => state.session);

  const [background] = useState(getRandomItem(BACKGROUNDS));
  const [facilities, setFacilities] = useState<FacilityRO[]>([]);

  useEffect(() => {
    const getFacilityOptions = async () => {
      const response = await fetchFacilities();
      setFacilities(response.data.results);
    };
    getFacilityOptions();
  }, []);

  if (session.isLoggedIn) {
    return <Redirect to="/" />;
  }

  const onFinish = async (values: any) => {
    await loginWithCredentials({
      inmateNumber: values.inmateNumber,
      pin: values.pin,
      facilityId: values.facilityId,
      language: values.language,
    });
  };

  const facilityOptions = facilities.map((facility: FacilityRO) => (
    <Option key={`option-${facility.id}`} value={facility.id}>
      {facility.name}
    </Option>
  ));

  return (
    <Content
      className="flex flex-col banner-background"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="login-form-container m-auto" style={BORDER_RADIUS}>
        <Space direction="vertical" size="large">
          <Row>
            <Logo className="login-logo" />
          </Row>
          <Row justify="center">
            <Col>
              <Typography.Text>
                {t("caption")}{" "}
                <Typography.Link href="/tos.pdf" target="_blank">
                  {t("tos")}{" "}
                </Typography.Link>
                {t("and")}{" "}
                <Typography.Link href="/privacy_policy.pdf" target="_blank">
                  {t("pp")}.
                </Typography.Link>{" "}
              </Typography.Text>
            </Col>
          </Row>

          <Form
            {...FORM_LAYOUT}
            name="login"
            className="w-full rounded-lg"
            onFinish={onFinish}
            initialValues={{
              language: Object.keys(LANGUAGES)[0],
              pin: "abc12345678910",
            }}
          >
            <Form.Item label="Language" name="language">
              <Radio.Group
                className="w-full"
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                {Object.entries(LANGUAGES).map(([key, value]) => (
                  <Radio.Button key={key} value={key}>
                    {value}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="inmateNumber"
              label="ID Number"
              rules={[{ required: true, message: "Inmate ID is required." }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t("placeholder.inmateNumber")}
              />
            </Form.Item>

            <Form.Item
              label="PIN Code"
              name="pin"
              rules={[{ required: true, message: "Password is required." }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t("placeholder.pinCode")}
              />
            </Form.Item>
            <Form.Item
              name="facilityId"
              label="Facility"
              rules={[
                { required: true, message: "Facility must be selected." },
              ]}
            >
              <Select>{facilityOptions}</Select>
            </Form.Item>

            <Form.Item {...FORM_TAIL_LAYOUT} style={{ borderRadius: 4 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={session.status === "loading"}
              >
                {t("buttonText")}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </Content>
  );
};

export default LoginContainer;
