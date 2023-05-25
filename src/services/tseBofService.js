import * as Service from "./service";

const TseBofService = {
  getUserWatchList: (callback) => {
    return Service.get("TseBof/GetUserWatchList", (status, data) => {
      callback(data.Success, data.Result);
    });
  },

  getUserWatchListItem: (id, callback) => {
    return Service.get(
      "TseBof/GetUserWatchListItem?userWatchListId=" + id,
      (status, data) => {
        callback(data.Success, data);
      }
    );
  },

  addUserWatchList: (data, callback) => {
    return Service.post("TseBof/AddUserWatchList", data, (status, data) => {
      callback(data.Success, data);
    });
  },

  deleteUserWatchList: (id, callback) => {
    return Service.get(
      "TseBof/DeleteUserWatchList?userWatchListId=" + id,
      (status, data) => {
        callback(data.Success, data);
      }
    );
  },

  addUserWatchListItem: (data, callback) => {
    return Service.post("TseBof/AddUserWatchListItem", data, (status, data) => {
      callback(data.Success, data);
    });
  },

  deleteUserWatchListItem: (id, callback) => {
    return Service.get(
      "TseBof/DeleteUserWatchListItem?userWatchListItemId=" + id,
      (status, data) => {
        callback(data.Success, data.Result);
      }
    );
  },

  updateUserWatchListTitle: (data, callback) => {
    return Service.post(
      "TseBof/UpdateUserWatchListTitle",
      data,
      (status, data) => {
        callback(data.Success, data.Result);
      }
    );
  },

  getPaymentRequestInfos: (data, callback) => {
    return Service.post(
      "TseBof/GetPaymentRequestInfos",
      data,
      (status, data) => {
        callback(data.Success, data);
      }
    );
  },

  addPaymentRequest: (data, callback) => {
    return Service.post("TseBof/AddPaymentRequest", data, (status, data) => {
      callback(status, data);
    });
  },

  deletePaymentRequest: (id, callback) => {
    return Service.get(
      "TseBof/DeletePaymentRequest?paymentRequestId=" + id,
      (status, data) => {
        callback(data.Success, data);
      }
    );
  },

  getIdentityAgreements: (callback) => {
    return Service.get("TseBof/GetIdentityAgreements", (status, data) => {
      callback(status, data.Result);
    });
  },

  getAgreementById: (id, callback) => {
    return Service.getFile(
      "TseBof/GetAgreementById?id=" + id,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  acceptAgreement: (data, callback) => {
    return Service.post("TseBof/AcceptAgreement", data, (status, data) => {
      callback(status, data);
    });
  },

  getChangeSupervisorBrokerInfos: (data, callback) => {
    return Service.post(
      "TseBof/GetChangeSupervisorBrokerInfos",
      data,
      (status, data) => {
        callback(data.Success, data);
      }
    );
  },

  addChangeSupervisorBroker: (data, callback) => {
    return Service.post(
      "TseBof/AddChangeSupervisorBroker",
      data,
      (status, data) => {
        callback(data.Success, data);
      }
    );
  },

  deleteChangeSupervisorBroker: (id, callback) => {
    return Service.get(
      "TseBof/DeleteChangeSupervisorBroker?changeSupervisorBrokerId=" + id,
      (status, data) => {
        callback(data.Success, data);
      }
    );
  },

  getUserAssetWatchListItem: (callback) => {
    return Service.get("TseBof/GetUserAssetWatchListItem", (status, data) => {
      callback(status, data.Result);
    });
  },

  getSpecialInstruments: (callback) => {
    return Service.get("TseBof/GetSpecialInstruments", (status, data) => {
      callback(status, data.Result);
    });
  },

  getDepositMoneyInfos: (data, callback) => {
    return Service.post("TseBof/GetDepositMoneyInfos", data, (status, data) => {
      callback(data.Success, data);
    });
  },

  getBrokerBankAccountInfos: (callback) => {
    return Service.get("TseBof/GetBrokerBankAccountInfos", (status, data) => {
      callback(status, data.Result);
    });
  },

  addDepositMoney: (data, callback) => {
    return Service.post("TseBof/AddDepositMoney", data, (status, data) => {
      callback(status, data);
    });
  },

  deleteDepositMoney: (id, callback) => {
    return Service.get(
      "TseBof/DeleteDepositMoney?depositMoneyId=" + id,
      (status, data) => {
        callback(data.Success, data);
      }
    );
  },
};

export default TseBofService;
