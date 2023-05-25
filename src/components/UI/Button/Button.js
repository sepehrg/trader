import React from "react";
import { default as MuiButton } from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "inherit",
    // whiteSpace: "nowrap",
  },
}));

const Button = (props) => {
  const classes = useStyles();

  return (
    <MuiButton
      type={props.type}
      variant={props.variant ?? "contained"}
      color={props.color}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      onClick={props.onClick}
      classes={{
        root: classes.root,
        contained: props.containedBtn,
        disabled: props.disabledBtn,
      }}
      className={props.className}
    >
      {props.children}
    </MuiButton>
  );
};

export default Button;
