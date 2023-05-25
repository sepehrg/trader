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

const WatchListIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox="0 0 28 28" {...props}>
      <g>
        <path
          d="M23.9,2H4.1C2.9,2,2,2.9,2,4.1v19.9C2,25.1,2.9,26,4.1,26h19.9c1.1,0,2.1-0.9,2.1-2.1V4.1C26,2.9,25.1,2,23.9,2z M25,23.9
		c0,0.6-0.5,1.1-1.1,1.1H4.1C3.5,25,3,24.5,3,23.9V4.1C3,3.5,3.5,3,4.1,3h19.9C24.5,3,25,3.5,25,4.1V23.9z"
        />
        <rect
          className={classes.secondColor}
          x="6.6"
          y="7.3"
          width="8.1"
          height="1"
        />
        <rect
          className={classes.secondColor}
          x="18.1"
          y="7.3"
          width="3.3"
          height="1"
        />
        <rect
          className={classes.secondColor}
          x="6.6"
          y="13.5"
          width="8.1"
          height="1"
        />
        <rect
          className={classes.secondColor}
          x="18.1"
          y="13.5"
          width="3.3"
          height="1"
        />
        <rect
          className={classes.secondColor}
          x="6.6"
          y="19.8"
          width="8.1"
          height="1"
        />
        <rect
          className={classes.secondColor}
          x="18.1"
          y="19.8"
          width="3.3"
          height="1"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(WatchListIcon);
