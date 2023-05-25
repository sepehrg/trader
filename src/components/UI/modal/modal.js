import React, { useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Draggable from "react-draggable";
import clsx from "clsx";
import CloseIcon from "../../UI/icons/close";
import Link from "../Link/Link";
import MoveIcon from "../../UI/icons/move";
import MinimizeIcon from "../../UI/icons/minimize";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    backgroundColor: theme.palette.background.box,
    borderRadius: 7,
    // border: `1px solid ${theme.palette.border.primary}`,
    boxShadow: "0px 0px 10px 5px #00000033",
    width: (props) => props.width,
    top: "30%",
    left: "30%",
    margin: 4,
  },
  title: {
    padding: 8,
    flexGrow: 1,
    textAlign: "right",
    // backgroundColor: theme.palette.background.paper,
    borderRadius: "7px 0 0 0",
    fontSize: 11,
  },
  actions: {
    display: "flex",
    borderRadius: "4px 4px 0 0",
    overflow: "hidden",
  },
  button: {
    fill: `${theme.palette.text.primary}`,
    backgroundColor: `${theme.palette.border.bar}`,
    padding: 9,
    transition: "0.3s",
    width: 45,
    height: 30,
  },
  close: {
    // borderRadius: "0 7px 0 0",
    "&:hover": {
      backgroundColor: `${theme.palette.color.red}`,
      fill: "#FFF",
    },
  },
  move: {
    cursor: "move",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}`,
      fill: "#FFF",
    },
  },
  minimize: {
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}`,
      fill: "#FFF",
    },
  },
}));

let zIndex = 1000;

const Modal = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const modal = useRef();

  const clickHandler = () => {
    setZIndex();
  };

  useEffect(() => {
    setZIndex();
  }, []);

  const setZIndex = () => {
    modal.current.style.zIndex = zIndex + 1;
    zIndex++;
  };

  return (
    <React.Fragment>
      {props.open && (
        <Draggable
          handle=".handle"
          enableUserSelectHack={false}
          cancel=".no-drag"
          bounds="body"
        >
          <div
            className={classes.root}
            style={{ top: props.top, left: props.left }}
            onClick={clickHandler}
            ref={modal}
          >
            <div
              className={clsx(classes.actions, "handle")}
              style={
                props.title && {
                  backgroundColor: theme.palette.border.secondary,
                  cursor: "move",
                }
              }
            >
              {!props.hideClose && (
                <Link onClick={props.onClose}>
                  <CloseIcon
                    className={clsx(classes.button, classes.close)}
                  ></CloseIcon>
                </Link>
              )}
              {!props.hideMove && (
                <Link onClick={props.onMove}>
                  <MoveIcon
                    className={clsx(classes.button, classes.move)}
                  ></MoveIcon>
                </Link>
              )}
              {!props.hideMinimize && (
                <Link onClick={props.onMinimize}>
                  <MinimizeIcon
                    className={clsx(classes.button, classes.minimize)}
                  ></MinimizeIcon>
                </Link>
              )}
              {props.title && (
                <div className={classes.title}>{props.title}</div>
              )}
            </div>
            {props.children}
          </div>
        </Draggable>
      )}
    </React.Fragment>
  );
};

export default React.memo(Modal);
