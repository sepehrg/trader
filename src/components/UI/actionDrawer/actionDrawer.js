import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Button from "../Button/Button";
import Drawer from "../drawer/drawer";

const useStyles = makeStyles((theme) => ({
  btn: {
    width: "100%",
    height: 48,
  },
  actionsRoot: {
    backgroundColor: theme.palette.background.box,
    padding: "6px 14px",
  },
  paperRoot: {
    backgroundColor: theme.palette.background.box,
  },
}));

const ActionDrawer = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      title={props.title}
      open={props.open}
      onClose={props.onClose}
      onOpen={props.onClose}
      anchor="bottom"
      bottomClassName={props.bottomClassName}
      drawerClassName={props.drawerClassName}
      showClose
    >
      {props.children}
      <Grid container className={classes.actionsRoot} spacing={4}>
        {props.actions.map((action, i) => (
          <Grid item xs={6} key={i}>
            <Button
              onClick={action.onClick}
              variant="outlined"
              className={clsx(classes.btn, action.className)}
            >
              {action.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Drawer>
  );
};

export default ActionDrawer;
