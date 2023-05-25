import * as Service from "./service";

const CmdTseService = {
  getInstrumentsHotList: (id, callback) => {
    return Service.get(
      "CmdTse/GetInstrumentsHotList?hotListType=" + id,
      (status, data) => {
        callback(data.Success, data.Result);
      }
    );
  },

  getStockInfo: (isin, callback) => {
    return Service.get(
      "CmdTse/GetStockWatchInfoByIsin?isin=" + isin,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getStockInfoAsync: async (isin) => {
    return await Service.getAsync(
      "CmdTse/GetStockWatchInfoByIsin?isin=" + isin
    );
  },

  searchInstrument: (query, callback) => {
    return Service.get(
      "CmdTse/SearchInstrument?instrumentTitle=" + query,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getMarketActivity: (callback) => {
    return Service.get("CmdTse/GetLatestMarketsActivity", (status, data) => {
      callback(status, data);
    });
  },

  getObserverMessages: (data, callback) => {
    return Service.post(
      "CmdTse/GetObserverMessageSimpleInfos",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getObserverMessage: (id, callback) => {
    return Service.get(
      "CmdTse/GetObserverMessageById?observerMessageId=" + id,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getServerTime: (callback) => {
    return Service.get("CmdTse/GetServerTime", (status, data) => {
      callback(status, data);
    });
  },

  getHotListTypes: (callback) => {
    return Service.get("CmdTse/GetHotListTypes", (status, data) => {
      callback(data.Success, data.Result);
    });
  },

  getNews: (data, callback) => {
    return Service.post("CmdTse/GetNewSimpleInfos", data, (status, data) => {
      callback(status, data);
    });
  },

  getNewsById: (id, callback) => {
    return Service.get("CmdTse/GetNewsById?newsId=" + id, (status, data) => {
      callback(status, data);
    });
  },

  getMarketActivityHistory: (data, callback) => {
    return Service.post(
      "CmdTse/GetMarketActivityHistory",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getTreeMap: (callback) => {
    return Service.get("CmdTse/GetTreeMap", (status, data) => {
      callback(status, data);
    });
  },

  getLatestIndexesData: (callback) => {
    return Service.get("CmdTse/GetLatestIndexesData", (status, data) => {
      callback(status, data);
    });
  },

  getGainerInstruments: (callback) => {
    return Service.get("CmdTse/GetGainerInstruments", (status, data) => {
      callback(status, data);
    });
  },

  getLoserInstruments: (callback) => {
    return Service.get("CmdTse/GetLoserInstruments", (status, data) => {
      callback(status, data);
    });
  },

  getInstrumentTradesSignSummary: (callback) => {
    return Service.get(
      "CmdTse/GetInstrumentTradesSignSummary",
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getSectorsSummary: (callback) => {
    return Service.get("CmdTse/GetSectorsSummary", (status, data) => {
      callback(status, data);
    });
  },

  getInstrumentTradeHistory: (data, callback) => {
    return Service.post(
      "CmdTse/GetInstrumentTradeHistory",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getInstrumentTradeHistoryByTimeUnit: (data, callback) => {
    return Service.post(
      "CmdTse/GetInstrumentTradeHistoryByTimeUnit",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getMarketActivityHistoryByTimeUnit: (data, callback) => {
    return Service.post(
      "CmdTse/GetMarketActivityHistoryByTimeUnit",
      data,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getMarketWatchInfos: (request, callback) => {
    return Service.post(
      "CmdTse/GetMarketWatchInfos",
      request,
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getStockWatchSimpleInfosBySectorId: (id, callback) => {
    return Service.get(
      "CmdTse/GetStockWatchSimpleInfosBySectorId?sectorId=" + id,
      (status, data) => {
        callback(status, data);
      }
    );
  },
};

export default CmdTseService;
