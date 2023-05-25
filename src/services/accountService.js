import * as Service from "./service";

const AccountService = {
  getClientId: (callback) => {
    return Service.get("Account/GetClientId", (status, data) => {
      callback(status, data);
    });
  },

  getCaptcha: (id, callback) => {
    return Service.get("Account/GetCaptcha?clientId=" + id, (status, data) => {
      callback(status, data);
    });
  },

  login: (data, callback) => {
    return Service.post("Account/Authenticate", data, (status, data) => {
      callback(status, data);
    });
  },

  logout: (callback) => {
    return Service.get("Account/LogOff", (status, data) => {
      callback(data.Success, data.Result);
    });
  },

  verifyAuthenticateOtp: (data, callback) => {
    return Service.post(
      "Account/VerifyAuthenticateOtp",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  addResetPasswordToken: (data, callback) => {
    return Service.post(
      "Account/AddResetPasswordToken",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  resetPassword: (data, callback) => {
    return Service.post("Account/ResetPassword", data, (status, data) => {
      callback(status, data);
    });
  },
};

export default AccountService;
