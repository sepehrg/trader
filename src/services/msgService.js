import  * as Service from "./service";

const MsgService = {
  getUnreadMailMessageCount: (callback) => {
    return Service.get("Msg/GetUnreadMailMessageCount", (status, data) => {
      callback(status, data.Result);
    });
  },

  getMailMessages: (data, callback) => {
    return Service.post("Msg/GetMailMessages", data, (status, data) => {
      callback(status, data);
    });
  },

  getMailMessageById: (id, callback) => {
    return Service.get(
      "Msg/GetMailMessageById?mailMessageId=" + id,
      (status, data) => {
        callback(data.Success, data.Result);
      }
    );
  },

  markMailMessageAsRead: (id, callback) => {
    return Service.get(
      "Msg/MarkMailMessageAsRead?mailMessageId=" + id,
      (status, data) => {
        callback(data.Success, data.Result);
      }
    );
  },
};

export default MsgService;
