import React, { ReactElement, useEffect, useState } from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
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
import { getRandomItem, showToast } from "src/utils/utils";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import "./index.css";
import "src/i18n/config";
import { useTranslation } from "react-i18next";
import { LANGUAGES, QUOTES } from "src/utils/constants";
import { BORDER_RADIUS } from "src/styles/Layout";
import { Quote } from "src/types/Common";
import { fetchFacilities } from "src/api/Common";
import { FacilityRO } from "src/api/interfaces/apiResponses";

const { Content } = Layout;

const mapStateToProps = (state: RootState) => ({
  session: state.session,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const FORM_LAYOUT = {
  labelCol: { flex: "95px" },
  wrapperCol: { flex: 1 },
};

const FORM_TAIL_LAYOUT = {
  wrapperCol: { span: 24 },
};

function LoginContainer({ session }: PropsFromRedux): ReactElement {
  const { t, i18n } = useTranslation("login");
  const { Option } = Select;

  const [dailyQuote] = useState(getRandomItem(QUOTES) as Quote);
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
    try {
      await loginWithCredentials({
        inmateNumber: values.inmateNumber,
        pin: values.pin,
        facilityId: values.facilityId,
        language: values.language,
      });
    } catch (err) {
      showToast("login_error", "Invalid ID or Pin Code", "error");
    }
  };

  const onFinishFailed = (_errorInfo: any) => {
    showToast("login_error", "Invalid ID or Pin Code", "error");
  };

  const facilityOptions = facilities.map((facility: FacilityRO) => (
    <Option value={facility.id}>{facility.name}</Option>
  ));

  return (
    <Content
      className="d-flex flex-column banner-background"
      style={{
        backgroundImage: `url(${dailyQuote.background})`,
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
            onFinishFailed={onFinishFailed}
            initialValues={{
              language: Object.keys(LANGUAGES)[0],
            }}
          >
            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: "Language is required." }]}
            >
              <Radio.Group
                className="w-100"
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
              <Button type="primary" htmlType="submit" size="large">
                {t("buttonText")}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </Content>
  );
}

export default connector(LoginContainer);
