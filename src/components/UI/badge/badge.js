import React from "react";
import { default as MuiBadge } from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Badge = (props) => {
  const classes = useStyles();

  return (
    <MuiBadge
      badgeContent={props.badgeContent}
      color="primary"
      className={props.className}
    >
      {props.children}
    </MuiBadge>
  );
};

export default Badge;
