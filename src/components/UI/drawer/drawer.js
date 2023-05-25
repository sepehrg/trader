import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Link from "../Link/Link";

const useStyles = makeStyles((theme) => ({
  paperAnchorRight: {
    width: "70%",
    maxWidth: 320,
  },
  paperAnchorBottom: {
    borderRadius: "18px 18px 0 0",
    maxHeight: "80%",
    overflowX: "hidden",
  },
  headerMobile: {
    textAlign: "center",
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
  title: {
    fontSize: 11,
    padding: 8,
  },
  paperRoot: {
    backgroundColor: theme.palette.background.box,
  },
}));

const Drawer = (props) => {
  const classes = useStyles();
  return (
    <>
      {props.loadContent && !props.open && props.children}
      <SwipeableDrawer
        anchor={props.anchor || "bottom"}
        open={props.open}
        onClose={props.onClose}
        onOpen={props.onOpen}
        swipeAreaWidth={0}
        classes={{
          root: props.drawerClassName,
          paperAnchorRight: classes.paperAnchorRight,
          paperAnchorBottom: clsx(
            classes.paperAnchorBottom,
            props.bottomClassName
          ),
          paper: classes.paperRoot,
        }}
      >
        <Link onClick={props.onClose}>
          <div className={classes.headerMobile}>
            {props.showClose && <div className={classes.closeLine}></div>}
            {props.title && <div className={classes.title}>{props.title}</div>}
          </div>
        </Link>
        {props.children}
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;
