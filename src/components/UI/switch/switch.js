import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { default as MuiSwitch } from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 60,
    height: 28,
    padding: 0,
    margin: 2,
  },
  switchBase: {
    padding: 1,
    color: "#FFF",
    "&$checked": {
      transform: "translateX(33px)",
      color: "#FFF",
      "& + $track": {
        backgroundColor: theme.palette.color.blue,
        opacity: 1,
        border: "none",
      },
    },
  },
  thumb: {
    width: 24,
    height: 24,
    marginTop: 1,
  },
  track: {
    borderRadius: 50,
    border: "none",
    backgroundColor: theme.palette.color.red,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
}));

const Switch = (props) => {
  const classes = useStyles();
  const device = useDevice();

  return (
    <FormControlLabel
      control={
        <MuiSwitch
          checked={props.checked}
          onChange={props.onChange}
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            checked: classes.checked,
            track: classes.track,
            thumb: classes.thumb,
          }}
        />
      }
      label={props.label}
    />
  );
};

export default Switch;
