import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../../shared/style";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import useDevice from "../../../hooks/useDevice";
import { toJalaliDateTime, replaceItemAtIndex } from "../../../shared/utility";
import MsgService from "../../../services/msgService";
import MessageIcon from "../../UI/icons/message";
import TimeIcon from "../../UI/icons/time";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    padding: 20,
    height: "100%",
    overflow: "hidden scroll",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  bubble: {
    width: "100%",
    // minHeight: 100,
    backgroundColor: theme.palette.border.bar,
    padding: 10,
    color: theme.palette.text.primary,
    borderRadius: "10px 10px 0 10px",
    position: "relative",
    "&:after": {
      content: "''",
      width: 0,
      height: 0,
      position: "absolute",
      borderLeft: `8px solid ${theme.palette.border.bar}`,
      borderRight: `8px solid transparent`,
      borderBottom: `8px solid ${theme.palette.border.bar}`,
      borderTop: `8px solid transparent`,
      right: -16,
      bottom: 0,
    },
  },
  messageTitle: {
    borderBottom: `2px solid ${theme.palette.border.primary}`,
  },
  messageContentTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.palette.text.primary,
    textAlign: "justify",
  },
  messageContentDate: {
    fontSize: 11,
    color: theme.palette.text.secondary,
    marginTop: 5,
    marginRight: "auto",
    direction: "ltr",
  },
  messageContent: {
    fontSize: 11,
    margin: "10px 0",
    textAlign: "justify",
    lineHeight: "2",
    height: "calc(100% - 20px - 22px)",
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 3,
  },

  messageContentTitleMobile: {
    fontSize: 14,
    marginBottom: 6,
  },
  messageContentDateMobile: {
    fontSize: 12,
    color: theme.palette.text.primary,
    lineHeight: 1.7,
    padding: 10,
    textAlign: "justify",
  },
}));

const MessagesContent = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const [messageData, setMessageData] = useState("");

  // useEffect(() => {
  //   if (props.dialogOpen) getMessages(props.newsId);
  //   if (props.match) getMessages(props.match.params.id);
  // }, []);

  // const getMessages = (id) => {
  //   CmdTseService.getMessagesById(id, (status, data) => {
  //     setData(data.Result);
  //   });
  // };

  useEffect(() => {
    const id = device.isNotMobile ? props.id : props.match.params.id;
    getMessages(id);
  }, [messageData]);

  const getMessages = (mailMessageId) => {
    MsgService.getMailMessageById(mailMessageId, (status, data) => {
      setMessageData(data);
      if (!data.IsRead) markAsRead(mailMessageId);
    });
  };

  const markAsRead = (mailMessageId) => {
    MsgService.markMailMessageAsRead(mailMessageId, (status, data) => {
      if (status) {
        const index = messageData.findIndex((m) => m.Id === mailMessageId);
        setMessageData(
          replaceItemAtIndex(messageData, index, {
            ...messageData[index],
            IsRead: true,
          })
        );
      }
    });
  };

  return (
    <>
      {device.isNotMobile ? (
        <>
          <Grid container className={classes.messageTitle}>
            <Grid item className={classes.messageContentTitle}>
              {messageData.Title}
            </Grid>
            <Grid item className={classes.messageContentDate}>
              {toJalaliDateTime(messageData.EntryDate)}
            </Grid>
          </Grid>
          <Grid
            container
            className={clsx(classes.messageContent, classes.scrollbarY)}
          >
            <Grid item>{messageData.Body}</Grid>
          </Grid>
        </>
      ) : (
        <Grid container className={classes.root}>
          <Grid
            item
            className={clsx(
              classes.messageContentTitle,
              device.isMobile && classes.messageContentTitleMobile
            )}
          >
            {messageData.Title}
          </Grid>
          <Grid item className={classes.bubble}>
            <Grid container>
              <Grid
                item
                className={clsx(
                  device.isNotMobile
                    ? classes.messageContentDate
                    : classes.messageContentDateMobile
                )}
              >
                {messageData.Body}
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.messageContentDate}>
            {toJalaliDateTime(messageData.EntryDate)}
            <TimeIcon
              className={clsx(
                classes.icon,
                device.isMobile && classes.iconMobile
              )}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default React.memo(MessagesContent);
