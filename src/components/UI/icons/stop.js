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
          d="M-451,268.9c-6.7,0-12.1,5.5-12.1,12.1c0,6.7,5.5,12.2,12.1,12.2c6.7,0,12.2-5.5,12.2-12.2
		C-438.8,274.3-444.3,268.9-451,268.9z M-451,291.8c-6,0-10.9-4.9-10.9-10.8c0-6,4.9-10.9,10.9-10.9c6,0,10.8,4.9,10.8,10.9
		C-440.2,287-445,291.8-451,291.8z"
        />
        <path
          d="M-447.3,276.4h-7.4c-0.5,0-0.9,0.4-0.9,0.9v7.4c0,0.5,0.4,0.9,0.9,0.9h7.4c0.5,0,0.9-0.4,0.9-0.9v-7.4
		C-446.4,276.8-446.8,276.4-447.3,276.4z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(StopIcon);
