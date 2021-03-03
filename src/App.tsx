import React from "react";
import "./App.scss";
import { RootState } from "src/redux";
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

const mapStateToProps = (state: RootState) => ({
  session: state.session,
  pathname: state.router.location.pathname,
});
const mapDispatchToProps = { fetchConnections, push };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({
  session,
  history,
  pathname,
  fetchConnections,
  push,
}: PropsFromRedux & { history: History }) {
  const { i18n } = useTranslation();

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.authInfo.token !== "", // TODO: improve this later
    authenticationPath: "/login",
  };

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
        <Sidebar
          navigate={(path: string) => push(path)}
          isVisible={session.isLoggedIn}
          pathname={pathname}
        />
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
