import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "../Tooltip/Tooltip";
import Box from "@material-ui/core/Box";
import IconButton from "../iconButton/iconButton";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles(() => ({
  box: {
    cursor: "pointer",
  },
  navLink: {
    textDecoration: "none",
  },
}));

const Link = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const device = useDevice();

  const children = props.children || props.component;

  const iconButton = props.buttonClassName ? (
    <IconButton className={props.buttonClassName}>{children}</IconButton>
  ) : (
    children
  );

  const navLink = props.link ? (
    <NavLink
      to={props.link}
      className={clsx(props.className, classes.navLink)}
      exact={props.exact}
      strict={props.strict}
      activeClassName={props.activeClassName}
    >
      {iconButton}
    </NavLink>
  ) : (
    iconButton
  );

  const box = props.onClick ? (
    <Box
      ref={ref}
      onClick={props.onClick}
      className={clsx(props.className, device.isNotMobile && classes.box)}
    >
      {navLink}
    </Box>
  ) : (
    navLink
  );

  const tooltip = props.title ? (
    <Tooltip
      arrow
      placement={props.tooltipPlacement}
      title={props.title}
      color={props.tooltipColor}
    >
      {box}
    </Tooltip>
  ) : (
    box
  );

  return tooltip;
});

export default React.memo(Link);
