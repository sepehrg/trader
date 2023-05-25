import * as Service from "./service";

const AlgorithmService = {
  getAlgorithmLanguages: (callback) => {
    return Service.get("Algo/GetAlgorithmLanguages", (status, data) => {
      callback(status, data);
    });
  },

  addAlgorithm: (data, callback) => {
    return Service.post("Algo/AddAlgorithm", data, (status, data) => {
      callback(status, data);
    });
  },

  updateAlgorithm: (data, callback) => {
    return Service.post("Algo/UpdateAlgorithm", data, (status, data) => {
      callback(status, data);
    });
  },

  getUserAlgorithmInfos: (data, callback) => {
    return Service.post("Algo/GetUserAlgorithmInfos", data, (status, data) => {
      callback(status, data);
    });
  },

  getAlgorithmById: (id, callback) => {
    return Service.get("Algo/GetAlgorithmByIdAndUserId?id="+id, (status, data) => {
      callback(status, data.Result);
    });
  },

  deleteAlgorithmById: (data, callback) => {
    return Service.post("Algo/DeleteAlgorithmById", data, (status, data) => {
      callback(status, data);
    });
  },

  changeAlgorithmStatus: (data, callback) => {
    return Service.post("Algo/ChangeAlgorithmStatus", data, (status, data) => {
      callback(status, data);
    });
  },
};

export default AlgorithmService;
