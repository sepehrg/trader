import { hubConnection } from "signalr-no-jquery";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/index";

const serviceUrls = JSON.parse(localStorage.getItem("urls"));
const pusherUrl = serviceUrls?.CstStreamUrl;
const connection = hubConnection(pusherUrl);
connection.logging = true;

const accountHub = connection.createHubProxy("AccountHub");
const omsHub = connection.createHubProxy("OmsHub");
const algoHub = connection.createHubProxy("AlgoHub");

let tryToConnect = false;

const cstPusher = (store) => (next) => (action) => {
  if (!action.meta || action.meta.type !== "cstPusher") {
    return next(action);
  }

  const { getState, dispatch } = store;
  const token = getState().account.user.PusherToken;

  if (action.type === actionTypes.CST_PUSHER_SUBSCRIBE) {
    if (!tryToConnect) {
      tryToConnect = true;

      accountHub.on("OnSubscribe", (msg) => {});

      accountHub.on("OnSubscribeFailed", (msg) => {});

      omsHub.on("SendOmsEvent", (msg) => {
        let message = JSON.parse(msg);

        switch (message.Type) {
          case "ProLab.TseOms.Model.Message.OrderRegisterEvent":
            dispatch(actions.orderRegister(message));
            break;
          case "ProLab.TseOms.Model.Message.OrderUpdateEvent":
          case "ProLab.TseOms.Model.Message.OrderCancelEvent":
            dispatch(actions.orderUpdateOrCancel(message));
            break;
          case "ProLab.TseOms.Model.Message.OrderRegisterConfirmationEvent":
            dispatch(actions.orderRegisterConfirmation(message));
            break;
          case "ProLab.TseOms.Model.Message.OrderExecutionEvent":
            dispatch(actions.orderExecution(message));
            break;
          case "ProLab.TseOms.Model.Message.OrderUpdateConfirmationEvent":
            dispatch(actions.orderUpdateConfirmation(message));
            break;
          case "ProLab.TseOms.Model.Message.OrderCancelConfirmationEvent":
          case "ProLab.TseOms.Model.Message.OrderEliminationEvent":
            dispatch(actions.orderCancelConfirmation(message));
            break;
          case "ProLab.TseOms.Model.Message.TradeEvent":
          case "ProLab.TseOms.Model.Message.TradeCreateEvent":
            dispatch(actions.tradeRegister(message));
            break;
          case "ProLab.TseOms.Model.Message.TradeCancelEvent":
            dispatch(actions.tradeCancel(message));
            break;
          case "ProLab.TseOms.Model.Message.AssetUpdatedEvent":
            dispatch(actions.refreshPortfolio(message));
            break;
          case "ProLab.TseCfa.Model.Message.AccountStateChangeEvent":
            dispatch(actions.setAccountState(message));
            break;
          case "ProLab.Pim.Model.Message.UserLoginEvent":
            dispatch(actions.notifyUserLogin(message));
            break;
          default:
            break;
        }
      });

      algoHub.on("SendAlgoEvent", (msg) => {
        let message = JSON.parse(msg);

        switch (message.Type) {
          case "ProLab.AlgTse.Model.Message.AlgConsole":
            dispatch(actions.setAlgorithmNotification(message));
            break;
          case "ProLab.AlgTse.Model.Message.AlgNotification":
            dispatch(actions.notifyAlgorithm(message));
            break;
          default:
            break;
        }
      });
    }

    connection
      .start()
      .done(() => {
        accountHub.invoke("Subscribe", token);
      })
      .fail(() => {
        //console.log("Connection Failed!");
      });

    connection.disconnected(() => {
      setTimeout(function () {
        connection.start().done(() => {
          accountHub.invoke("Subscribe", token);
        });
      }, 5000);
    });
  }

  if (action.type === actionTypes.LOGOUT) {
    try {
      accountHub.invoke("UnSubscribe");
    } catch {}
    next(action);
  }

  // if (!tryToConnect) {
  //   tryToConnect = true;
  // }
};

export default cstPusher;
