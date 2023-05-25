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

const BillIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M25.2,2.7c-0.2-0.1-0.4-0.1-0.6,0.1l-2.7,2.4l-2.7-2.4c-0.2-0.2-0.5-0.2-0.8,0l-2.7,2.4l-2.7-2.4
		c-0.2-0.2-0.5-0.2-0.8,0L9.7,5.3L7,2.8C6.8,2.7,6.6,2.7,6.4,2.7C6.2,2.8,6,3,6,3.3v15.5h-3c-0.3,0-0.6,0.3-0.6,0.6v2.3
		c0,2,1.6,3.7,3.7,3.7l15.2,0c0,0,0,0,0,0l0,0c0,0,0,0,0,0h0.4c2,0,3.7-1.6,3.7-3.7V3.3C25.5,3,25.4,2.8,25.2,2.7z M6.2,24.2
		c-1.4,0-2.5-1.1-2.5-2.5v-1.7h14.1v1.7c0,1,0.4,1.9,1,2.5H6.2z M24.4,21.6c0,1.4-1.1,2.5-2.5,2.5h-0.4c0,0,0,0,0,0
		c-1.4,0-2.5-1.2-2.5-2.5v-2.3c0-0.3-0.3-0.6-0.6-0.6H7.2V4.6l2.1,1.9c0.2,0.2,0.5,0.2,0.8,0L12.7,4l2.7,2.4c0.2,0.2,0.5,0.2,0.8,0
		L18.8,4l2.7,2.4c0.2,0.2,0.5,0.2,0.8,0l2.1-1.9V21.6z"
        />
        <path
          className={classes.secondColor}
          d="M15.3,11.4h5.2c0.3,0,0.6-0.3,0.6-0.6c0-0.3-0.3-0.6-0.6-0.6h-5.2c-0.3,0-0.6,0.3-0.6,0.6
		C14.8,11.1,15,11.4,15.3,11.4z"
        />
        <path
          className={classes.secondColor}
          d="M20.5,14.3h-9.2c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6h9.2c0.3,0,0.6-0.3,0.6-0.6
		C21.1,14.5,20.9,14.3,20.5,14.3z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(BillIcon);
