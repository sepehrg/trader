import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { default as MuiTooltip } from "@material-ui/core/Tooltip";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: "11px",
    color: "#fff",
    backgroundColor: (props) => props.color ?? theme.palette.primary.main,
    borderRadius: "7px",
  },
  arrow: {
    color: (props) => props.color ?? theme.palette.primary.main,
  },
}));

const Tooltip = React.forwardRef((props, ref) => {
  const classes = useStyles(props);
  const device = useDevice();

  return (
    <>
      {!props.disabled && device.isNotMobile ? (
        <MuiTooltip
          arrow
          ref={ref}
          placement={props.placement}
          title={props.title}
          className={props.className}
          onOpen={props.onOpen}
          classes={{
            tooltip: classes.tooltip,
            arrow: classes.arrow,
          }}
        >
          {props.children}
        </MuiTooltip>
      ) : (
        props.children
      )}
    </>
  );
});

export default Tooltip;
