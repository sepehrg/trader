import * as actionTypes from "./actionTypes";
import AccountService from "../../services/accountService";
import IdentityService from "../../services/identityService";
import { notifyError } from "./app";

//TODO: delete this
export const setClientId = () => {
  return (dispatch) => {
    AccountService.getClientId((status, data) => {
      dispatch({
        type: actionTypes.SET_CLIENT_ID,
        clientId: data.Result,
      });
    });
  };
};

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user,
  };
};

export const updateUser = (user) => {
  return {
    type: actionTypes.UPDATE_USER,
    user,
  };
};

export const logout = () => {
  return (dispatch) => {
    AccountService.logout((status, result) => {
      localStorage.removeItem("user");
      localStorage.removeItem("displayed");
      dispatch({
        type: actionTypes.LOGOUT,
        meta: { type: "cstPusher" },
      });
    });
  };
};

export const fetchPermissions = () => {
  return (dispatch) => {
    IdentityService.getPermissionAccessKeys((status, data) => {
      if (status === 200) dispatch(setPermissions(data.Result));
      else dispatch(notifyError("خطا در دریافت سطح دسترسی"));
    });
  };
};

export const setPermissions = (permissions) => {
  return {
    type: actionTypes.SET_PERMISSIONS,
    permissions,
  };
};

export const fetchUserAccountInfo = () => {
  return (dispatch) => {
    IdentityService.getUserAccountInfo((status, data) => {
      if (status) {
        dispatch(setUserAccountInfo(data));
      }
    });
  };
};

export const setUserAccountInfo = (userAccountInfo) => {
  return {
    type: actionTypes.SET_USER_ACCOUNT_INFO,
    userAccountInfo,
  };
};

export const updateUserAccountInfo = (userAccountInfo) => {
  return {
    type: actionTypes.UPDATE_USER_ACCOUNT_INFO,
    userAccountInfo,
  };
};
