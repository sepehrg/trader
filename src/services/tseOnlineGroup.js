import * as Service from "./service";

const TseOnlineGroup = {
  getTseAccountInfos: (data, callback) => {
    return Service.post(
      "TseOnlineGroup/GetTseAccountInfos",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getIdentityAccountStatus: (id, callback) => {
    return Service.get(
      "TseOnlineGroup/GetIdentityAccountStatusByIdentityId?identityId=" + id,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getActiveOrderBookInfos: (callback) => {
    return Service.get(
      "TseOnlineGroup/GetActiveOrderBookInfosByRegisterUserId",
      (status, data) => {
        callback(status, data);
      }
    );
  },

  registerOnlineGroupOrder: (data, callback) => {
    return Service.post("TseOnlineGroup/RegisterOnlineGroupOrder", data, (status, data) => {
      callback(status, data);
    });
  },
};

export default TseOnlineGroup;
