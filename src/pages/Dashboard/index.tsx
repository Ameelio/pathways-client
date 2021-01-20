import React, { ReactElement, useEffect } from "react";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { fetchCalls } from "src/redux/modules/call";
import { Card, Col, Layout, PageHeader, Row } from "antd";
import { selectAllCalls } from "src/redux/selectors";
import { push } from "connected-react-router";
import { format } from "date-fns";

const mapStateToProps = (state: RootState) => ({
  calls: selectAllCalls(state),
});

const mapDispatchToProps = { fetchCalls, push };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function DashboardPage({
  calls,
  fetchCalls,
  push,
}: PropsFromRedux): ReactElement {
  useEffect(() => {
    (async () => await fetchCalls())();
  }, [fetchCalls]);

  return (
    <Layout.Content>
      <PageHeader title="Your Pathway"></PageHeader>
      {calls.map((call) => (
        <Row>
          <Col span={6}>
            <Card
              title={`Call ${call.id}`}
              style={{ width: 300 }}
              onClick={() => push(`call/${call.id}`)}
            >
              <p>
                {format(new Date(call.start), "MM/dd HH:mm")} -{" "}
                {format(new Date(call.end), "MM/dd HH:mm")}
              </p>
            </Card>
          </Col>
        </Row>
      ))}
    </Layout.Content>
  );
}

export default connector(DashboardPage);
