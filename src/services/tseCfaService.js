import * as Service from "./service";

const TseCfaService = {
  getAccountState: (callback) => {
    return Service.get("TseCfa/GetIdentityAccountStatus", (status, data) => {
      callback(status, data.Result);
    });
  },

  getTurnovers: (request, callback) => {
    return Service.post(
      "TseCfa/GetIdentityTurnovers",
      request,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getBankAccountInfos: (callback) => {
    return Service.get("TseCfa/GetIdentityBankAccountInfos", (status, data) => {
      callback(status, data.Result);
    });
  },

  getSettlementBalance: (callback) => {
    return Service.post(
      "TseCfa/GetIdentitySettlementBalance",
      {},
      (status, data) => {
        callback(status, data.Result);
      }
    );
  },

  getTseElectronicPaymentInfos: (data, callback) => {
    return Service.post(
      "TseCfa/GetTseElectronicPaymentInfos",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  addTseElectronicPayment: (data, callback) => {
    return Service.post(
      "TseCfa/AddTseElectronicPayment",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getActivePayment: (callback) => {
    return Service.get("TseCfa/GetActivePayment", (status, data) => {
      callback(status, data.Result);
    });
  },
};

export default TseCfaService;
