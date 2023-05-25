import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { default as MuiIconButton } from "@material-ui/core/IconButton";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      // backgroundColor: `${theme.palette.primary.main}22`, //--color-secondary-hover
      backgroundColor: "transparent",
    },
  },
}));

const IconButton = (props) => {
  const classes = useStyles();

  return (
    <MuiIconButton
      className={clsx([props.className, classes.root])}
      disableRipple={true}
    >
      {props.children}
    </MuiIconButton>
  );
};

export default IconButton;
