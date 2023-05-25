import React from "react";
import { SnackbarProvider } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Notifier from "./notifier";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  mainRoot: {
    marginTop: 55,
    marginLeft: -10,
  },
  mainRootMobile: {
    padding: "0 10px",
    zIndex: 1700,
  },
}));

const NotifierProvider = (props) => {
  const classes = useStyles();
  const device = useDevice();

  return (
    <SnackbarProvider
      classes={{
        containerRoot: clsx(
          device.isNotMobile ? classes.mainRoot : classes.mainRootMobile
        ),
      }}
    >
      <Notifier />
      {props.children}
    </SnackbarProvider>
  );
};

export default NotifierProvider;
