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

const CandleStickIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <polygon points="3,2.5 2,2.5 2,26 25.5,26 25.5,25 3,25 	" />
        <path
          className={classes.secondColor}
          d="M6.6,20.9h0.8v1.4h1v-1.4h0.8c0.6,0,1.1-0.5,1.1-1.1v-4.3c0-0.6-0.5-1.1-1.1-1.1H8.4V7.9h-1v6.5H6.6
		c-0.6,0-1.1,0.5-1.1,1.1v4.3C5.5,20.4,6,20.9,6.6,20.9z M6.5,15.5C6.5,15.4,6.5,15.4,6.5,15.5l2.7-0.1c0,0,0.1,0,0.1,0.1v4.3
		c0,0,0,0.1-0.1,0.1H6.6c-0.1,0-0.1,0-0.1-0.1V15.5z"
        />
        <path
          d="M14.4,16.5h0.8v5h1v-5H17c0.6,0,1.1-0.5,1.1-1.1V5.9c0-0.6-0.5-1.1-1.1-1.1h-0.8V2.7h-1v2.1h-0.8c-0.6,0-1.1,0.5-1.1,1.1
		v9.6C13.3,16,13.8,16.5,14.4,16.5z M14.3,5.9C14.3,5.8,14.3,5.8,14.3,5.9L17,5.8c0.1,0,0.1,0,0.1,0.1v9.6c0,0.1,0,0.1-0.1,0.1h-2.6
		c0,0-0.1,0-0.1-0.1V5.9z"
        />
        <path
          className={classes.secondColor}
          d="M24.8,8.5H24V4.4h-1v4.1h-0.8c-0.6,0-1.1,0.5-1.1,1.1v7.5c0,0.6,0.5,1.1,1.1,1.1H23v1.4h1v-1.4h0.8c0.6,0,1.1-0.5,1.1-1.1
		V9.6C25.9,9,25.4,8.5,24.8,8.5z M24.9,17.1C24.9,17.1,24.8,17.2,24.9,17.1l-2.7,0.1c0,0-0.1,0-0.1-0.1V9.6c0-0.1,0-0.1,0.1-0.1h2.6
		c0,0,0.1,0,0.1,0.1V17.1z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(CandleStickIcon);
