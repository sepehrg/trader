import * as actionTypes from "../actions/actionTypes";
import { updateObject, replaceItemAtIndex } from "../../shared/utility";
import { themeCreator } from "../../themes/base";
import widgets from "../../containers/personalize/widgets";

const initialState = {
  themeName: localStorage.getItem("theme") ?? "darkBlueTheme",
  customTheme: JSON.parse(localStorage.getItem("customTheme")),
  theme: themeCreator(
    localStorage.getItem("theme") ?? "darkBlueTheme",
    JSON.parse(localStorage.getItem("customTheme"))
  ),
  widgetItems: JSON.parse(localStorage.getItem("widgetItems")) || [],
  instrument: null,
  socket: null,
  trade: null,
  closingPrice: null,
  instrumentStateChange: null,
  clientTrade: null,
  subscribeList: [],
  openedModals: [],
  notifications: [],
  watchlistInstruments: null,
  watchlistTitle: null,
  userDefinedWatchlist: false,
  marketActivity: [],
  staticThreshold: null,
  observerMessage: null,
  marketDepth: null,
  marketDepthUpdate: null,
  backButton: false,
  pageTitle: "",
  tradeSide: 0,
  isTourOpen: false,
  algorithmNotifications: [],
};

const themeChanged = (state, action) => {
  return updateObject(state, {
    themeName: action.themeName,
    customTheme: action.customTheme,
    theme: action.theme,
  });
};

const setInstrument = (state, action) => {
  return updateObject(state, {
    instrument: action.instrument,
  });
};

const setSocket = (state, action) => {
  return updateObject(state, {
    socket: action.socket,
  });
};

const updateTrade = (state, action) => {
  return updateObject(state, {
    trade: action.trade,
  });
};

const updateClosingPrice = (state, action) => {
  return updateObject(state, {
    closingPrice: action.closingPrice,
  });
};

const updateInstrumentStateChange = (state, action) => {
  return updateObject(state, {
    instrumentStateChange: action.instrumentStateChange,
  });
};

const updateBidAsk = (state, action) => {
  return updateObject(state, {
    bidAsk: action.bidAsk,
  });
};

const updateClientTrade = (state, action) => {
  return updateObject(state, {
    clientTrade: action.clientTrade,
  });
};

const updateMarketActivity = (state, action) => {
  if (Array.isArray(action.marketActivity))
    //data from api
    return updateObject(state, {
      marketActivity: action.marketActivity,
    });
  else {
    //data from socket
    const index = state.marketActivity.findIndex(
      (m) => m.Flow === action.marketActivity.Flow
    );
    return updateObject(state, {
      marketActivity: replaceItemAtIndex(
        state.marketActivity,
        index,
        action.marketActivity
      ),
    });
  }
};

const updateStaticThreshold = (state, action) => {
  return updateObject(state, {
    staticThreshold: action.staticThreshold,
  });
};

const updateObserverMessage = (state, action) => {
  return updateObject(state, {
    observerMessage: action.observerMessage,
  });
};

const subscribe = (state, action) => {
  const { instrumentId, messageType, component } = action;
  if (!instrumentId) {
    action.asyncDispatch({
      type: actionTypes.CMD_PUSHER_SUBSCRIBE,
      payload: messageType,
      meta: { type: "cmdPusher" },
    });
    return state;
  }

  const { subscribeList } = state;
  const subscribe = subscribeList.filter(
    (s) => s.instrumentId === instrumentId && s.messageType === messageType
  )[0];
  if (subscribe) {
    if (subscribe.components.includes(component)) return state;
    else {
      subscribeList.forEach((s) => {
        if (s.instrumentId === instrumentId && s.messageType === messageType)
          s.components.push(component);
      });
      state = { ...state, subscribeList: subscribeList };
    }
  } else {
    subscribeList.push({
      instrumentId: instrumentId,
      messageType: messageType,
      components: [component],
    });
    updateObject(state, {
      subscribeList,
    });
    action.asyncDispatch({
      type: actionTypes.CMD_PUSHER_SUBSCRIBE,
      payload: {
        message: messageType,
        id: instrumentId,
      },
      meta: { type: "cmdPusher" },
    });
  }
  // console.log(
  //   "subscribe",
  //   instrumentId,
  //   messageType,
  //   component,
  //   state.subscribeList
  // );
  return state;
};

