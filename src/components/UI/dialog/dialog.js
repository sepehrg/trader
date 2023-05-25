import React from "react";
import { default as MuiDialog } from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "../Button/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Link from "../Link/Link";
import clsx from "clsx";
import CloseIcon from "../../UI/icons/close";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {},
  dialogContent: {
    padding: 0,
    overflowX: "hidden",
    backgroundColor: theme.palette.background.box,
  },
  dialogTitleRoot: {
    padding: 0,
    backgroundColor: theme.palette.background.box,
  },
  title: {
    fontSize: 11,
    padding: 8,
  },
  dialogActionsRoot: {
    backgroundColor: theme.palette.background.box,
    "& button": {
      margin: "3px !important",
      minWidth: 100,
    },
  },
  actions: {
    display: "flex",
    padding: 0,
    lineHeight: "1.4",
  },
  button: {
    fill: `${theme.palette.text.primary}`,
    backgroundColor: `${theme.palette.border.bar}`,
    padding: "9px",
    transition: "0.3s",
    width: 45,
    height: 30,
  },
  close: {
    "&:hover": {
      backgroundColor: `${theme.palette.color.red}`,
      fill: "#FFF",
    },
  },
  dialogMobile: {
    position: "absolute",
    bottom: 0,
    margin: 0,
    width: "100%",
    borderRadius: "18px 18px 0 0",
    maxWidth: "none",
  },
  closeMobile: {
    width: 60,
    border: "1px solid #ccc",
  },
  titleMobile: {
    textAlign: "center",
  },
  btn: {
    width: "100%",
    height: 36,
    marginRight: 10,
    marginTop: 15,
  },
  closeLine: {
    "&:after": {
      content: "''",
      backgroundColor: `${theme.palette.text.secondary}66`,
      display: "flex",
      margin: "10px auto",
      width: 90,
      height: 3,
      borderRadius: 50,
    },
  },
}));

const Dialog = (props) => {
  const device = useDevice();
  const classes = useStyles();
  const theme = useTheme();

  if (!props.open) return null;

  return (
    <MuiDialog
      open
      onClose={props.onClose}
      onBackdropClick={props.onBackdropClick}
      disableBackdropClick={props.disableBackdropClick}
      disableEscapeKeyDown={props.disableEscapeKeyDown}
      fullWidth={props.fullWidth}
      maxWidth={props.maxWidth}
      className={clsx(props.root, props.className)}
      classes={{
        ...props.classes,
        paper: device.isMobile && classes.dialogMobile,
      }}
    >
      {device.isNotMobile ? (
        <DialogTitle classes={{ root: classes.dialogTitleRoot }}>
          <div
            className={classes.actions}
            style={
              props.title
                ? {
                    backgroundColor: theme.palette.border.secondary,
                  }
                : {}
            }
          >
            {!props.hideClose && (
              <Link onClick={props.onClose}>
                {device.isNotMobile ? (
                  <CloseIcon
                    className={clsx(classes.button, classes.close)}
                  ></CloseIcon>
                ) : (
                  <span className={classes.closeMobile}></span>
                )}
              </Link>
            )}
            {props.title && <div className={classes.title}>{props.title}</div>}
          </div>
        </DialogTitle>
      ) : (
        <Link onClick={props.onClose}>
          <div className={classes.titleMobile}>
            <div className={classes.closeLine}></div>
            {props.title && <div className={classes.title}>{props.title}</div>}
          </div>
        </Link>
      )}
      <DialogContent
        className={clsx(classes.dialogContent, props.dialogContentClassName)}
      >
        {props.children}
      </DialogContent>
      {props.dialogActions && (
        <DialogActions
          classes={{
            root: classes.dialogActionsRoot,
          }}
        >
          {props.dialogActions.map((action, i) => (
            <Button
              key={i}
              onClick={action.onClick}
              variant="outlined"
              className={clsx(classes.btn, action.className)}
            >
              {action.title}
            </Button>
          ))}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
