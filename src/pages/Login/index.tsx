import React, { ReactElement } from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import {
  Input,
  Layout,
  Button,
  Form,
  Typography,
  Card,
  Space,
  Row,
  Radio,
  Table,
  Col,
} from "antd";
import { Redirect } from "react-router";
import { loginWithCredentials } from "src/api/User";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { showToast } from "src/utils/utils";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import "./index.css";
import "src/i18n/config";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "src/utils/constants";
import { push } from "connected-react-router";
import { BORDER_RADIUS } from "src/styles/Layout";

const { Content } = Layout;

const mapStateToProps = (state: RootState) => ({
  session: state.session,
});

const mapDispatchToProps = { push };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const FORM_LAYOUT = {
  labelCol: { flex: "100px" },
  wrapperCol: { flex: 1 },
};

const FORM_TAIL_LAYOUT = {
  wrapperCol: { offset: 6, span: 12 },
};

function LoginContainer({ session, push }: PropsFromRedux): ReactElement {
  const { t, i18n } = useTranslation("login");

  if (session.isLoggedIn) {
    return <Redirect to="/" />;
  }

  const onFinish = async (values: any) => {
    try {
      await loginWithCredentials({
        inmateNumber: values.inmateNumber,
        pin: values.pin,
        language: values.language,
      });
    } catch (err) {
      showToast("login_error", "Invalid ID or Pin Code", "error");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    showToast("login_error", "Invalid ID or Pin Code", "error");
  };

  return (
    <Content className="d-flex flex-column">
      <Space className="m-auto" direction="vertical" size="large">
        <Row justify="center">
          <Logo className="login-logo" />
        </Row>

        <div className="login-form-container" style={BORDER_RADIUS}>
          <Space direction="vertical" size="large">
            <Row justify="center" className="">
              <Col>
                <Typography.Title level={3}>{t("title")}</Typography.Title>
              </Col>
              <Col>
                <Typography.Text>
                  {t("caption")}{" "}
                  <Typography.Link onClick={() => push("/tos.pdf")}>
                    {t("tos")}{" "}
                  </Typography.Link>
                  {t("and")}{" "}
                  <Typography.Link onClick={() => push("/privacy_policy.pdf")}>
                    {t("pp")}.
                  </Typography.Link>{" "}
                </Typography.Text>
              </Col>
            </Row>

            <Form
              {...FORM_LAYOUT}
              name="login"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ width: "100%" }}
            >
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
                label="Language"
                name="language"
                rules={[{ required: true, message: "Language is required." }]}
              >
                <Radio.Group
                  defaultValue={Object.keys(LANGUAGES)[0]}
                  className="w-100"
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                  {Object.entries(LANGUAGES).map(([key, value]) => (
                    <Radio.Button value={key}>{value}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>

              <Form.Item {...FORM_TAIL_LAYOUT}>
                <Button type="primary" htmlType="submit" size="large" block>
                  {t("buttonText")}
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>
      </Space>
    </Content>
  );
}

export default connector(LoginContainer);
