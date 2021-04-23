import React, { useState } from "react";
import "./App.scss";
import { useAppSelector } from "src/redux";
import { connect, ConnectedProps } from "react-redux";
import { ConnectedRouter, push } from "connected-react-router";
import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router";
import { History } from "history";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./components/Hocs/ProtectedRoute";
import LoginPage from "src/pages/Login";
import { ROUTES } from "./utils/constants";
import { useEffect } from "react";
import { fetchContacts } from "./redux/modules/contactsSlice";
import Sidebar from "./components/Sidebar";
import { useTranslation } from "react-i18next";
import Modals from "./components/Modals/Modals";
import Loader from "./components/Loader";

const mapDispatchToProps = { fetchContacts, push };

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({
  history,
  fetchContacts,
  push,
}: PropsFromRedux & { history: History }) {
  const { i18n } = useTranslation();
  const hasSideBar = useAppSelector((state) => state.common.fullScreen);
  const session = useAppSelector((state) => state.session);

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.isLoggedIn, // TODO: improve this later
    authenticationPath: "/login",
  };

  const showSideBar = session.isLoggedIn && !hasSideBar;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session.isLoggedIn) {
      setLoading(true);
      fetchContacts();
      setLoading(false);
    }
  }, [session.isLoggedIn, fetchContacts]);

  useEffect(() => {
    i18n.changeLanguage(session.language);
  }, [session.language, i18n]);

  return (
    <ConnectedRouter history={history}>
      <Modals />
      <Layout className="min-h-screen">
        {showSideBar && <Sidebar user={session.user} navigate={push} />}
        {loading ? (
          <Loader fullPage />
        ) : (
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
          </Layout>
        )}
      </Layout>
    </ConnectedRouter>
  );
}

export default connector(App);
