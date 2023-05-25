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

const CreditCardicon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M23.7,5.2H4.3C3,5.2,2,6.2,2,7.5v0.8v4.4v7.8c0,1.3,1,2.3,2.3,2.3h19.4c1.3,0,2.3-1,2.3-2.3v-13C26,6.2,25,5.2,23.7,5.2z
		 M3,7.5c0-0.7,0.6-1.3,1.3-1.3h19.4c0.7,0,1.3,0.6,1.3,1.3v0.8H3V7.5z M25,9.3v2.4H3V9.3H25z M23.7,21.8H4.3
		c-0.7,0-1.3-0.6-1.3-1.3v-7.8h22v7.8C25,21.2,24.4,21.8,23.7,21.8z"
        />
        <path
          className={classes.secondColor}
          d="M21.5,15.3h-1.2c-0.4,0-0.8,0.2-1.1,0.5c-0.3,0.3-0.4,0.7-0.4,1.1v1.2c0,0.8,0.7,1.5,1.5,1.5h1.2c0.8,0,1.5-0.7,1.5-1.5
		v-1.2C23.1,16,22.4,15.3,21.5,15.3z M22.1,18.1c0,0.3-0.2,0.5-0.5,0.5h-1.2c-0.3,0-0.5-0.2-0.5-0.5v-1.2c0-0.1,0.1-0.3,0.2-0.4
		c0.1-0.1,0.2-0.2,0.4-0.2h1.2c0.3,0,0.5,0.2,0.5,0.5V18.1z"
        />
        <rect
          className={classes.secondColor}
          x="5.6"
          y="16"
          width="8.1"
          height="1"
        />
        <rect
          className={classes.secondColor}
          x="5.6"
          y="18.1"
          width="8.1"
          height="1"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(CreditCardicon);
