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

const TradeQueueIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-497 499 28 28">
      <g>
        <path
          d="M-472.7,508.9l-6.3-5.5c-0.2-0.1-0.4-0.2-0.6-0.1c-0.2,0.1-0.3,0.3-0.3,0.5v2.8h-6c-0.3,0-0.5,0.2-0.5,0.5
    s0.2,0.5,0.5,0.5h6.5c0.3,0,0.5-0.2,0.5-0.5v-2.1l4.9,4.3l-4.9,4.3v-2.1c0-0.3-0.2-0.5-0.5-0.5h-8.2v-2.8c0-0.2-0.1-0.4-0.3-0.5
    c-0.2-0.1-0.4-0.1-0.6,0.1l-6.3,5.5c-0.1,0.1-0.2,0.3-0.2,0.4s0.1,0.3,0.2,0.4l6.3,5.5c0.1,0.1,0.2,0.1,0.4,0.1c0.1,0,0.2,0,0.2,0
    c0.2-0.1,0.3-0.3,0.3-0.5v-2.8h6c0.3,0,0.5-0.2,0.5-0.5s-0.2-0.5-0.5-0.5h-6.5c-0.3,0-0.5,0.2-0.5,0.5v2.1l-4.9-4.3l4.9-4.3v2.1
    c0,0.3,0.2,0.5,0.5,0.5h8.2v2.8c0,0.2,0.1,0.4,0.3,0.5c0.1,0,0.2,0,0.2,0c0.1,0,0.3,0,0.4-0.1l6.3-5.5c0.1-0.1,0.2-0.3,0.2-0.4
    S-472.6,509-472.7,508.9z"
        />
        <path
          className={classes.secondColor}
          d="M-475.4,523.7c-2.4,0-4.4-2-4.4-4.4s2-4.4,4.4-4.4s4.4,2,4.4,4.4S-472.9,523.7-475.4,523.7z M-475.4,515.9
      c-1.8,0-3.3,1.5-3.3,3.3s1.5,3.3,3.3,3.3c1.8,0,3.3-1.5,3.3-3.3S-473.5,515.9-475.4,515.9z"
        />

        <path
          className={classes.secondColor}
          d="M-474.1,521.2c-0.1,0-0.2,0-0.3-0.1l-1.3-1c-0.1-0.1-0.2-0.3-0.2-0.4v-2.3c0-0.3,0.2-0.5,0.5-0.5
      s0.5,0.2,0.5,0.5v2l1.1,0.8c0.2,0.2,0.3,0.5,0.1,0.8C-473.8,521.1-473.9,521.2-474.1,521.2z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(TradeQueueIcon);
