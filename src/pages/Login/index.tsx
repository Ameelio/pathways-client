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
} from "antd";
import { Redirect } from "react-router";
import { loginWithCredentials } from "src/api/User";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { showToast } from "src/utils/utils";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import "./index.css";

const { Content } = Layout;

const mapStateToProps = (state: RootState) => ({
  session: state.session,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function LoginContainer({ session }: PropsFromRedux): ReactElement {
  if (session.isLoggedIn) {
    return <Redirect to="/" />;
  }

  const onFinish = async (values: any) => {
    try {
      await loginWithCredentials({
        inmateNumber: values.inmateNumber,
        pin: values.pin,
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

        <Card className="login-form-container">
          <Typography.Title level={3}>Welcome to Pathways!</Typography.Title>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="login-form"
          >
            <Form.Item
              name="inmateNumber"
              rules={[{ required: true, message: "Inmate ID is required." }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Inmate Number"
              />
            </Form.Item>

            <Form.Item
              name="pin"
              rules={[{ required: true, message: "Password is required." }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Pin Code"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Content>
  );
}

export default connector(LoginContainer);