const unsubscribe = (state, action) => {
  const { instrumentId, messageType, component } = action;
  const { subscribeList } = state;
  const subscribe = subscribeList.filter(
    (s) => s.instrumentId === instrumentId && s.messageType === messageType
  )[0];
  if (subscribe) {
    if (subscribe.components.includes(component)) {
      if (subscribe.components.length > 1) {
        subscribeList.forEach((s) => {
          if (
            s.instrumentId === instrumentId &&
            s.messageType === messageType
          ) {
            const index = s.components.indexOf(component);
            if (index > -1) s.components.splice(index, 1);
          }
        });
        state = { ...state, subscribeList: subscribeList };
      } else {
        const newSubscribeList = subscribeList.filter(
          (s) =>
            s.instrumentId !== instrumentId || s.messageType !== messageType
        );

        state = { ...state, subscribeList: newSubscribeList };

        action.asyncDispatch({
          type: actionTypes.CMD_PUSHER_UNSUBSCRIBE,
          message: messageType,
          id: instrumentId,
          meta: { type: "cmdPusher" },
        });
      }
    }
  }
  // console.log(
  //   "unsubscribe",
  //   instrumentId,
  //   messageType,
  //   component,
  //   state.subscribeList
  // );
  return state;
};

const subscribeAll = (state, action) => {
  const { instrumentIds, messageType, component } = action;
  const { subscribeList } = state;
  // console.log("state", subscribeList)
  const messageBody = [];
  let newSubscribeList = [];

  instrumentIds.forEach((id) => {
    const subscribe = subscribeList.filter(
      (s) => s.instrumentId === id && s.messageType === messageType
    )[0];

    if (subscribe) {
      if (subscribe.components.includes(component)) return;
      else {
        subscribeList.forEach((s) => {
          if (s.instrumentId === id && s.messageType === messageType) {
            s.components.push(component);
            messageBody.push({ id, message: messageType });
          }
        });
      }
    } else {
      newSubscribeList.push({
        instrumentId: id,
        messageType: messageType,
        components: [component],
      });
      messageBody.push({ id, message: messageType });
    }
  });
  state = { ...state, subscribeList: [...subscribeList, ...newSubscribeList] };
  action.asyncDispatch({
    type: actionTypes.CMD_PUSHER_SUBSCRIBE_ALL,
    messageBody,
    meta: { type: "cmdPusher" },
  });

  // console.log(
  //   "subAll",
  //   instrumentIds,
  //   messageType,
  //   component,
  //   state.subscribeList
  // );
  return state;
};

const unsubscribeAll = (state, action) => {
  const { instrumentIds, messageType, component } = action;
  const { subscribeList } = state;
  const messageBody = [];
  let newSubscribeList = [];

  instrumentIds.forEach((id) => {
    const subscribe = subscribeList.filter(
      (s) => s.instrumentId === id && s.messageType === messageType
    )[0];

    if (subscribe) {
      if (subscribe.components.includes(component)) {
        newSubscribeList = subscribeList.filter(
          (s) => s.instrumentId !== id && s.messageType !== messageType
        );
        if (subscribe.components.length > 1)
          newSubscribeList.push({
            instrumentId: id,
            messageType: messageType,
            components: subscribe.components.filter((c) => c !== component),
          });
        messageBody.push({ id, message: messageType });
      }
    }
  });
  state = { ...state, subscribeList: newSubscribeList };
  if (messageBody.length > 1)
    action.asyncDispatch({
      type: actionTypes.CMD_PUSHER_UNSUBSCRIBE_ALL,
      messageBody,
      meta: { type: "cmdPusher" },
    });

  // console.log(
  //   "unsubAll",
  //   instrumentIds,
  //   messageType,
  //   component,
  //   state.subscribeList
  // );
  return state;
};

const openTradeModal = (state, action) => {
  return updateObject(state, {
    openedModals: [
      ...state.openedModals,
      {
        instrument: action.instrument,
        side: action.side,
        key: state.openedModals.length + 1,
        order: action.order,
        isDraftEdit: action.isDraftEdit,
      },
    ],
  });
};

const closeTradeModal = (state, action) => {
  return updateObject(state, {
    openedModals: state.openedModals.filter((m) => m.key !== action.key),
  });
};

const enqueueSnackbar = (state, action) => {
  return {
    ...state,
    notifications: [
      ...state.notifications,
      {
        key: action.key,
        ...action.notification,
      },
    ],
  };
};

const closeSnackbar = (state, action) => {
  return {
    ...state,
    notifications: state.notifications.map((notification) =>
      action.dismissAll || notification.key === action.key
        ? { ...notification, dismissed: true }
        : { ...notification }
    ),
  };
};

const removeSnackbar = (state, action) => {
  return {
    ...state,
    notifications: state.notifications.filter(
      (notification) => notification.key !== action.key
    ),
  };
};

const setWatchlist = (state, action) => {
  return updateObject(state, {
    watchlistInstruments: action.instruments,
    watchlistTitle: action.title,
    userDefinedWatchlist: action.userDefined,
  });
};

const setMarketDepth = (state, action) => {
  return updateObject(state, {
    marketDepth: action.data,
  });
};

const updateMarketDepth = (state, action) => {
  return updateObject(state, {
    marketDepthUpdate: action.data,
  });
};

