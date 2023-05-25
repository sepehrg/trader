import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SplitPane from "react-split-pane";

const useStyles = makeStyles((theme) => ({
  resizer: {
    width: "100%",
    height: 11,
    cursor: "row-resize",
    borderRadius: "15px 15px 0px 0px",
    "&:hover": {
      backgroundColor: theme.palette.border.primary,
      "&:after": {
        backgroundColor: theme.palette.primary.main,
      },
      "&:before": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    "&:after": {
      content: "''",
      backgroundColor: theme.palette.border.bar,
      display: "flex",
      margin: "2px auto",
      width: 40,
      height: 2,
      borderRadius: 50,
    },
    "&:before": {
      content: "''",
      backgroundColor: theme.palette.border.bar,
      display: "flex",
      margin: "2px auto",
      width: 40,
      height: 2,
      borderRadius: 50,
    },
  },
}));

const Splitter = (props) => {
  const classes = useStyles(props);

  return (
    <SplitPane
      split={props.split}
      minSize={props.minSize}
      defaultSize={props.defaultSize}
      primary={props.primary}
      style={{ position: "" }}
      pane1Style={
        props.pane1Style || {
          overflow: "hidden scroll",
          width: "100.4%",
          position: "",
        }
      }
      pane2Style={props.pane2Style || { width: "100%", minHeight: 35 }}
      resizerClassName={classes.resizer}
    >
      {props.children}
    </SplitPane>
  );
};

export default Splitter;
