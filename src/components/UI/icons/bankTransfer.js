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

const BankTransferIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          className={classes.secondColor}
          d="M7.9,13c0,3.3,2.7,6,6,6c3.3,0,6-2.7,6-6c0-3.3-2.7-6-6-6C10.7,6.9,7.9,9.7,7.9,13z M19,13c0,2.8-2.3,5-5,5
		c-2.8,0-5-2.3-5-5c0-2.8,2.3-5,5-5C16.8,7.9,19,10.2,19,13z"
        />
        <path
          d="M14,3.1c4,0,7.4,2.3,9,5.8l-1.5-0.8L21.1,9l3.1,1.7l1.8-3l-0.9-0.5l-1,1.7C22.4,4.7,18.5,2.1,14,2.1
		c-2.4,0-4.7,0.8-6.7,2.3l0.6,0.8C9.7,3.8,11.8,3.1,14,3.1z"
        />
        <path
          d="M4.1,13c0-1.7,0.4-3.4,1.3-4.9l0.2,1.4l1-0.2L6,6.1L2.4,6.9l0.2,1l2-0.4C3.6,9.2,3.1,11,3.1,13c0,4.6,2.9,8.7,7.2,10.3
		l0.3-0.9C6.7,20.9,4.1,17.2,4.1,13z"
        />
        <path
          d="M14.7,22.9l1.1-1.1L15.1,21l-2.4,2.4l2.3,2.4l0.7-0.7l-1.2-1.2c5.7-0.3,10.3-5.1,10.3-10.9h-1
		C23.9,18.2,19.9,22.5,14.7,22.9z"
        />
        <path
          className={classes.secondColor}
          d="M13.5,9.3V10c-0.8,0.1-1.5,0.8-1.5,1.7c0,1,0.8,1.8,1.8,1.8h1c0.4,0.1,0.6,0.4,0.6,0.7c0,0.4-0.3,0.8-0.8,0.8h-2.1v1h1v0.7
		h1v-0.7h0.1c1,0,1.8-0.8,1.8-1.8s-0.8-1.8-1.8-1.8h-0.7v0h-0.1c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h2.1v-1h-1.3V9.3H13.5z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(BankTransferIcon);
