import React, { useState, ReactElement } from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { Input, Layout, Button, Form, Checkbox, Typography, Card } from "antd";

// import { ReactComponent as Operator } from "src/assets/avatars/bald.svg";
// import { ReactComponent as Supervisor } from "src/assets/avatars/woman.svg";
// import { ReactComponent as Admin } from "src/assets/avatars/professor.svg";
// import { ReactComponent as Investigator } from "src/assets/avatars/investigator.svg";
// import { OPERATOR, SUPERVISOR, ADMIN, INVESTIGATOR } from "src/data/sample";

import "./index.css";
import { Redirect } from "react-router";
import { loginWithCredentials } from "src/api/User";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Content } = Layout;

const mapStateToProps = (state: RootState) => ({
  session: state.session,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function LoginContainer({ session }: PropsFromRedux): ReactElement {
  const [error, setError] = useState("");

  if (session.isLoggedIn) return <Redirect to="/" />;

  const onFinish = async (values: any) => {
    try {
      await loginWithCredentials({
        inmateNumber: values.inmateNumber,
        pin: values.pin,
      });
    } catch (err) {
      setError("Invalid ID or Pin Code");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setError("Invalid ID or Pin Code");
  };

  return (
    <Content>
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
    </Content>
  );
}

export default connector(LoginContainer);
