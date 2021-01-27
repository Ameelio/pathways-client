import React, { ReactElement, useEffect, useState } from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { fetchCalls } from "src/redux/modules/call";
import {
  Avatar,
  Button,
  Card,
  Col,
  Layout,
  Menu,
  PageHeader,
  Row,
  Space,
  Typography,
} from "antd";
import { selectAllCalls, selectAllConnections } from "src/redux/selectors";
import { push } from "connected-react-router";
import { differenceInMinutes, format } from "date-fns";
import { QUOTES, WRAPPER_PADDING } from "src/utils/constants";
import { Call } from "src/types/Call";
import { genFullName, getRandomItem } from "src/utils/utils";
import { Quote } from "src/types/Common";
import "./index.css";
import { Connection } from "src/types/Connection";
import {
  EllipsisOutlined,
  UserAddOutlined,
  VideoCameraFilled,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

const mapStateToProps = (state: RootState) => ({
  calls: selectAllCalls(state),
  connections: selectAllConnections(state),
  firstName: state.session.user.firstName,
});

const mapDispatchToProps = { fetchCalls, push };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function DashboardPage({
  calls,
  connections,
  fetchCalls,
  push,
  firstName,
}: PropsFromRedux): ReactElement {
  const [appointments, setAppointments] = useState<
    { call: Call; connection: Connection }[]
  >([]);
  const [dailyQuote, setDailyQuote] = useState(getRandomItem(QUOTES) as Quote);

  const [currTime, setCurrTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });
  useEffect(() => {
    (async () => await fetchCalls())();
  }, [fetchCalls]);

  useEffect(() => {
    // TODO sort
    const upcoming = calls
      .filter(
        (call) =>
          (call.status === "scheduled" || call.status === "live") &&
          new Date(call.end) > new Date()
      )
      .map((call) => ({
        call,
        connection:
          connections.find((connection) => connection.id === call.id) ||
          ({
            user: { firstName: "", lastName: "", profileImgPath: "" },
          } as Connection),
      }));

    setAppointments(upcoming);
  }, [calls, connections]);

  const getStatusType = (
    connection: Connection
  ): "success" | "warning" | "danger" | "secondary" => {
    switch (connection.status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <PageHeader title={`Hi ${firstName}!`}></PageHeader>
        <Space direction="vertical" size="large" style={WRAPPER_PADDING}>
          <Row>
            <Col span={24}>
              <div>
                <Space
                  direction="vertical"
                  align="center"
                  style={{
                    backgroundImage: `url(${dailyQuote.background})`,
                    width: "100%",
                  }}
                  className="dashboard-header-container"
                >
                  <Typography.Title
                    level={3}
                    className="dashboard-header-content"
                  >
                    {format(currTime, "HH:mm")}
                  </Typography.Title>
                  <Typography.Title
                    level={5}
                    className="dashboard-header-content"
                  >
                    {dailyQuote.quote}
                  </Typography.Title>
                  <Typography.Text className="dashboard-header-content">
                    {dailyQuote.author}
                  </Typography.Text>
                </Space>
                <div style={{ width: "100%", backgroundColor: "white" }}>
                  {!appointments.length && (
                    <Card>
                      <span>No upcoming calls today</span>
                    </Card>
                  )}
                  {appointments.map((appointment) => {
                    const tMinus = differenceInMinutes(
                      new Date(appointment.call.start),
                      new Date()
                    );

                    return (
                      <Card key={appointment.call.id}>
                        <Space size="large">
                          <Avatar
                            src={appointment.connection.user.profileImgPath}
                          />
                          <div>
                            <Typography.Title level={3}>
                              Call with {appointment.connection.user.firstName}
                            </Typography.Title>
                            <Typography.Text>
                              {format(
                                new Date(appointment.call.start),
                                "HH:mm"
                              )}{" "}
                              -{" "}
                              {format(new Date(appointment.call.end), "HH:mm")}{" "}
                              | {tMinus > 0 ? "starts in " : "started "}
                              <Typography.Text
                                type={tMinus >= 0 ? "warning" : "danger"}
                              >
                                {Math.abs(tMinus)} minutes{" "}
                                {tMinus < 0 && " ago"}
                              </Typography.Text>
                            </Typography.Text>
                          </div>
                          <Space>
                            <Button
                              onClick={() =>
                                push(`call/${appointment.call.id}`)
                              }
                            >
                              <EllipsisOutlined />
                            </Button>
                            <Button
                              type="primary"
                              onClick={() =>
                                push(`call/${appointment.call.id}`)
                              }
                            >
                              Join
                            </Button>
                          </Space>
                        </Space>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <VideoCameraFilled />
                <Typography.Title level={4}>Schedule Call</Typography.Title>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <UserAddOutlined />
                <Typography.Title level={4}>Add Contact</Typography.Title>
              </Card>
            </Col>
          </Row>
        </Space>
      </Content>
      <Sider theme="light" width={400}>
        <PageHeader title={"Your Loved Ones"} />
        {connections.map((connection) => (
          <Card>
            <Card.Meta
              title={genFullName(connection.user)}
              avatar={<Avatar src={connection.user.profileImgPath} />}
              description={
                <Typography.Text type="secondary">
                  Status:{" "}
                  <Typography.Text type={getStatusType(connection)}>
                    {connection.status}
                  </Typography.Text>
                </Typography.Text>
              }
            ></Card.Meta>
          </Card>
        ))}
      </Sider>
    </Layout>
  );
}

export default connector(DashboardPage);
