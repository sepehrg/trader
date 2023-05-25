import * as Service from "./service";

const TseOmsService = {
  getIdentityAssetInfos: (callback) => {
    return Service.get("TseOms/GetIdentityAssetInfos", (status, data) => {
      callback(status, data);
    });
  },

  getIdentityActiveOrderBookInfos: (callback) => {
    return Service.get(
      "TseOms/GetIdentityActiveOrderBookInfos",
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getIdentityDraftOrderBookInfos: (callback) => {
    return Service.get(
      "TseOms/GetIdentityDraftOrderBookInfos",
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getIdentityCurrentDayTradeInfos: (callback) => {
    return Service.get(
      "TseOms/GetIdentityCurrentDayTradeInfos",
      (status, data) => {
        callback(status, data);
      }
    );
  },

  registerOrder: (data, callback) => {
    return Service.post("TseOms/RegisterOrder", data, (status, data) => {
      callback(status, data);
    });
  },

  // registerMultipleOrders: (data, callback) => {
  //   return Service.post("TseOms/RegisterMultipleOrders", data, (status, data) => {
  //     callback(status, data);
  //   });
  // },

  updateOrder: (data, callback) => {
    return Service.post("TseOms/UpdateOrder", data, (status, data) => {
      callback(status, data);
    });
  },

  cancelOrder: (data, callback) => {
    return Service.post("TseOms/CancelOrder", data, (status, data) => {
      callback(status, data);
    });
  },

  cancelBatchOrder: (data, callback) => {
    return Service.post("TseOms/CancelBatchOrder", data, (status, data) => {
      callback(status, data);
    });
  },

  registerDraftOrder: (data, callback) => {
    return Service.post("TseOms/RegisterDraftOrder", data, (status, data) => {
      callback(status, data);
    });
  },

  updateDraftOrder: (data, callback) => {
    return Service.post("TseOms/UpdateDraftOrder", data, (status, data) => {
      callback(status, data);
    });
  },

  deleteDraftOrder: (data, callback) => {
    return Service.post("TseOms/DeleteDraftOrder", data, (status, data) => {
      callback(status, data);
    });
  },

  sendDraftOrders: (data, callback) => {
    return Service.post("TseOms/SendDraftOrders", data, (status, data) => {
      callback(status, data);
    });
  },

  getOrderBookHistory: (id, callback) => {
    return Service.get(
      "TseOms/GetOrderBookHistoryByOrderBookId?orderBookId=" + id,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getOrderBookInfos: (request, callback) => {
    return Service.post(
      "TseOms/GetOrderBookInfos",
      request,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getIdentityCsdAssetInfos: (request, callback) => {
    return Service.get("TseOms/GetIdentityCsdAssetInfos", (status, data) => {
      callback(status, data);
    });
  },

  registerIpoOrder: (data, callback) => {
    return Service.post("TseOms/RegisterIpoOrder", data, (status, data) => {
      callback(status, data);
    });
  },

  updateIpoOrder: (data, callback) => {
    return Service.post("TseOms/UpdateIpoOrder", data, (status, data) => {
      callback(status, data);
    });
  },

  cancelIpoOrder: (request, callback) => {
    return Service.post("TseOms/cancelIpoOrder", request, (status, data) => {
      callback(status, data);
    });
  },
};

export default TseOmsService;
