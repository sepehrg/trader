import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import * as actions from "../../../store/actions/index";
import Link from "../Link/Link";
import CloseIcon from "../icons/close";
import Grid from "@material-ui/core/Grid";
import NotifierSuccessIcon from "../../UI/icons/notifierSuccess";
// import NotifierWarningIcon from "../../UI/icons/notifierWarning";
import NotifierErrorIcon from "../../UI/icons/notifierError";
import clsx from "clsx";
import useDevice from "../../../hooks/useDevice";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    padding: "4px 10px",
    backgroundColor: theme.palette.background.box,
    borderRadius: "5px 15px 15px 5px",
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "space-between",
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
    padding: "8px 0",
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
  success: {
    borderRight: `7px solid ${theme.palette.color.green}`,
  },
  warning: {
    borderRight: `7px solid ${theme.palette.color.yellow}`,
  },
  error: {
    borderRight: `7px solid ${theme.palette.color.red}`,
  },

  snackbarMobile: {
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.border.primary,
    borderRadius: 15,
  },
  textMessageMobile: {
    fontSize: 14,
  },
  closeIconMobile: {
    height: 24,
    width: 24,
  },
}));

let displayed = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const device = useDevice();

  const notifications = useSelector((store) => store.app.notifications || []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  const getMessage = (key, message, variant) => (
    <div
      className={clsx(
        classes.snackbar,
        classes[variant],
        device.isMobile && classes.snackbarMobile
      )}
    >
      <Grid container className={classes.container}>
        <Grid item>
          <Grid container className={classes.snackbarMessage}>
            <Grid item className={classes.snackbarIcon}>
              {variant === "success" && (
                <NotifierSuccessIcon
                  className={clsx(classes.snackbarIcon, classes.successIcon)}
                />
              )}
              {variant === "warning" && (
                <NotifierErrorIcon
                  className={clsx(classes.snackbarIcon, classes.warningIcon)}
                />
              )}
              {variant === "error" && (
                <NotifierErrorIcon
                  className={clsx(classes.snackbarIcon, classes.errorIcon)}
                />
              )}
            </Grid>
            <Grid
              item
              className={clsx(
                classes.textMessage,
                device.isMobile && classes.textMessageMobile
              )}
            >
              {message}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Link
            onClick={() => {
              closeSnackbar(key);
            }}
            className={classes.closeBtn}
          >
            <CloseIcon
              className={clsx(
                device.isNotMobile ? classes.closeIcon : classes.closeIconMobile
              )}
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  );

  const slideTransition = (props) => {
    return <Slide {...props} direction={device.isNotMobile ? "right" : "up"} />;
  };

  React.useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // remove this snackbar from redux store
            dispatch(actions.removeSnackbar(myKey));
            removeDisplayed(myKey);
          },
          content: (key, message, variant) =>
            getMessage(key, message, options.variant),
          transitionDuration: 700,
          autoHideDuration: 6000,
          TransitionComponent: slideTransition,
          anchorOrigin: {
            vertical: device.isNotMobile ? "top" : "bottom",
            horizontal: device.isNotMobile ? "left" : "center",
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;
