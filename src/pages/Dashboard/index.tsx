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
  PageHeader,
  Row,
  Space,
  Typography,
} from "antd";
import { selectAllConnections, selectUpcomingCalls } from "src/redux/selectors";
import { push } from "connected-react-router";
import { differenceInMinutes, format, isToday, isTomorrow } from "date-fns";
import { QUOTES, WRAPPER_PADDING } from "src/utils/constants";
import {
  genFullName,
  getInitials,
  getRandomItem,
  generateBgColor,
} from "src/utils/utils";
import { Quote } from "src/types/Common";
import "./index.css";
import { useTranslation } from "react-i18next";
import "src/i18n/config";

const { Content } = Layout;

const mapStateToProps = (state: RootState) => ({
  calls: selectUpcomingCalls(state),
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
  const { t } = useTranslation("dashboard");

  const tabList = [
    {
      key: "approved",
      tab: t("connection.approved"),
    },
    {
      key: "pending",
      tab: t("connection.pending"),
    },
  ];
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
        <div
          style={{ height: "60px", backgroundColor: "#F0DEFF", opacity: 0.4 }}
        />
        <Space
          direction="vertical"
          size="large"
          style={{ padding: 24, paddingTop: 36 }}
          className="w-100"
        >
          <Row>
            <Col span={24}>
              <div>
                <Space
                  direction="vertical"
                  align="center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundImage: `url(${dailyQuote.background})`,
                    height: "215px",
                    borderRadius: "8px",
                  }}
                  className="dashboard-header-container banner-background"
                >
                  <Typography.Title
                    className="dashboard-header-content"
                    style={{
                      paddingTop: 65,
                      paddingBottom: 0,
                      fontSize: "48px",
                      marginBottom: 0,
                    }}
                  >
                    {format(currTime, "HH:mm")}
                  </Typography.Title>
                  <Typography.Title
                    className="dashboard-header-content"
                    style={{ fontSize: "14px" }}
                  >
                    {format(currTime, "eeee, MMMM d")}
                  </Typography.Title>
                  <Typography.Title
                    level={5}
                    className="dashboard-header-content"
                    style={{ paddingTop: 35, paddingBottom: 8 }}
                  >
                    {`${dailyQuote.quote} - ${dailyQuote.author}`}
                  </Typography.Title>
                </Space>
                <div style={{ width: "100%", backgroundColor: "white" }}></div>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Card
                title={t("call.title")}
                extra={
                  <Typography.Link onClick={() => push("/")}>
                    {t("call.seeAll")}
                  </Typography.Link>
                }
                style={{ borderRadius: 8 }}
              >
                <div style={{ paddingBottom: 16 }}>
                  <Typography.Text>
                    {calls.length === 0
                      ? t("call.noCalls")
                      : `${calls.length} ${t("call.upcomingCalls")}${
                          calls.length > 1 ? "s" : ""
                        }`}
                  </Typography.Text>
                </div>
                {calls.map((call) => {
                  // const tMinus = differenceInMinutes(
                  //   new Date(call.start),
                  //   new Date()
                  // );
                  const duration = differenceInMinutes(
                    new Date(call.end),
                    new Date(call.start)
                  );

                  const started = new Date(call.start) < new Date();
                  console.log(started);

                  return (
                    <Card key={call.id}>
                      <Row justify="space-between" align="bottom">
                        <Space direction="vertical">
                          <Typography.Title level={5}>
                            {getDateLabel(new Date(call.start))}
                          </Typography.Title>
                          <Typography.Text>
                            {format(new Date(call.start), "h:mm aaa")} •{" "}
                            {`${duration} minutes`}
                            {/* {tMinus > 0 ? "starts in " : "started "}
                              <Typography.Text
                                type={tMinus >= 0 ? "warning" : "danger"}
                              >
                                {Math.abs(tMinus)} {t("call.minutes")}{" "}
                                {tMinus < 0 && `${t("call.ago")}`}
                              </Typography.Text> */}
                          </Typography.Text>
                          <Space style={{ paddingTop: 18 }}>
                            <Avatar src={call.connection.user.profileImgPath} />
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
                          {started ? (
                            <Button
                              size="large"
                              type="primary"
                              style={{ borderRadius: 4 }}
                              onClick={() => push(`call/${call.id}`)}
                            >
                              {t("call.join")}
                            </Button>
                          ) : (
                            <Button
                              size="large"
                              type="default"
                              style={{ borderRadius: 4, color: "#448AF3" }}
                              onClick={() => console.log("hello second button")}
                            >
                              {t("call.seeDetails")}
                            </Button>
                          )}
                        </Space>
                      </Row>
                    </Card>
                  );
                })}
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title={t("connection.title")}
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
