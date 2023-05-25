import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "../Link/Link";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "../../UI/icons/close";
import Slide from "@material-ui/core/Slide";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import NotifierSuccessIcon from "../../UI/icons/notifierSuccess";
import NotifierWarningIcon from "../../UI/icons/notifierWarning";
import NotifierErrorIcon from "../../UI/icons/notifierError";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  snackbarRoot: {
    display: "flex",
    padding: "4px 10px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px 15px 15px 5px",
    borderRight: `7px solid ${theme.palette.color.green}`,
    // borderRight: (props) => `7px solid ${props.snackbarColor}`,
  },
  snackbarIcon: {
    width: 22,
    height: 22,
  },
  successIcon: {
    fill: theme.palette.color.green,
  },
  warningIcon: {
    fill: theme.palette.color.yellow,
  },
  errorIcon: {
    fill: theme.palette.color.red,
  },
  snackbarMessage: {
    fontSize: 11,
    color: theme.palette.text.primary,
    alignItems: "center",
  },
  textMessage: {
    marginRight: 10,
  },
  snackbarAction: {
    marginRight: "auto",
    marginLeft: 0,
    padding: 0,
  },
  closeBtn: {
    "&:hover $closeIcon": {
      fill: theme.palette.color.red,
    },
  },
  closeIcon: {
    height: 13,
    width: 13,
  },
  mainRoot: {
    marginTop: 55,
    marginLeft: -15,
  },
}));

const SnackbarNotifier = (props) => {
  const classes = useStyles({
    // snackbarColor,
  });
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let snackbarMessage = "";
  let snackbarIcon = "";
  let snackbarColor = "";

  switch ("Success") {
    case "Success":
      snackbarMessage = "سفارش در صف قرار گرفت";
      snackbarIcon = (
        <NotifierSuccessIcon
          className={clsx(classes.snackbarIcon, classes.successIcon)}
        />
      );
      snackbarColor = theme.palette.color.green;
      break;
    case "Warning":
      snackbarMessage = "سفارش در صف قرار گرفت";
      snackbarIcon = (
        <NotifierWarningIcon
          className={clsx(classes.snackbarIcon, classes.warningIcon)}
        />
      );
      snackbarColor = theme.palette.color.yellow;
      break;
    case "Error":
      snackbarMessage = "سفارش در صف قرار گرفت";
      snackbarIcon = (
        <NotifierErrorIcon
          className={clsx(classes.snackbarIcon, classes.errorIcon)}
        />
      );
      snackbarColor = theme.palette.color.red;
      break;
    default:
      snackbarMessage = "";
      snackbarIcon = "";
      snackbarColor = "";
  }

  const slideTransition = (props) => {
    return <Slide {...props} direction="right" />;
  };

  return (
    <>
      {open && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          TransitionComponent={slideTransition}
          transitionDuration={700}
          classes={{ root: classes.mainRoot }}
        >
          <SnackbarContent
            message={
              <Grid container className={classes.snackbarMessage}>
                <Grid item className={classes.snackbarIcon}>
                  {snackbarIcon}
                </Grid>
                <Grid item className={classes.textMessage}>
                  {snackbarMessage}
                </Grid>
              </Grid>
            }
            action={
              <>
                <Link
                  tooltipPlacement=""
                  title=""
                  onClick={handleClose}
                  className={classes.closeBtn}
                >
                  <CloseIcon className={classes.closeIcon} />
                </Link>
              </>
            }
            classes={{
              root: classes.snackbarRoot,
              message: classes.snackbarMessage,
              action: classes.snackbarAction,
            }}
          />
        </Snackbar>
      )}
    </>
  );
};

export default SnackbarNotifier;
