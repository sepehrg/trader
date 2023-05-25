import * as Service from "./service";

const IdentityService = {
  getPermissionAccessKeys: (callback) => {
    return Service.get("Identity/GetPermissionAccessKeys", (status, data) => {
      callback(status, data);
    });
  },

  getUserAccountInfo: (callback) => {
    return Service.get("Identity/GetUserAccountInfo", (status, data) => {
      callback(data.Success, data.Result);
    });
  },

  updateUserPassword: (data, callback) => {
    return Service.post("Identity/UpdateUserPassword", data, (status, data) => {
      callback(status, data);
    });
  },

  getUserLastLoginsHistory: (callback) => {
    return Service.get("Identity/GetUserLastLoginsHistory", (status, data) => {
      callback(data.Success, data.Result);
    });
  },

  uploadProfilePicture: (data, callback) => {
    return Service.post(
      "Identity/UploadProfilePicture",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  deleteProfilePicture: (callback) => {
    return Service.post("Identity/DeleteProfilePicture", {}, (status, data) => {
      callback(data.Success, data.Result);
    });
  },

  addUpdatePasswordToken: (data, callback) => {
    return Service.post(
      "Identity/AddUpdatePasswordToken",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },
};

export default IdentityService;
