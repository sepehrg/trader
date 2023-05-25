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

const CodeAddIcon = (props) => {
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
          d="M-448.2,280.3h-2.1v-2.1c0-0.4-0.3-0.8-0.8-0.8s-0.8,0.3-0.8,0.8v2.1h-2.1c-0.4,0-0.8,0.3-0.8,0.8
		s0.3,0.8,0.8,0.8h2.1v2.1c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-2.1h2.1c0.4,0,0.8-0.3,0.8-0.8S-447.7,280.3-448.2,280.3z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(CodeAddIcon);
