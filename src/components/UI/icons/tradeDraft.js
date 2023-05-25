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

const TradeDraftIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-465 267 28 28">
      <g>
        <path
          className={classes.secondColor}
          d="M-439.1,284.4l-2.7-2.7c-0.2-0.2-0.6-0.2-0.8,0l-1.7,1.7c0,0,0,0,0,0l-4.1,4.1c-0.1,0.1-0.2,0.2-0.2,0.4
	l-0.1,2.8c0,0.2,0.1,0.3,0.2,0.5c0.1,0.1,0.3,0.2,0.4,0.2c0,0,0,0,0,0l2.8-0.1c0.1,0,0.3-0.1,0.4-0.2l4.1-4.1l1.7-1.7
	c0.1-0.1,0.2-0.3,0.2-0.4S-439,284.5-439.1,284.4z M-445.6,290l-1.9,0.1l0.1-1.9l3.6-3.6l1.8,1.8L-445.6,290z M-441.2,285.6
	l-1.8-1.8l0.8-0.8l1.8,1.8L-441.2,285.6z"
        />
        <path
          d="M-441.6,276.1l-6.1-5.3c-0.2-0.2-0.4-0.2-0.6-0.1c-0.2,0.1-0.4,0.3-0.4,0.5v2.6h-5.3c-0.3,0-0.6,0.3-0.6,0.6
	s0.3,0.6,0.6,0.6h5.9c0.3,0,0.6-0.3,0.6-0.6v-1.8l4.6,4l-4.6,4v-1.8c0-0.3-0.3-0.6-0.6-0.6h-7.7v-2.6c0-0.2-0.1-0.4-0.4-0.5
	c-0.2-0.1-0.5-0.1-0.6,0.1l-6.1,5.3c-0.1,0.1-0.2,0.3-0.2,0.5s0.1,0.3,0.2,0.5l6.1,5.3c0.1,0.1,0.3,0.1,0.4,0.1c0.1,0,0.2,0,0.2-0.1
	c0.2-0.1,0.4-0.3,0.4-0.5v-2.6h5.3c0.3,0,0.6-0.3,0.6-0.6s-0.3-0.6-0.6-0.6h-5.9c-0.3,0-0.6,0.3-0.6,0.6v1.8l-4.6-4l4.6-4v1.8
	c0,0.3,0.3,0.6,0.6,0.6h7.7v2.6c0,0.2,0.1,0.4,0.4,0.5c0.1,0,0.2,0.1,0.2,0.1c0.1,0,0.3,0,0.4-0.1l6.1-5.3c0.1-0.1,0.2-0.3,0.2-0.5
	C-441.4,276.4-441.5,276.2-441.6,276.1z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(TradeDraftIcon);
