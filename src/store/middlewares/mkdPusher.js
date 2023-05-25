import { hubConnection } from "signalr-no-jquery";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/index";

const serviceUrls = JSON.parse(localStorage.getItem("urls"));
const pusherUrl = serviceUrls?.MkdStreamUrl;
const connection = hubConnection(pusherUrl);
connection.logging = true;

const accountHub = connection.createHubProxy("AccountHub");
const mkdHub = connection.createHubProxy("MkdHub");

let tryToConnect = false;

const mkdPusher = (store) => (next) => (action) => {
  if (!action.meta || action.meta.type !== "mkdPusher") {
    return next(action);
  }

  const { getState, dispatch } = store;
  const token = getState().account.user?.PusherToken;

  if (action.type === actionTypes.MKD_PUSHER_AUTHENTICATE) {
    if (!tryToConnect) {
      tryToConnect = true;

      accountHub.on("OnAuthenticate", (msg) => {
        //console.log(msg);
      });

      accountHub.on("OnAuthenticateFailed", (msg) => {
        //console.log(msg);
      });

      mkdHub.on("OnMkdInitDataEvent", (msg) => {
        let message = JSON.parse(msg);
        //console.log(message);
        dispatch(actions.mkdSetInitData(message));
      });

      mkdHub.on("OnMkdDataEvent", (msg) => {
        let message = JSON.parse(msg);
        dispatch(actions.mkdSetData(message));
      });
    }

    connection
      .start()
      .done(() => {
        accountHub.invoke("Authenticate", token);
      })
      .fail((e) => {
        //console.log("Connection Failed!", e);
      });
  }

  if (action.type === actionTypes.MKD_PUSHER_LOGOUT) {
    if (mkdHub.connection.state === 1) {
      accountHub.invoke("Logout");
      connection.stop();
    }
    // next(action);
  }

  if (action.type === actionTypes.MKD_PUSHER_SUBSCRIBE) {
    if (mkdHub.connection.state === 1) mkdHub.invoke("Subscribe", action.isin);
    // next(action);
  }

  if (action.type === actionTypes.MKD_PUSHER_UNSUBSCRIBE) {
    if (mkdHub.connection.state === 1)
      mkdHub.invoke("UnSubscribe", action.isin);
    // next(action);
  }
};

export default mkdPusher;
