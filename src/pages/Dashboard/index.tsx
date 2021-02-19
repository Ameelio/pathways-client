import React, { ReactElement, useEffect, useState } from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { fetchCalls } from "src/redux/modules/call";
import {
  Avatar,
  Badge,
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
import {
  selectAllCallInfo,
  selectAllCalls,
  selectAllConnections,
} from "src/redux/selectors";
import { push } from "connected-react-router";
import { differenceInMinutes, format, isToday, isTomorrow } from "date-fns";
import { QUOTES, WRAPPER_PADDING } from "src/utils/constants";
import { BaseCall } from "src/types/Call";
import {
  genFullName,
  getInitials,
  getRandomItem,
  generateBgColor,
  notEmpty,
} from "src/utils/utils";
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
  calls: selectAllCalls(state)
    .map((call) => selectAllCallInfo(state, call.id))
    .filter(notEmpty)
    .filter((call) => call.status !== "ended" && call.status !== "terminated"),
  connections: selectAllConnections(state),
  firstName: state.session.user.firstName,
});

const mapDispatchToProps = { fetchCalls, push };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const tabList = [
  {
    key: "approved",
    tab: "Approved",
  },
  {
    key: "pending",
    tab: "Pending",
  },
];

function DashboardPage({
  calls,
  connections,
  fetchCalls,
  push,
  firstName,
}: PropsFromRedux): ReactElement {
  const [dailyQuote] = useState(getRandomItem(QUOTES) as Quote);

  const [currTime, setCurrTime] = useState(new Date());
  const [activeContactTab, setActiveContactTab] = useState("approved");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });
  useEffect(() => {
    (async () => await fetchCalls())();
  }, [fetchCalls]);

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMMM d");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <PageHeader title={`Hi ${firstName}!`}></PageHeader>
        <Space
          direction="vertical"
          size="large"
          style={WRAPPER_PADDING}
          className="w-100"
        >
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
                  <div>
                    <Typography.Title
                      level={2}
                      className="dashboard-header-content"
                    >
                      {format(currTime, "HH:mm")}
                    </Typography.Title>
                    {/* <Typography.Text>{format(currTime, "EEEE MMMM dd")}</Typography.Text> */}
                  </div>
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
                <div style={{ width: "100%", backgroundColor: "white" }}></div>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Card
                title="Upcoming Calls"
                extra={
                  <Typography.Link onClick={() => push("/")}>
                    See All
                  </Typography.Link>
                }
              >
                {!calls.length && (
                  <Typography.Text>No upcoming calls</Typography.Text>
                )}
                <Space></Space>
                {calls.map((call) => {
                  const tMinus = differenceInMinutes(
                    new Date(call.start),
                    new Date()
                  );

                  return (
                    <Badge.Ribbon text={isToday(currTime) ? "Today" : ""}>
                      <Card key={call.id}>
                        <Row justify="space-between" align="bottom">
                          <Space direction="vertical">
                            <Typography.Title level={5}>
                              {getDateLabel(new Date(call.start))}
                            </Typography.Title>
                            <Typography.Text>
                              {format(new Date(call.start), "HH:mm")} -{" "}
                              {format(new Date(call.end), "HH:mm")} •{" "}
                              {tMinus > 0 ? "starts in " : "started "}
                              <Typography.Text
                                type={tMinus >= 0 ? "warning" : "danger"}
                              >
                                {Math.abs(tMinus)} minutes{" "}
                                {tMinus < 0 && " ago"}
                              </Typography.Text>
                            </Typography.Text>
                            <Space>
                              <Avatar
                                src={call.connection.user.profileImgPath}
                              />
                              <Typography.Text type="secondary">
                                {genFullName(call.connection.user)}
                              </Typography.Text>
                            </Space>
                          </Space>
                          <Space>
                            {/* TODO: add back this button with call options */}
                            {/* <Button
                              onClick={() =>
                                push(`call/${call.id}`)
                              }
                            >
                              <EllipsisOutlined />
                            </Button> */}
                            <Button
                              size="large"
                              type="primary"
                              onClick={() => push(`call/${call.id}`)}
                            >
                              Join
                            </Button>
                          </Space>
                        </Row>
                      </Card>
                    </Badge.Ribbon>
                  );
                })}
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Connections"
                tabList={tabList}
                activeTabKey={activeContactTab}
                onTabChange={(key) => setActiveContactTab(key)}
              >
                <Row justify="space-around">
                  {connections
                    .filter(
                      (connection) => connection.status === activeContactTab
                    )
                    .map((connection) => (
                      <Col
                        key={connection.id}
                        className="d-flex flex-column align-items-center"
                      >
                        <Space direction="vertical">
                          <Avatar
                            size={80}
                            style={{
                              backgroundColor: generateBgColor(
                                genFullName(connection.user)
                              ),
                            }}
                          >
                            {getInitials(genFullName(connection.user))}
                          </Avatar>
                          <Typography.Text>
                            {genFullName(connection.user)}
                          </Typography.Text>
                        </Space>
                      </Col>
                    ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}

export default connector(DashboardPage);
