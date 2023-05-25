import axios from "axios";
import { correctUserDataTypes } from "../shared/utility";

let isRefreshing = false;
let refreshSubscribers = [];
let serviceUrls;
const baseUrl = process.env.REACT_APP_API_URL;
const service = axios.create();

service.interceptors.request.use(function (config) {
  if (config.url.startsWith("Account")) config.baseURL = baseUrl;
  else {
    if (!serviceUrls) {
      let urls = JSON.parse(localStorage.getItem("urls"));
      if (urls) serviceUrls = urls;
      else localStorage.removeItem("user");
    }
    config.baseURL = serviceUrls[`${config.url.split("/")[0]}Url`];
  }
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

service.interceptors.response.use(
  (res) => res,
  (error) => {
    const { config, response } = error;
    const originalRequest = config;
    if (response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        const data = {
          RefreshToken: getRefreshToken(),
        };
        const config = {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        };
        axios
          .post(baseUrl + "/Account/RefreshToken", data, config)
          .then((response) => {
            if (response.data.Success) {
              const user = correctUserDataTypes(response.data.Result);
              onRefreshed(user.access_token);
              delete user["UrlSetting"];
              localStorage.setItem("user", JSON.stringify(user));
              isRefreshing = false;
            } else {
              localStorage.removeItem("user");
              redirectTo(document, "/");
            }
          })
          .catch(() => {
            localStorage.removeItem("user");
            redirectTo(document, "/");
          });
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          // replace the expired token and retry
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    } else {
      return response;
      // return Promise.reject(error);
    }
  }
);

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.map((cb) => cb(token));
};

const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) return user.refresh_token;
  return null;
};

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) return user.access_token;
  return null;
};

const redirectTo = (document, path) => {
  document.location = path;
};

const get = (path, callback) => {
  return service
    .get(path)
    .then((response) => {
      if (response) callback(response.status, response.data);
    })
    .catch((e) => console.log(e));
};

const getFile = (path, callback) => {
  return service
    .request({
      method: "GET",
      url: path,
      responseType: "arraybuffer",
    })
    .then((response) => {
      if (response) callback(response.status, response.data);
    })
    .catch((e) => console.log(e));
};

const getAsync = async (path) => {
  const res = await service.get(path);
  return res.data;
};

const patch = (path, payload, callback) => {
  return service
    .request({
      method: "PATCH",
      url: path,
      responseType: "json",
      data: payload,
    })
    .then((response) => {
      if (response) callback(response.status, response.data);
    });
};

const post = (path, payload, callback) => {
  return service
    .request({
      method: "POST",
      url: path,
      responseType: "json",
      data: payload,
    })
    .then((response) => {
      if (response) callback(response.status, response.data);
    });
};

const remove = (path, callback) => {
  return service
    .delete(path)
    .then((response) => callback(response.status, response.data));
};

export { get, getFile, getAsync, post, patch, remove };
