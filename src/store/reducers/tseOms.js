import * as actionTypes from "../actions/actionTypes";
import {
  updateObject,
  replaceItemAtIndex,
  removeItemAtIndex,
} from "../../shared/utility";

const initialState = {
  orders: null,
  draftOrders: null,
  trades: null,
  portfolio: null,
  accountState: null,
  ipoInstruments: [],
  underCautionInstruments: [],
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
  });
};

const fetchDraftOrdersSuccess = (state, action) => {
  return updateObject(state, {
    draftOrders: action.draftOrders,
  });
};

const addOrder = (state, action) => {
  return updateObject(state, {
    orders: [action.order, ...state.orders],
  });
};

const updateOrder = (state, action) => {
  const index = state.orders.findIndex((item) => item.Id === action.order.Id);
  return updateObject(state, {
    orders: replaceItemAtIndex(state.orders, index, action.order),
  });
};

const removeOrder = (state, action) => {
  const index = state.orders.findIndex((item) => item.Id === action.order.Id);
  return updateObject(state, {
    orders: removeItemAtIndex(state.orders, index),
  });
};

const setAccountState = (state, action) => {
  return updateObject(state, {
    accountState: action.accountState,
  });
};

const setIpoInstruments = (state, action) => {
  return updateObject(state, {
    ipoInstruments: action.instruments,
  });
};

const setUnderCautionInstruments = (state, action) => {
  return updateObject(state, {
    underCautionInstruments: action.instruments,
  });
};

const fetchTradesSuccess = (state, action) => {
  return updateObject(state, {
    trades: action.trades,
  });
};

const fetchPortfolioSuccess = (state, action) => {
  return updateObject(state, {
    portfolio: action.portfolio,
  });
};

const tradeRegister = (state, action) => {
  return updateObject(state, {
    trades: [action.trade, ...state.trades],
  });
};

const tradeCancel = (state, action) => {
  const index = state.trades.findIndex((item) => item.Id === action.trade.Id);
  return updateObject(state, {
    trades: removeItemAtIndex(state.trades, index),
  });
};

const removeAsset = (state, action) => {
  const index = state.portfolio.findIndex(
    (item) => item.Id === action.asset.Id
  );
  return updateObject(state, {
    portfolio: removeItemAtIndex(state.portfolio, index),
  });
};

const updateAsset = (state, action) => {
  const index = state.portfolio.findIndex(
    (item) => item.Id === action.asset.Id
  );
  return updateObject(state, {
    portfolio: replaceItemAtIndex(state.portfolio, index, action.asset),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_DRAFT_ORDERS_SUCCESS:
      return fetchDraftOrdersSuccess(state, action);
    case actionTypes.ADD_ORDER:
      return addOrder(state, action);
    case actionTypes.UPDATE_ORDER:
      return updateOrder(state, action);
    case actionTypes.REMOVE_ORDER:
      return removeOrder(state, action);
    case actionTypes.SET_ACCOUNT_STATE:
      return setAccountState(state, action);
    case actionTypes.SET_IPO_INSTRUMENTS:
      return setIpoInstruments(state, action);
    case actionTypes.SET_UNDER_CAUTION_INSTRUMENTS:
      return setUnderCautionInstruments(state, action);
    case actionTypes.FETCH_TRADES_SUCCESS:
      return fetchTradesSuccess(state, action);
    case actionTypes.FETCH_PORTFOLIO_SUCCESS:
      return fetchPortfolioSuccess(state, action);
    case actionTypes.TRADE_REGISTER:
      return tradeRegister(state, action);
    case actionTypes.TRADE_CANCEL:
      return tradeCancel(state, action);
    case actionTypes.REMOVE_ASSET:
      return removeAsset(state, action);
    case actionTypes.UPDATE_ASSET:
      return updateAsset(state, action);
    default:
      return state;
  }
};

export default reducer;
