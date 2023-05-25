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

const MapIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox="-497 499 28 28" {...props}>
      <g>
        <path
          d="M-471.5,523.9c-0.1,0-0.1,0-0.2,0l-7.5-2.7l-7.5,2.7c-0.1,0-0.3,0-0.4,0l-7.7-2.8c-0.2-0.1-0.4-0.3-0.4-0.5
		v-17.8c0-0.2,0.1-0.3,0.2-0.5c0.1-0.1,0.3-0.1,0.5-0.1l7.5,2.7l7.5-2.7c0.1,0,0.3,0,0.4,0l7.7,2.8c0.2,0.1,0.4,0.3,0.4,0.5v17.8
		c0,0.2-0.1,0.3-0.2,0.5C-471.3,523.8-471.4,523.9-471.5,523.9z M-494,520.1l7.1,2.6l7.5-2.7c0.1,0,0.3,0,0.4,0l6.9,2.5v-16.7
		l-7.1-2.6l-7.5,2.7c-0.1,0-0.3,0-0.4,0l-6.9-2.5V520.1z"
        />

        <path
          className={classes.secondColor}
          d="M-479.2,519.5c-0.3,0-0.5-0.2-0.5-0.5v-14.7c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5V519
		C-478.6,519.3-478.9,519.5-479.2,519.5z"
        />

        <path
          className={classes.secondColor}
          d="M-486.8,522.3c-0.3,0-0.5-0.2-0.5-0.5V507c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v14.7
		C-486.3,522.1-486.5,522.3-486.8,522.3z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(MapIcon);
