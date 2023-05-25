import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import DenyIcon from "../../UI/icons/deny";
import Link from "../../UI/Link/Link";
import style from "../../../shared/style";
import * as actions from "../../../store/actions/index";
import clsx from "clsx";
import ConsoleIcon from "../../UI/icons/console";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  box: {
    height: "100%",
    padding: 8,
    // marginBottom: 8,
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    flexDirection: "column",
    direction: "ltr",
    // overflow: "auto",
    fontSize: 14,
    flexWrap: "nowrap",
  },
  main: {
    wordWrap: "break-word",
    width: "100%",
    maxWidth: "calc(100vw - 138px)",
    fontFamily: "Consolas",
    overflow: "hidden auto",
    height: "100%",
    backgroundColor: `${theme.palette.background.default}bb`,
    padding: 10,
    borderRadius: 4,
  },
  toolbarBtn: {
    margin: `auto 3px`,
    cursor: "pointer",
    "&:hover $toolbarIcon": {
      fill: theme.palette.primary.main,
    },
  },
  denyIcon: {
    width: 18,
    height: 18,
    "&:hover": {
      fill: theme.palette.text.primary,
    },
  },
  header: {
    fontSize: 11,
    color: theme.palette.text.secondary,
    // borderBottom: `1px solid ${theme.palette.border.primary}`,
    justifyContent: "space-between",
    padding: "0px 5px 5px 5px",
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 1,
  },
}));

const Console = (props) => {
  const classes = useStyles();
  const logEnd = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [props.notifications]);

  const scrollToBottom = () => {
    logEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Grid container className={classes.box}>
      <Grid item>
        <Grid container className={classes.header}>
          <Grid item>
            <Link
              title="پاک کردن"
              component={<DenyIcon className={classes.denyIcon} />}
              tooltipPlacement="top"
              onClick={props.clearAlgorithmNotification}
              className={classes.toolbarBtn}
            />
          </Grid>
          <Grid item>
            <ConsoleIcon className={classes.icon} />
            Console
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={clsx(classes.main, classes.scrollbarY)}>
        {props.notifications.map((n, i) => (
          <div key={i}>{n}</div>
        ))}
        <div ref={logEnd}></div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.app.algorithmNotifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearAlgorithmNotification: () =>
      dispatch(actions.clearAlgorithmNotification()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Console);
