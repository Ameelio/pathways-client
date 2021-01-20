import { connectRouter, routerMiddleware } from "connected-react-router";
import { combineReducers } from "redux";
import { History, createBrowserHistory } from "history";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { sessionReducer } from "./modules/session";
import { callSlice } from "./modules/call";
import { connectionSlice } from "./modules/connection";

export const history = createBrowserHistory();

export const createRootReducer = (history: History) =>
  combineReducers({
    session: sessionReducer,
    calls: callSlice.reducer,
    connections: connectionSlice.reducer,
    router: connectRouter(history),
  });
export const rootReducer = createRootReducer(history);

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
});

export type RootState = ReturnType<typeof rootReducer>;
