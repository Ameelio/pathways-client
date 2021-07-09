import { connectRouter, routerMiddleware } from "connected-react-router";
import { combineReducers } from "redux";
import { History, createHashHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./modules/session";
import { callSlice } from "./modules/call";
import { connectionSlice } from "./modules/connection";
import { modalsSlice } from "src/redux/modules/modalsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { commonSlice } from "src/components/Common/commonSlice";
import { contactsSlice } from "./modules/contactsSlice";
import { chatMessageSlice } from "./modules/messages";
import { inPersonVisitSlice } from "./modules/inPersonVisit";

export const history = createHashHistory();

export const createRootReducer = (history: History) =>
  combineReducers({
    common: commonSlice.reducer,
    session: sessionReducer,
    calls: callSlice.reducer,
    inPersonVisits: inPersonVisitSlice.reducer,
    contacts: contactsSlice.reducer,
    modals: modalsSlice.reducer,
    connections: connectionSlice.reducer,
    chats: chatMessageSlice.reducer,
    router: connectRouter(history),
  });
export const rootReducer = createRootReducer(history);

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
