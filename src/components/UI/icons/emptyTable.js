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

const EmptyTableIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-497 499 28 28">
      <g>
        <path
          d="M-472.9,521.8h-20.1c-1.1,0-2-0.9-2-2v-13.7c0-1.1,0.9-2,2-2h20.1c1.1,0,2,0.9,2,2v13.7
			C-471,520.9-471.8,521.8-472.9,521.8z M-493.1,505.3c-0.5,0-0.9,0.4-0.9,0.9v13.7c0,0.5,0.4,0.9,0.9,0.9h20.1
			c0.5,0,0.9-0.4,0.9-0.9v-13.7c0-0.5-0.4-0.9-0.9-0.9H-493.1z"
        />
        <path
          d="M-485.4,513.1c-0.8,0-1.5-0.7-1.5-1.5c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5c0,0.2,0.2,0.4,0.4,0.4
			s0.4-0.2,0.4-0.4c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5C-483.9,512.4-484.5,513.1-485.4,513.1z"
        />
        <path
          d="M-480.6,513.1c-0.8,0-1.5-0.7-1.5-1.5c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5c0,0.2,0.2,0.4,0.4,0.4
			c0.2,0,0.4-0.2,0.4-0.4c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5C-479.1,512.4-479.8,513.1-480.6,513.1z"
        />
        <path
          d="M-480.3,517.3c-0.2,0-0.4-0.1-0.5-0.3c-0.5-0.8-1.3-1.3-2.2-1.3c-0.9,0-1.7,0.5-2.2,1.3
			c-0.2,0.3-0.5,0.3-0.8,0.2c-0.3-0.2-0.3-0.5-0.2-0.8c0.7-1.1,1.9-1.8,3.2-1.8c1.3,0,2.5,0.7,3.2,1.8c0.2,0.3,0.1,0.6-0.2,0.8
			C-480.1,517.2-480.2,517.3-480.3,517.3z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(EmptyTableIcon);
