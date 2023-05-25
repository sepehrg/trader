import React from "react";
import { default as MaterialSvgIcon } from "@material-ui/core/SvgIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "28px",
    width: "28px",
    stroke: "none",
    fill: theme.palette.icon.primary,
    verticalAlign: "middle",
    transition: "0.3s",
    "&:hover": {},
  },
}));

const SvgIcon = (props) => {
  const classes = useStyles();

  return (
    <MaterialSvgIcon
      className={[classes.root, props.className].join(" ")}
      viewBox={props.viewBox || "0 0 28 28"}
    >
      {props.children}
    </MaterialSvgIcon>
  );
};

export default SvgIcon;
