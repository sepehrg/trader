import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import { makeStyles } from "@material-ui/core/styles";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  secondColor: {
    fill: theme.palette.primary.main,
    stroke: (props) => (props.isMobile ? theme.palette.primary.main : "none"),
  },
}));

const StopIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-465 267 28 28">
      <g>
        <path
          d="M-451,268.8c-6.7,0-12.2,5.5-12.2,12.2c0,6.7,5.5,12.2,12.2,12.2c6.7,0,12.2-5.5,12.2-12.2
		C-438.8,274.3-444.3,268.8-451,268.8z M-451,291.8c-6,0-10.8-4.8-10.8-10.8s4.8-10.8,10.8-10.8s10.8,4.8,10.8,10.8
		S-445,291.8-451,291.8z"
        />
        <path
          d="M-445.6,279.9l-7.6-4.3c-1-0.6-1.8-0.1-1.8,1.1v8.7c0,1.2,0.8,1.7,1.8,1.1l7.6-4.3
		C-444.5,281.5-444.5,280.5-445.6,279.9z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(StopIcon);
