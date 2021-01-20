import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RootState } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Layout } from "antd";
import { Route, Switch } from "react-router";
import { History } from "history";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./components/hocs/ProtectedRoute";
import LoginPage from "src/pages/Login";
import { ROUTES } from "./utils/constants";
import { useEffect } from "react";
import { fetchConnections } from "./redux/modules/connection";

const mapStateToProps = (state: RootState) => ({
  session: state.session,
});
const mapDispatchToProps = { fetchConnections };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({
  session,
  history,
  fetchConnections,
}: PropsFromRedux & { history: History }) {
  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.authInfo.token !== "", // TODO: improve this later
    authenticationPath: "/login",
  };

  useEffect(() => {
    if (session.isLoggedIn) fetchConnections();
  }, [session.isLoggedIn]);

  return (
    <ConnectedRouter history={history}>
      <Layout style={{ minHeight: "100vh" }}>
        <Switch>
          <Route exact path="/login" component={LoginPage}></Route>
          {ROUTES.map((route) => (
            <ProtectedRoute
              exact
              {...defaultProtectedRouteProps}
              path={route.path}
              component={route.component}
              key={route.label}
            ></ProtectedRoute>
          ))}
        </Switch>
        <Layout.Footer style={{ textAlign: "center" }}>
          Connect ©2021 Created by Ameelio Inc.
        </Layout.Footer>
      </Layout>
    </ConnectedRouter>
  );
}

export default connector(App);
