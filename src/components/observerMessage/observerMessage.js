import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ObserverMessageItem from "./observerMessageItem/observerMessageItem";
import style from "../../shared/style";
import CmdTseService from "../../services/cmdTseService";
import Skeleton from "@material-ui/lab/Skeleton";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import MessageTypes from "../../enums/messageTypes";
import Spinner from "../UI/spinner/spinner";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import useDevice from "../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexDirection: "column",
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    height: "100%",
    overflowY: "auto",
    flexWrap: "nowrap",
  },
  heading: {
    textAlign: "right",
    fontSize: "11px",
    color: theme.palette.text.secondary,
    display: "flex",
  },
  title: {
    fontSize: "12px",
    textAlign: "right",
  },
  tags: {
    backgroundColor: theme.palette.text.secondary,
    padding: `0px ${theme.spacing(2)}px`,
    borderRadius: "5px",
    margin: theme.spacing(2),
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  main: {
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    paddingLeft: 3,
    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.text.secondary,
      },
      scrollbarColor: `${theme.palette.border.primary} transparent`,
    },
    scrollbarWidth: "thin",
    textAlign: "center",
  },

  rootMobile: {
    flexDirection: "column",
    padding: "10px 0px",
    height: "100%",
    overflow: "hidden scroll",
  },
  mainMobile: {
    textAlign: "center",
  },
}));

const ObserverMessage = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const device = useDevice();

  const [observerMessages, setObserverMessages] = useState([]);
  const scroller = useRef();
  const [isFetching, setIsFetching] = useInfiniteScroll(
    fetchObserverMessages,
    scroller
  );
  const [expand, setExpand] = useState(
    window.innerWidth < theme.breakpoints.values.lg ? false : true
  );

  let isSubscribed = true;

  useEffect(() => {
    setExpand(isWidthUp("lg", props.width));
  }, [props.width]);

  function fetchObserverMessages() {
    const pageSize = 15;
    const filter = {
      OptionalFilter: {
        take: pageSize,
        page: observerMessages.length / pageSize + 1,
      },
    };
    CmdTseService.getObserverMessages(filter, (status, data) => {
      if (isSubscribed && data) {
        setObserverMessages([...observerMessages, ...data.Result]);
        setIsFetching(false);
      }
    });
  }

  useEffect(() => {
    fetchObserverMessages();
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    if (
      props.observerMessage &&
      !observerMessages.some((o) => o.Id === props.observerMessage.Id)
    )
      setObserverMessages([props.observerMessage, ...observerMessages]);
  }, [props.observerMessage]);

  useEffect(() => {
    setTimeout(function () {
      props.subscribe(MessageTypes.ObserverMessage);
    }, 1000);
    return () => {
      if (props.observerMessage)
        props.unsubscribe(MessageTypes.ObserverMessage);
    };
  }, []);

  let list = [...Array(10).keys()].map((i) => (
    <Skeleton
      key={i}
      animation="wave"
      variant="text"
      height={100}
      width={device.isNotMobile ? 300 : "100%"}
    />
  ));
  if (observerMessages.length > 0) {
    list = observerMessages.map((msg) => {
      return (
        <ObserverMessageItem
          key={msg.Id}
          id={msg.Id}
          title={msg.Title}
          date={msg.ContextDate}
          tags={msg.InstrumentPersianCodes}
          widget={props.widget}
        ></ObserverMessageItem>
      );
    });
  }

  return (
    <>
      {device.isNotMobile ? (
        <Grid container className={classes.root}>
          {!props.widget && (
            <Grid item className={classes.heading}>
              پیام ناظر
            </Grid>
          )}
          <Grid item className={classes.main} ref={scroller}>
            {list}
            {isFetching && <Spinner size={19} />}
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.rootMobile} ref={scroller}>
          <Grid item className={classes.mainMobile}>
            {list}
            {isFetching && <Spinner size={40} />}
          </Grid>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    observerMessage: state.app.observerMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (message) => dispatch(actions.subscribe(message)),
    unsubscribe: (message) => dispatch(actions.unsubscribe(message)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(ObserverMessage));
