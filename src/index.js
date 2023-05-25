// import './wdyr'
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import appReducer from "./store/reducers/app";
import accountReducer from "./store/reducers/account";
import tseOmsReducer from "./store/reducers/tseOms";
import cstPusher from "./store/middlewares/cstPusher";
import cmdPusher from "./store/middlewares/cmdPusher";
import mkdPusher from "./store/middlewares/mkdPusher";
import asyncDispatch from "./store/middlewares/asyncDispatch";
import { AppProvider } from "./services/appContext";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({
  app: appReducer,
  account: accountReducer,
  tseOms: tseOmsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, cstPusher, cmdPusher, mkdPusher, asyncDispatch)
  )
);

const app = (
  <AppProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AppProvider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
