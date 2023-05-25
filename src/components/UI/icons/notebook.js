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

const NotebookIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M22.6,4.4h-3.3V2.5h-1v1.9h-3.8V2.5h-1v1.9H9.7V2.5h-1v1.9H5.4c-0.6,0-1.1,0.5-1.1,1.1v19.5c0,0.6,0.5,1.1,1.1,1.1h17.2
		c0.6,0,1.1-0.5,1.1-1.1V5.5C23.7,4.9,23.2,4.4,22.6,4.4z M22.7,24.9C22.7,25,22.7,25,22.7,24.9L5.4,25c0,0-0.1,0-0.1-0.1V5.4
		c0,0,0-0.1,0.1-0.1h3.3V8h1V5.4h3.8V8h1V5.4h3.8V8h1V5.4h3.3c0,0,0.1,0,0.1,0.1V24.9z"
        />
        <rect
          className={classes.secondColor}
          x="9.2"
          y="12.4"
          width="9.5"
          height="1"
        />
        <rect
          className={classes.secondColor}
          x="9.2"
          y="16"
          width="9.5"
          height="1"
        />
        <rect
          className={classes.secondColor}
          x="9.2"
          y="19.6"
          width="9.5"
          height="1"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(NotebookIcon);
