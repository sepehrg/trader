import * as actionTypes from "../actions/actionTypes";
import { correctUserDataTypes, updateObject } from "../../shared/utility";

const initialState = {
  clientId: null,
  user: JSON.parse(localStorage.getItem("user")),
  userAccountInfo: null,
  permissions: null,
};

const setClientId = (state, action) => {
  return updateObject(state, {
    clientId: action.clientId,
  });
};

const setUser = (state, action) => {
  const user = correctUserDataTypes(action.user);
  localStorage.setItem("urls", JSON.stringify(user.UrlSetting));
  delete user["UrlSetting"];
  localStorage.setItem("user", JSON.stringify(user));
  return updateObject(state, {
    user: user,
  });
};

const updateUser = (state, action) => {
  const user = {
    ...state.user,
    ...action.user,
  };
  localStorage.setItem("user", JSON.stringify(user));
  return updateObject(state, {
    user: user,
  });
};

const setUserAccountInfo = (state, action) => {
  return updateObject(state, {
    userAccountInfo: action.userAccountInfo,
  });
};

const updateUserAccountInfo = (state, action) => {
  return updateObject(state, {
    userAccountInfo: updateObject(
      state.userAccountInfo,
      action.userAccountInfo
    ),
  });
};

const logout = (state, action) => {
  return updateObject(state, {
    user: null,
    userAccountInfo: null,
  });
};

const setPermissions = (state, action) => {
  return updateObject(state, {
    permissions: action.permissions,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CLIENT_ID:
      return setClientId(state, action);
    case actionTypes.SET_USER:
      return setUser(state, action);
    case actionTypes.UPDATE_USER:
      return updateUser(state, action);
    case actionTypes.SET_USER_ACCOUNT_INFO:
      return setUserAccountInfo(state, action);
    case actionTypes.UPDATE_USER_ACCOUNT_INFO:
      return updateUserAccountInfo(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    case actionTypes.SET_PERMISSIONS:
      return setPermissions(state, action);
    default:
      return state;
  }
};

export default reducer;
