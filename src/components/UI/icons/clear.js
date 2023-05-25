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

const ClearIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-465 267 28 28">
      <g>
        <path
          d="M-440.1,273.4h-16.2c-0.4,0-0.8,0.2-1,0.5l-5.6,6.2c-0.5,0.5-0.5,1.3,0,1.9l5.6,6.2c0.3,0.3,0.6,0.5,1,0.5
		h16.2c0.8,0,1.4-0.6,1.4-1.4v-12.4C-438.7,274-439.3,273.4-440.1,273.4z M-440.3,287h-15.9l-5.4-6l5.4-6h15.9V287z"
        />
        <path
          d="M-450.3,284c0.2,0.2,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2l1.9-1.9l1.9,1.9c0.2,0.2,0.4,0.2,0.6,0.2
		s0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-1.9-1.9l1.9-1.9c0.3-0.3,0.3-0.8,0-1.1s-0.8-0.3-1.1,0l-1.9,1.9l-1.9-1.9
		c-0.3-0.3-0.8-0.3-1.1,0c-0.3,0.3-0.3,0.8,0,1.1l1.9,1.9l-1.9,1.9C-450.6,283.2-450.6,283.7-450.3,284z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(ClearIcon);
