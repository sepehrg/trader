import React, { useEffect, lazy } from "react";
import { Redirect, Route, BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { create } from "jss";
import rtl from "jss-rtl";
import Layout from "./hoc/Layout/Layout";
import Dashboard from "./containers/dashboard/dashboard";
import Trades from "./containers/tse/trades/trades";
import Map from "./containers/dashboard/map/map";
import MarketWatch from "./containers/tse/marketWatch/marketWatch";
import Main from "./containers/sejam/pages/main";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  MuiThemeProvider,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import Login from "./components/login/login";
import OrderBook from "./containers/tse/orderBook/orderBook";
import Chart from "./containers/tse/chart/chart";
import Turnover from "./containers/tse/turnover/turnover";
import Portfolio from "./containers/tse/portfolio/portfolio";
import News from "./containers/news/news";
import Industries from "./containers/dashboard/industries/industries";
import IndustriesMap from "./containers/dashboard/industriesMap/industriesMap";
import NotifierProvider from "./components/UI/notifier/notifierProvider";
import GuardedRoute from "./guards/guardedRoute";
import AccessKeys from "./enums/accessKeys";
import * as actions from "./store/actions/index";
import MobilePortfolio from "./containers/portfolio/portfolio";
import NewsContent from "./components/newsItem/newsContent/newsContent";
import WatchlistPane from "./components/watchlistPane/watchlistPane";
import DepositMoney from "./components/depositMoney/depositMoney";
import ObserverMessage from "./components/observerMessage/observerMessage";
import ThemeModal from "./components/themeModal/themeModal";
import ProfileModal from "./components/profileModal/profileModal";
import MessagesModal from "./components/messages/messagesModal/messagesModal";
import MessagesContent from "./components/messages/messagesContent/messagesContent";
import PasswordChange from "./components/profileModal/passwordChange/passwordChange";
import ElectronicPayment from "./components/electronicPayment/electronicPayment";
import ChangeSupervisorBroker from "./components/changeSupervisorBroker/changeSupervisorBroker";
import PaymentRequest from "./components/paymentRequest/paymentRequest";
import Personalize from "./containers/personalize/personalize";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const OnlineGroup = lazy(() =>
  import("./containers/tse/onlineGroup/onlineGroup")
);
const AddAlgorithm = lazy(() =>
  import("./components/algorithm/addAlgorithm/addAlgorithm")
);
const EditAlgorithm = lazy(() =>
  import("./components/algorithm/editAlgorithm/editAlgorithm")
);
const AlgorithmList = lazy(() =>
  import("./components/algorithm/algorithmList/algorithmList")
);

const App = (props) => {
  useEffect(() => {
    if (props.user) props.fetchPermissions();
  }, []);

  return (
    <BrowserRouter>
      <StylesProvider jss={jss}>
        <MuiThemeProvider theme={props.theme}>
          <CssBaseline />
          <NotifierProvider>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route
                path="/access-denied"
                render={() => <span>Access Denied</span>}
              />
              {!props.user && <Redirect to="/" />}
              {props.permissions && (
                <Route>
                  <Layout>
                    <Switch>
                      <GuardedRoute
                        path="/news/:id"
                        component={NewsContent}
                        accessKey={AccessKeys.NewsTab}
                      />
                      <GuardedRoute
                        path="/news"
                        component={News}
                        accessKey={AccessKeys.NewsTab}
                      />
                      <GuardedRoute
                        path="/marketView"
                        exact
                        component={Dashboard}
                        accessKey={AccessKeys.IndexTab}
                        // showable
                      />
                      <GuardedRoute
                        path="/marketView/industries"
                        component={Industries}
                        accessKey={AccessKeys.IndustriesTab}
                      />
                      <GuardedRoute
                        path="/marketView/map"
                        component={Map}
                        accessKey={AccessKeys.MarketMapTab}
                      />
                      <GuardedRoute
                        path="/marketView/industriesMap"
                        component={IndustriesMap}
                        accessKey={AccessKeys.IndustriesDetailTab}
                      />
                      <GuardedRoute
                        path="/tse"
                        exact
                        component={Trades}
                        accessKey={AccessKeys.TradeTab}
                      />
                      <GuardedRoute
                        path="/tse/marketWatch"
                        component={MarketWatch}
                        accessKey={AccessKeys.MarketWatchTab}
                      />
                      <GuardedRoute
                        path="/tse/chart"
                        component={Chart}
                        accessKey={AccessKeys.TechnicalChartTab}
                      />
                      <GuardedRoute
                        path="/tse/orderBook"
                        component={OrderBook}
                        accessKey={AccessKeys.OrderBookTab}
                      />
                      <GuardedRoute
                        path="/tse/turnover"
                        component={Turnover}
                        accessKey={AccessKeys.TurnoverTab}
                      />
                      <GuardedRoute
                        path="/tse/portfolio"
                        component={Portfolio}
                        accessKey={AccessKeys.CsdAssetTab}
                      />
                      <GuardedRoute
                        path="/tse/depositMoney"
                        component={DepositMoney}
                        accessKey={AccessKeys.DepositMoneyTab}
                      />
                      <GuardedRoute
                        path="/tse/electronicPayment"
                        component={ElectronicPayment}
                        accessKey={AccessKeys.ElectronicPaymentTab}
                      />
                      <GuardedRoute
                        path="/tse/paymentRequest"
                        component={PaymentRequest}
                        accessKey={AccessKeys.PaymentRequestTab}
                      />
                      <GuardedRoute
                        path="/tse/changeSupervisorBroker"
                        component={ChangeSupervisorBroker}
                      />
                      <GuardedRoute
                        path="/tse/onlineGroup"
                        component={OnlineGroup}
                        accessKey={AccessKeys.OnlineGroupTab}
                      />
                      <GuardedRoute
                        path="/personalize"
                        component={Personalize}
                        accessKey={AccessKeys.PersonalizeTab}
                      />
                      <GuardedRoute
                        path="/sejam"
                        component={Main}
                        accessKey={AccessKeys.SejamTab}
                      />
                      <GuardedRoute
                        path="/algorithm/list"
                        component={AlgorithmList}
                        accessKey={AccessKeys.AlgorithmTab}
                      />
                      <GuardedRoute
                        path="/algorithm/new"
                        component={AddAlgorithm}
                        accessKey={AccessKeys.AlgorithmTab}
                      />
                      <GuardedRoute
                        path="/algorithm/edit/:id"
                        component={EditAlgorithm}
                        accessKey={AccessKeys.AlgorithmTab}
                      />
                      <Route path="/setting" component={ThemeModal} />
                      <Route
                        path="/draftOrdersTable"
                        render={() => <MobilePortfolio tabId={3} />}
                      />
                      <Route
                        path="/portfolio"
                        render={() => <MobilePortfolio tabId={2} />}
                      />
                      <Route
                        path="/ordersTable"
                        render={() => <MobilePortfolio tabId={1} />}
                      />
                      <Route
                        path="/tradesTable"
                        render={() => <MobilePortfolio tabId={0} />}
                      />
                      <Route path="/watchlist" component={WatchlistPane} />
                      <Route path="/profile" component={ProfileModal} />
                      <Route
                        path="/tse/observerMessage"
                        component={ObserverMessage}
                      />
                      <Route
                        path="/passwordChange"
                        component={PasswordChange}
                      />
                      <Route path="/messages/:id" component={MessagesContent} />
                      <Route exact path="/messages" component={MessagesModal} />
                    </Switch>
                  </Layout>
                </Route>
              )}
            </Switch>
          </NotifierProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.app.theme,
    user: state.account.user,
    permissions: state.account.permissions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPermissions: () => dispatch(actions.fetchPermissions()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
