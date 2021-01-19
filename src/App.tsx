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
import { loginWithToken } from "./api/User";
import { useEffect } from "react";

const mapStateToProps = (state: RootState) => ({
  session: state.session,
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({ session, history }: PropsFromRedux & { history: History }) {
  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.authInfo.apiToken !== "", // TODO: improve this later
    authenticationPath: "/login",
  };

  useEffect(() => {
    // localStorage.setItem("debug", "*");
    localStorage.removeItem("debug");
    (async () => {
      try {
        await loginWithToken();
        // await loadData();
      } catch (err) {}
    })();
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Layout style={{ minHeight: "100vh" }}>
        <Switch>
          <Route exact path="/" component={LoginPage}></Route>
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
      </Layout>
    </ConnectedRouter>
  );
}

export default connector(App);
