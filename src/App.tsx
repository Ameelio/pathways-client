import React from "react";
import "./App.scss";
import { RootState, useAppSelector } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { ConnectedRouter, push } from "connected-react-router";
import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router";
import { History } from "history";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./components/hocs/ProtectedRoute";
import LoginPage from "src/pages/Login";
import { ROUTES } from "./utils/constants";
import { useEffect } from "react";
import { fetchConnections } from "./redux/modules/connection";
import Sidebar from "./components/menu/Sidebar";
import { useTranslation } from "react-i18next";
import Modals from "./components/Modals/Modals";

const mapDispatchToProps = { fetchConnections, push };

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({
  history,
  fetchConnections,
  push,
}: PropsFromRedux & { history: History }) {
  const { i18n } = useTranslation();
  const hasSideBar = useAppSelector((state) => state.common.fullScreen);
  const session = useAppSelector((state) => state.session);

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.authInfo.token !== "", // TODO: improve this later
    authenticationPath: "/login",
  };

  const showSideBar = session.isLoggedIn && !hasSideBar;

  useEffect(() => {
    if (session.isLoggedIn) fetchConnections();
  }, [session.isLoggedIn, fetchConnections]);

  useEffect(() => {
    i18n.changeLanguage(session.language);
  }, [session.language, i18n]);

  return (
    <ConnectedRouter history={history}>
      <Modals />
      <Layout style={{ minHeight: "100vh" }}>
        {showSideBar && <Sidebar user={session.user} navigate={push} />}
        <Layout>
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
            <Redirect to="/login" />
          </Switch>
          {/* <Footer style={{ textAlign: "center" }}>
            Connect ©2021 Created by Ameelio Inc.
          </Footer> */}
        </Layout>
      </Layout>
    </ConnectedRouter>
  );
}

export default connector(App);
