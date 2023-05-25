import * as actionTypes from "./actionTypes";
import CmdTseService from "../../services/cmdTseService";
import { themeCreator } from "../../themes/base";
import * as actions from "./index";

export const changeTheme = (themeName, customTheme) => {
  const theme = themeCreator(themeName, customTheme);
  localStorage.setItem("theme", themeName);
  localStorage.setItem("customTheme", JSON.stringify(customTheme));
  return {
    type: actionTypes.THEME_CHANGED,
    themeName,
    customTheme,
    theme,
  };
};

export const setInstrument = (isin) => {
  if (!isin)
    return {
      type: actionTypes.SET_INSTRUMENT,
      instrument: null,
    };
  return (dispatch) => {
    CmdTseService.getStockInfo(isin, (status, data) => {
      dispatch({
        type: actionTypes.SET_INSTRUMENT,
        instrument: data.Result,
      });
    });
  };
};

export const setSocket = (socket) => {
  return {
    type: actionTypes.SET_SOCKET,
    socket: socket,
  };
};

export const updateTrade = (val) => {
  return {
    type: actionTypes.UPDATE_TRADE,
    trade: val,
  };
};

export const updateClosingPrice = (val) => {
  return {
    type: actionTypes.UPDATE_CLOSING_PRICE,
    closingPrice: val,
  };
};

export const updateInstrumentStateChange = (val) => {
  return {
    type: actionTypes.UPDATE_INSTRUMENT_STATE_CHANGE,
    instrumentStateChange: val,
  };
};

export const updateBidAsk = (val) => {
  return {
    type: actionTypes.UPDATE_BIDASK,
    bidAsk: val,
  };
};

export const updateClientTrade = (val) => {
  return {
    type: actionTypes.UPDATE_CLIENT_TRADE,
    clientTrade: val,
  };
};

export const subscribe = (messageType, instrumentId, component) => {
  return {
    type: actionTypes.SUBSCRIBE,
    messageType,
    instrumentId,
    component,
  };
};

export const unsubscribe = (messageType, instrumentId, component) => {
  return {
    type: actionTypes.UNSUBSCRIBE,
    messageType,
    instrumentId,
    component,
  };
};

export const subscribeAll = (instrumentIds, messageType, component) => {
  return {
    type: actionTypes.SUBSCRIBE_ALL,
    instrumentIds,
    messageType,
    component,
  };
};

export const unsubscribeAll = (instrumentIds, messageType, component) => {
  return {
    type: actionTypes.UNSUBSCRIBE_ALL,
    instrumentIds,
    messageType,
    component,
  };
};

export const openTradeModal = (isin, side, order, isDraftEdit) => {
  return (dispatch) => {
    CmdTseService.getStockInfo(isin, (status, data) => {
      dispatch({
        type: actionTypes.OPEN_TRADE_MODAL,
        instrument: data.Result,
        side,
        order,
        isDraftEdit,
      });
    });
  };
};

export const closeTradeModal = (key) => {
  return {
    type: actionTypes.CLOSE_TRADE_MODAL,
    key,
  };
};

export const notifySuccess = (message, persist = false) => {
  return enqueueSnackbar(message, "success", persist);
};

export const notifyError = (message, persist = false) => {
  return enqueueSnackbar(message, "error", persist);
};

export const notifyWarning = (message, persist = false) => {
  return enqueueSnackbar(message, "warning", persist);
};

const enqueueSnackbar = (message, type, persist) => {
  return {
    type: actionTypes.ENQUEUE_SNACKBAR,
    notification: {
      message,
      options: {
        variant: type,
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        persist: persist,
      },
      key: new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = (key) => ({
  type: actionTypes.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key) => ({
  type: actionTypes.REMOVE_SNACKBAR,
  key,
});

export const setWatchlist = (instruments, title, userDefined) => ({
  type: actionTypes.SET_WATCHLIST,
  instruments,
  title,
  userDefined,
});

export const setMarketActivity = () => {
  return (dispatch) => {
    CmdTseService.getMarketActivity((status, data) => {
      if (data.Result.length > 0) {
        dispatch(updateMarketActivity(data.Result));
      }
    });
  };
};

export const updateMarketActivity = (marketActivity) => {
  return {
    type: actionTypes.UPDATE_MARKET_ACTIVITY,
    marketActivity,
  };
};

export const updateStaticThreshold = (staticThreshold) => {
  return {
    type: actionTypes.UPDATE_STATIC_THRESHOLD,
    staticThreshold,
  };
};

export const updateObserverMessage = (observerMessage) => {
  return {
    type: actionTypes.UPDATE_OBSERVER_MESSAGE,
    observerMessage,
  };
};

export const mkdPusherAuthenticate = () => ({
  type: actionTypes.MKD_PUSHER_AUTHENTICATE,
  meta: { type: "mkdPusher" },
});

export const mkdPusherLogout = () => ({
  type: actionTypes.MKD_PUSHER_LOGOUT,
  meta: { type: "mkdPusher" },
});

export const mkdPusherSubscribe = (isin) => ({
  type: actionTypes.MKD_PUSHER_SUBSCRIBE,
  isin: isin,
  meta: { type: "mkdPusher" },
});

export const mkdPusherUnsubscribe = (isin) => ({
  type: actionTypes.MKD_PUSHER_UNSUBSCRIBE,
  isin: isin,
  meta: { type: "mkdPusher" },
});

export const mkdSetInitData = (data) => ({
  type: actionTypes.MKD_SET_INIT_DATA,
  data,
});

export const mkdSetData = (data) => ({
  type: actionTypes.MKD_SET_DATA,
  data,
});

export const setBackButton = (state) => ({
  type: actionTypes.SET_BACK_BUTTON,
  state,
});

export const setPageTitle = (pageTitle) => ({
  type: actionTypes.SET_PAGE_TITLE,
  pageTitle,
});

export const addWidgetItem = (item) => ({
  type: actionTypes.ADD_WIDGET_ITEM,
  item,
});

export const removeWidgetItem = (item) => ({
  type: actionTypes.REMOVE_WIDGET_ITEM,
  item,
});

export const setWidgetItems = (items) => {
  localStorage.setItem("widgetItems", JSON.stringify(items));
  return {
    type: actionTypes.SET_WIDGET_ITEMS,
    items,
  };
};

export const setTradeSide = (tradeSide) => ({
  type: actionTypes.SET_TRADE_SIDE,
  tradeSide,
});

export const setIsTourOpen = (state) => ({
  type: actionTypes.SET_IS_TOUR_OPEN,
  state,
});

export const setAlgorithmNotification = (state) => ({
  type: actionTypes.SET_ALGORITM_NOTIFICATION,
  state,
});

export const clearAlgorithmNotification = (state) => ({
  type: actionTypes.CLEAR_ALGORITM_NOTIFICATION,
  state,
});

export const notifyAlgorithm = (message) => {
  if (message.Success) return actions.notifySuccess(message.Message);
  else return actions.notifyError(message.Message);
};
