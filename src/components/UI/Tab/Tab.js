import React from "react";
import { default as MuiTab } from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "inherit",
  },
  wrapper: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "inline",
  },
}));

const Tab = ({ isHidden, ...rest }) => {
  const classes = useStyles();
  const device = useDevice();

  return !isHidden ? (
    <MuiTab
      classes={{
        root: classes.root,
        wrapper: clsx(device.isMobile && classes.wrapper),
      }}
      {...rest}
    ></MuiTab>
  ) : null;
};

export default React.memo(Tab);
