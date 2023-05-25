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

const FactoryIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          className={classes.secondColor}
          d="M12,17.3H6.9c-0.5,0-1,0.4-1,1v2.7c0,0.6,0.4,1,1,1H12c0.5,0,1-0.4,1-1v-2.7C13,17.8,12.6,17.3,12,17.3z
		 M6.9,21.1l0-2.7l5.1,0l0,2.7L6.9,21.1z"
        />
        <path
          d="M25.4,7.3c-0.2-0.1-0.4-0.1-0.5,0l-6.7,4.2V7.7c0-0.2-0.1-0.3-0.3-0.4c-0.2-0.1-0.4-0.1-0.5,0l-6.7,4.2V7.7
		V2.5c0-0.3-0.2-0.5-0.5-0.5H5.3C5.1,2,4.8,2.2,4.8,2.5v8l-2.3,1.4c-0.1,0.1-0.2,0.3-0.2,0.4v13.2c0,0.3,0.2,0.5,0.5,0.5h22.4
		c0.3,0,0.5-0.2,0.5-0.5V7.7C25.7,7.5,25.6,7.4,25.4,7.3z M5.8,3h3.9v4.4L5.8,9.9V3z M24.7,25H3.3V12.6l6.5-4v3.7
		c0,0.2,0.1,0.3,0.3,0.4c0.2,0.1,0.4,0.1,0.5,0l6.7-4.2v3.7c0,0.2,0.1,0.3,0.3,0.4c0.2,0.1,0.4,0.1,0.5,0l6.7-4.2V25z"
        />
        <path
          className={classes.secondColor}
          d="M15,18.3v2.7c0,0.6,0.4,1,1,1h5.1c0.5,0,1-0.4,1-1v-2.7c0-0.5-0.4-1-1-1H16C15.4,17.3,15,17.8,15,18.3z
		 M21.1,18.3l0,2.7l-5.1,0l0-2.7L21.1,18.3z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(FactoryIcon);
