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

const CodeIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-465 267 28 28">
      <g>
        <path
          d="M-439.5,280.3c-1.1,0-2-0.9-2-2v-0.8V275c0-2-1.6-3.5-3.5-3.5c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8
		c1.1,0,2,0.9,2,2v2.4v0.8c0,1.1,0.6,2.1,1.4,2.8c-0.8,0.6-1.4,1.7-1.4,2.8v0.8v2.4c0,1.1-0.9,2-2,2c-0.4,0-0.8,0.3-0.8,0.8
		s0.3,0.8,0.8,0.8c2,0,3.5-1.6,3.5-3.5v-2.4v-0.8c0-1.1,0.9-2,2-2c0.4,0,0.8-0.3,0.8-0.8S-439.1,280.3-439.5,280.3z"
        />
        <path
          d="M-459,278.2v-0.8V275c0-1.1,0.9-2,2-2c0.4,0,0.8-0.3,0.8-0.8s-0.3-0.8-0.8-0.8c-2,0-3.5,1.6-3.5,3.5v2.4v0.8
		c0,1.1-0.9,2-2,2c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8c1.1,0,2,0.9,2,2v0.8v2.4c0,2,1.6,3.5,3.5,3.5c0.4,0,0.8-0.3,0.8-0.8
		s-0.3-0.8-0.8-0.8c-1.1,0-2-0.9-2-2v-2.4v-0.8c0-1.1-0.6-2.1-1.4-2.8C-459.5,280.4-459,279.3-459,278.2z"
        />
        <path
          className={classes.secondColor}
          d="M-453.9,279.7c-0.7,0-1.3,0.6-1.3,1.3c0,0.7,0.6,1.3,1.3,1.3c0.7,0,1.3-0.6,1.3-1.3
		C-452.6,280.3-453.2,279.7-453.9,279.7z"
        />
        <path
          className={classes.secondColor}
          d="M-448.1,279.7c-0.7,0-1.3,0.6-1.3,1.3c0,0.7,0.6,1.3,1.3,1.3c0.7,0,1.3-0.6,1.3-1.3
		C-446.8,280.3-447.4,279.7-448.1,279.7z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(CodeIcon);
