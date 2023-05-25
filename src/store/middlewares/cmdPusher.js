import io from "socket.io-client";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/index";

let socket = "";

const cmdPusher = (store) => (next) => (action) => {
  if (!action.meta || action.meta.type !== "cmdPusher") {
    return next(action);
  }

  const { getState, dispatch } = store;

  if (action.type === actionTypes.CMD_PUSHER_CONNECT) {
    const serviceUrls = JSON.parse(localStorage.getItem("urls"));
    const pusherUrl = serviceUrls?.CmdStreamUrl;
    socket = io.connect(pusherUrl, {
      transports: ["websocket"],
    });
    dispatch(actions.setSocket(socket));
  }

  if (socket) {
    if (action.type === actionTypes.CMD_PUSHER_SUBSCRIBE) {
      socket.emit("subscribe", action.payload);
    }

    if (action.type === actionTypes.CMD_PUSHER_UNSUBSCRIBE) {
      socket.emit("unsubscribe", {
        message: action.message,
        id: action.id,
      });
    }

    if (action.type === actionTypes.CMD_PUSHER_SUBSCRIBE_ALL) {
      socket.emit("subscribeAll", [...action.messageBody]);
    }

    if (action.type === actionTypes.CMD_PUSHER_UNSUBSCRIBE_ALL) {
      socket.emit("unsubscribeAll", [...action.messageBody]);
    }

    // socket.on("Trade", (payload) => {
    //   dispatch(actions.updateTrade(payload));
    // });

    // socket.on("ClosingPrice", (payload) => {
    //   dispatch(actions.updateClosingPrice(payload));
    // });

    // socket.on("InstrumentStateChange", (payload) => {
    //   dispatch(actions.updateInstrumentStateChange(payload));
    // });

    // socket.on("BidAsk", (payload) => {
    //   dispatch(actions.updateBidAsk(payload));
    // });

    // socket.on("ClientTrade", (payload) => {
    //   dispatch(actions.updateClientTrade(payload));
    // });

    socket.on("MarketActivity", (payload) => {
      dispatch(actions.updateMarketActivity(payload));
    });

    socket.on("StaticThreshold", (payload) => {
      dispatch(actions.updateStaticThreshold(payload));
    });

    socket.on("MarketObserverMessage", (payload) => {
      dispatch(actions.updateObserverMessage(payload));
    });
  }

  // ProLab.Base.InfraStructure.Messaging.Model.Cnp.NewsMessage
};

export default cmdPusher;
