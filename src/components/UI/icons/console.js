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

const ConsoleIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-465 267 28 28">
      <g>
        <path
          d="M-461.9,271.9c-0.3-0.3-0.9-0.3-1.2,0s-0.3,0.9,0,1.2l7.9,7.9l-7.9,7.9c-0.3,0.3-0.3,0.9,0,1.2
      c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.4-0.1,0.6-0.2l8.5-8.5c0.2-0.2,0.2-0.4,0.2-0.6s-0.1-0.4-0.2-0.6L-461.9,271.9z"
        />
        <path
          d="M-439.5,288.7h-12.1c-0.5,0-0.9,0.4-0.9,0.8s0.4,0.8,0.9,0.8h12.1c0.5,0,0.8-0.4,0.8-0.8
      S-439,288.7-439.5,288.7z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(ConsoleIcon);
