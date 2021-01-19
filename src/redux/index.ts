import { connectRouter, routerMiddleware } from "connected-react-router";
import { combineReducers } from "redux";
import { History, createBrowserHistory } from "history";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { sessionReducer } from "./modules/session";

export const history = createBrowserHistory();

export const createRootReducer = (history: History) =>
  combineReducers({
    session: sessionReducer,
    router: connectRouter(history),
  });
export const rootReducer = createRootReducer(history);

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
});

export type RootState = ReturnType<typeof rootReducer>;
