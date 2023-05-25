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

const CheckListIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M22.8,3.7h-4.1V3c0-0.6-0.5-1-1-1h-7.4c-0.6,0-1,0.5-1,1v0.7H5.2c-0.8,0-1.5,0.7-1.5,1.5v19.3c0,0.8,0.7,1.5,1.5,1.5h17.5
		c0.8,0,1.5-0.7,1.5-1.5V5.2C24.2,4.4,23.6,3.7,22.8,3.7z M17.7,3L17.7,3l0,2.3l-7.4,0l0-2.3H17.7z M23.2,24.5
		c0,0.3-0.2,0.5-0.5,0.5H5.2c-0.3,0-0.5-0.2-0.5-0.5V5.2c0-0.3,0.2-0.5,0.5-0.5h4.1v0.6c0,0.6,0.5,1,1,1h7.4c0.6,0,1-0.5,1-1V4.7
		h4.1c0.3,0,0.5,0.2,0.5,0.5V24.5z"
        />
        <rect
          className={classes.secondColor}
          x="7.2"
          y="10.3"
          width="6.2"
          height="1"
        />
        <polygon
          className={classes.secondColor}
          points="17.6,10.8 16.8,10 16.1,10.7 17.6,12.2 20.5,9.4 19.8,8.7 	"
        />
        <rect
          className={classes.secondColor}
          x="7.2"
          y="15.2"
          width="6.2"
          height="1"
        />
        <polygon
          className={classes.secondColor}
          points="17.6,15.7 16.8,14.9 16.1,15.6 17.6,17.2 20.5,14.3 19.8,13.6 	"
        />
        <rect
          className={classes.secondColor}
          x="7.2"
          y="20.1"
          width="6.2"
          height="1"
        />
        <polygon
          className={classes.secondColor}
          points="17.6,20.7 16.8,19.8 16.1,20.5 17.6,22.1 20.5,19.3 19.8,18.6 	"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(CheckListIcon);
