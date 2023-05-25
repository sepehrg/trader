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

const NewsIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M22.1,23.9H5.4c-1.6,0-2.9-1.3-2.9-3V5c0-0.5,0.4-0.9,0.9-0.9h15.3c0.5,0,0.9,0.4,0.9,0.9v15.4
			c0,1.4,1.1,2.6,2.5,2.6V23.9z M3.4,5l0,15.9c0,1.2,1,2.1,2.1,2.1h14.4c-0.7-0.6-1.1-1.5-1.1-2.6V5.1L3.4,5z"
        />
        <path
          d="M22.1,23.9c-1.9,0-3.4-1.5-3.4-3.4V8.9h5.8c0.5,0,1,0.4,1,1v10.6C25.5,22.3,24,23.9,22.1,23.9z M19.6,9.7
			v10.7c0,1.4,1.1,2.6,2.5,2.6c1.4,0,2.5-1.2,2.5-2.6V9.8c0-0.1-0.1-0.1-0.1-0.1H19.6z"
        />
        <rect
          className={classes.secondColor}
          x="6"
          y="7.5"
          width="9.8"
          height="0.9"
        />
        <rect
          className={classes.secondColor}
          x="6"
          y="11.6"
          width="2.6"
          height="0.9"
        />
        <rect
          className={classes.secondColor}
          x="6"
          y="14.5"
          width="2.6"
          height="0.9"
        />
        <rect
          className={classes.secondColor}
          x="6"
          y="18.8"
          width="9.8"
          height="0.9"
        />
        <path
          className={classes.secondColor}
          d="M15.9,16.5h-4.6c-0.4,0-0.8-0.4-0.8-0.8v-4.4c0-0.4,0.4-0.8,0.8-0.8h4.6c0.4,0,0.8,0.4,0.8,0.8v4.4
			C16.7,16.1,16.3,16.5,15.9,16.5z M11.4,15.6h4.4v-4.2h-4.4V15.6z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(NewsIcon);
