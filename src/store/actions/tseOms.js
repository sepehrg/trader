import * as actionTypes from "./actionTypes";
import * as actions from "./index";
import TseOmsService from "../../services/tseOmsService";
import TseCfaService from "../../services/tseCfaService";
import TseBofService from "../../services/tseBofService";
import TseOnlineGroup from "../../services/tseOnlineGroup";

export const cstPusherSubscribe = () => ({
  type: actionTypes.CST_PUSHER_SUBSCRIBE,
  meta: { type: "cstPusher" },
});

export const cmdPusherConnect = () => ({
  type: actionTypes.CMD_PUSHER_CONNECT,
  meta: { type: "cmdPusher" },
});

export const cstPusherUnsubscribe = () => ({
  type: actionTypes.CST_PUSHER_UNSUBSCRIBE,
  meta: { type: "cstPusher" },
});

export const fetchOrders = (onlineGroup = false) => {
  return (dispatch) => {
    if (!onlineGroup)
      TseOmsService.getIdentityActiveOrderBookInfos((status, data) => {
        dispatch(setOrders(data.Result));
      });
    else
      TseOnlineGroup.getActiveOrderBookInfos((status, data) => {
        dispatch(setOrders(data.Result));
      });
  };
};

export const fetchDraftOrders = () => {
  return (dispatch) => {
    TseOmsService.getIdentityDraftOrderBookInfos((status, data) => {
      if (status === 200) dispatch(setDraftOrders(data.Result));
      else dispatch(actions.notifyError("خطا در دریافت پیش‌نویس سفارشات"));
    });
  };
};

export const orderRegister = (message) => {
  if (!message.IsSuccess) {
    return actions.notifyError(message.Message);
  } else {
    return addOrder(message.OrderBookInfoMessage);
  }
};

export const orderUpdateOrCancel = (message) => {
  if (!message.IsSuccess) {
    return actions.notifyError(message.Message);
  } else {
    return updateOrder(message.OrderBookInfoMessage);
  }
};

export const orderRegisterConfirmation = (message) => {
  return (dispatch) => {
    if (!message.IsSuccess) {
      dispatch(actions.notifyError(message.Message));
      dispatch(removeOrder(message.OrderBookInfoMessage));
    } else {
      return dispatch(updateOrder(message.OrderBookInfoMessage));
    }
  };
};

export const orderUpdateConfirmation = (message) => {
  if (!message.IsSuccess) {
    return actions.notifyError(message.Message);
  } else {
    return updateOrder(message.OrderBookInfoMessage);
  }
};

export const orderExecution = (message) => {
  if (!message.IsSuccess) {
    return actions.notifyError(message.Message);
  } else {
    if (message.OrderBookInfoMessage.OrderStatusId === 128)
      return removeOrder(message.OrderBookInfoMessage);
    else return updateOrder(message.OrderBookInfoMessage);
  }
};

export const orderCancelConfirmation = (message) => {
  if (!message.IsSuccess) {
    return actions.notifyError(message.Message);
  } else {
    return removeOrder(message.OrderBookInfoMessage);
  }
};

export const setOrders = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const setDraftOrders = (draftOrders) => {
  return {
    type: actionTypes.FETCH_DRAFT_ORDERS_SUCCESS,
    draftOrders,
  };
};

export const addOrder = (order) => {
  return {
    type: actionTypes.ADD_ORDER,
    order,
  };
};

export const removeOrder = (order) => {
  return {
    type: actionTypes.REMOVE_ORDER,
    order,
  };
};

export const updateOrder = (order) => {
  return {
    type: actionTypes.UPDATE_ORDER,
    order,
  };
};

export const setAccountState = (accountState) => {
  return {
    type: actionTypes.SET_ACCOUNT_STATE,
    accountState,
  };
};

export const fetchAccountState = () => {
  return (dispatch) => {
    TseCfaService.getAccountState((status, data) => {
      dispatch(setAccountState(data));
    });
  };
};

export const fetchSpecialInstruments = () => {
  return (dispatch) => {
    TseBofService.getSpecialInstruments((status, data) => {
      if (data && data.IpoInstrumentModels.length > 0)
        dispatch(setIpoInstruments(data.IpoInstrumentModels));
      if (data && data.UnderCautionInstrumentModels.length > 0)
        dispatch(setUnderCautionInstruments(data.UnderCautionInstrumentModels));
    });
  };
};

export const setIpoInstruments = (instruments) => {
  return {
    type: actionTypes.SET_IPO_INSTRUMENTS,
    instruments,
  };
};

export const setUnderCautionInstruments = (instruments) => {
  return {
    type: actionTypes.SET_UNDER_CAUTION_INSTRUMENTS,
    instruments,
  };
};

export const fetchTrades = () => {
  return (dispatch) => {
    TseOmsService.getIdentityCurrentDayTradeInfos((status, data) => {
      dispatch(setTrades(data.Result));
    });
  };
};

export const setTrades = (trades) => {
  return {
    type: actionTypes.FETCH_TRADES_SUCCESS,
    trades,
  };
};

export const fetchPortfolio = () => {
  return (dispatch) => {
    TseOmsService.getIdentityAssetInfos((status, data) => {
      dispatch(setPortfolio(data.Result));
    });
  };
};

export const setPortfolio = (portfolio) => {
  return {
    type: actionTypes.FETCH_PORTFOLIO_SUCCESS,
    portfolio,
  };
};

export const tradeRegister = (trade) => {
  return {
    type: actionTypes.TRADE_REGISTER,
    trade: trade.TradeInfoMessage,
  };
};

export const tradeCancel = (trade) => {
  return {
    type: actionTypes.TRADE_CANCEL,
    trade: trade.TradeInfoMessage,
  };
};

export const refreshPortfolio = (asset) => {
  if (asset.AssetInfoMessage.Quantity <= 0)
    return removeAsset(asset.AssetInfoMessage);
  else return updateAsset(asset.AssetInfoMessage);
};

export const removeAsset = (asset) => {
  return {
    type: actionTypes.REMOVE_ASSET,
    asset,
  };
};

export const updateAsset = (asset) => {
  return {
    type: actionTypes.UPDATE_ASSET,
    asset,
  };
};

export const notifyUserLogin = (message) => {
  return actions.notifyWarning(message.Message, true);
};