const setBackButton = (state, action) => {
  return updateObject(state, {
    backButton: action.state,
  });
};

const setPageTitle = (state, action) => {
  return updateObject(state, {
    pageTitle: action.pageTitle,
  });
};

const addWidgetItem = (state, action) => {
  return {
    ...state,
    widgetItems: !state.widgetItems.find((i) => i.i === action.item)
      ? [...state.widgetItems, widgets.find((w) => w.i === action.item)]
      : state.widgetItems,
  };
};

const removeWidgetItem = (state, action) => {
  return {
    ...state,
    widgetItems: state.widgetItems.filter((i) => i.i !== action.item),
  };
};

const setWidgetItems = (state, action) => {
  return {
    ...state,
    widgetItems: action.items,
  };
};

const setTradeSide = (state, action) => {
  return {
    ...state,
    tradeSide: action.tradeSide,
  };
};

const setIsTourOpen = (state, action) => {
  return updateObject(state, {
    isTourOpen: action.state,
  });
};

const setAlgorithmNotification = (state, action) => {
  return updateObject(state, {
    algorithmNotifications: [
      ...state.algorithmNotifications,
      new Date(action.state.EntryDate).Time() + " | " + action.state.Message,
    ],
  });
};

const clearAlgorithmNotification = (state, action) => {
  return updateObject(state, {
    algorithmNotifications: [],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.THEME_CHANGED:
      return themeChanged(state, action);
    case actionTypes.SET_INSTRUMENT:
      return setInstrument(state, action);
    case actionTypes.SET_SOCKET:
      return setSocket(state, action);
    case actionTypes.UPDATE_TRADE:
      return updateTrade(state, action);
    case actionTypes.UPDATE_CLOSING_PRICE:
      return updateClosingPrice(state, action);
    case actionTypes.UPDATE_INSTRUMENT_STATE_CHANGE:
      return updateInstrumentStateChange(state, action);
    case actionTypes.UPDATE_BIDASK:
      return updateBidAsk(state, action);
    case actionTypes.UPDATE_CLIENT_TRADE:
      return updateClientTrade(state, action);
    case actionTypes.UPDATE_MARKET_ACTIVITY:
      return updateMarketActivity(state, action);
    case actionTypes.UPDATE_STATIC_THRESHOLD:
      return updateStaticThreshold(state, action);
    case actionTypes.UPDATE_OBSERVER_MESSAGE:
      return updateObserverMessage(state, action);
    case actionTypes.SUBSCRIBE:
      return subscribe(state, action);
    case actionTypes.UNSUBSCRIBE:
      return unsubscribe(state, action);
    case actionTypes.SUBSCRIBE_ALL:
      return subscribeAll(state, action);
    case actionTypes.UNSUBSCRIBE_ALL:
      return unsubscribeAll(state, action);
    case actionTypes.OPEN_TRADE_MODAL:
      return openTradeModal(state, action);
    case actionTypes.CLOSE_TRADE_MODAL:
      return closeTradeModal(state, action);
    case actionTypes.ENQUEUE_SNACKBAR:
      return enqueueSnackbar(state, action);
    case actionTypes.CLOSE_SNACKBAR:
      return closeSnackbar(state, action);
    case actionTypes.REMOVE_SNACKBAR:
      return removeSnackbar(state, action);
    case actionTypes.SET_WATCHLIST:
      return setWatchlist(state, action);
    case actionTypes.MKD_SET_INIT_DATA:
      return setMarketDepth(state, action);
    case actionTypes.MKD_SET_DATA:
      return updateMarketDepth(state, action);
    case actionTypes.SET_BACK_BUTTON:
      return setBackButton(state, action);
    case actionTypes.SET_PAGE_TITLE:
      return setPageTitle(state, action);
    case actionTypes.ADD_WIDGET_ITEM:
      return addWidgetItem(state, action);
    case actionTypes.REMOVE_WIDGET_ITEM:
      return removeWidgetItem(state, action);
    case actionTypes.SET_WIDGET_ITEMS:
      return setWidgetItems(state, action);
    case actionTypes.SET_TRADE_SIDE:
      return setTradeSide(state, action);
    case actionTypes.SET_IS_TOUR_OPEN:
      return setIsTourOpen(state, action);
    case actionTypes.SET_ALGORITM_NOTIFICATION:
      return setAlgorithmNotification(state, action);
    case actionTypes.CLEAR_ALGORITM_NOTIFICATION:
      return clearAlgorithmNotification(state, action);
    default:
      return state;
  }
};

export default reducer;

Date.prototype.Time = function () {
  return (
    (this.getHours() < 10 ? "0" : "") +
    this.getHours() +
    ":" +
    (this.getMinutes() < 10 ? "0" : "") +
    this.getMinutes() +
    ":" +
    (this.getSeconds() < 10 ? "0" : "") +
    this.getSeconds()
  );
};
