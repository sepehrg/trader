import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../../shared/style";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import MsgService from "../../../services/msgService";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { toJalaliDateTime } from "../../../shared/utility";
import Spinner from "../../UI/spinner/spinner";
import Dialog from "../../UI/dialog/dialog";
import MessageIcon from "../../UI/icons/message";
import useDevice from "../../../hooks/useDevice";
import MessagesContent from "../messagesContent/messagesContent";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    height: 400,
    overflow: "hidden",
  },
  right: {
    borderLeft: `2px solid ${theme.palette.border.primary}`,
    overflow: "auto",
    height: 400,
  },
  messageSummary: {
    flexDirection: "column",
    padding: "12px 6px",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    borderRight: `3px solid ${theme.palette.border.primary}`,
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      borderRightWidth: 5,
    },
  },
  unreadMessage: {
    borderRight: `4px solid ${theme.palette.primary.main}`,
  },
  selected: {
    backgroundColor: theme.palette.background.box,
  },
  messageSummaryTitle: {
    fontSize: 13,
    color: theme.palette.text.primary,
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
  },
  messageSummaryDate: {
    fontSize: 10,
    color: theme.palette.text.secondary,
    marginTop: 5,
    direction: "ltr",
    display: "flex",
    justifyContent: "flex-end",
  },
  left: {
    padding: 20,
    backgroundColor: theme.palette.background.default,
    height: 400,
  },
  messageFooter: {
    borderTop: `2px solid ${theme.palette.border.primary}`,
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  notSelectedYet: {
    alignItems: "center",
    fontSize: 12,
    color: theme.palette.text.secondary,
    flexDirection: "column",
  },
  icon: {
    fill: theme.palette.background.paper,
    width: 80,
    height: 80,
  },

  rootMobile: {
    flexDirection: "column",
    height: "100%",
    flexWrap: "nowrap",
  },
  messageSummaryTitleMobile: {
    fontSize: 14,
  },
  messageSummaryDateMobile: {
    fontSize: 12,
  },
}));

const MessagesModal = (props) => {
  const classes = useStyles();
  const scroller = useRef();
  const device = useDevice();
  const history = useHistory();

  const [messages, setMessages] = useState([]);
  const [mailMessageId, setMailMessageId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [messageShow, setMessageShow] = useState(false);
  const [isFetching, setIsFetching] = useInfiniteScroll(
    fetchMessages,
    scroller
  );

  function fetchMessages() {
    const size = 15;
    const filter = {
      OptionalFilter: {
        take: size,
        page: messages.length / size + 1,
      },
    };
    MsgService.getMailMessages(filter, (status, data) => {
      if (data?.Success) {
        setMessages([...messages, ...data.Result]);
        setIsFetching(false);
      }
    });
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const selectedHandler = (msg) => {
    if (device.isNotMobile) {
      setMailMessageId(msg.MailMessageId);
      setSelectedId(msg.Id);
      setMessageShow(true);
    } else {
      props.setBackButton(true);
      history.push("/messages/" + msg.MailMessageId);
    }
  };

  const messageItem = (
    <Grid
      item
      sm={12}
      md={4}
      className={clsx(device.isNotMobile && classes.right, classes.scrollbarY)}
      ref={scroller}
    >
      {messages.map((msg) => (
        <Grid
          container
          key={msg.Id}
          className={clsx(
            classes.messageSummary,
            !msg.IsRead && classes.unreadMessage,
            msg.Id === selectedId && classes.selected
          )}
          onClick={() => selectedHandler(msg)}
        >
          <Grid
            item
            className={clsx(
              classes.messageSummaryTitle,
              device.isMobile && classes.messageSummaryTitleMobile
            )}
          >
            {msg.Title}
          </Grid>
          <Grid
            item
            className={clsx(
              classes.messageSummaryDate,
              device.isMobile && classes.messageSummaryDateMobile
            )}
          >
            {toJalaliDateTime(msg.EntryDate)}
          </Grid>
        </Grid>
      ))}
      <div className={classes.spinner}>
        {isFetching && <Spinner size={40} />}
      </div>
    </Grid>
  );

  return (
    <>
      {device.isNotMobile ? (
        <Dialog
          open={props.open}
          onClose={props.onClose}
          fullWidth={true}
          maxWidth="md"
          title="پیام ها"
        >
          <Grid container className={classes.root}>
            {messageItem}
            <Grid item sm={8} className={classes.left}>
              {messageShow ? (
                <MessagesContent id={mailMessageId} />
              ) : (
                <Grid container className={classes.notSelectedYet}>
                  <Grid item>
                    <MessageIcon className={classes.icon}></MessageIcon>
                  </Grid>
                  <Grid item>لطفا یکی از پیام ها را انتخاب کنید</Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Dialog>
      ) : (
        <Grid container className={classes.rootMobile}>
          {messageItem}
        </Grid>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBackButton: (state) => dispatch(actions.setBackButton(state)),
  };
};

export default connect(null, mapDispatchToProps)(MessagesModal);
