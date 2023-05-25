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

const TradeTodayIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-497 499 28 28">
      <g>
        <path
          d="M-474.6,506.4l-5.8-5c-0.2-0.2-0.4-0.2-0.6-0.1c-0.2,0.1-0.3,0.3-0.3,0.5v2.4h-5.4c-0.3,0-0.6,0.3-0.6,0.6
	s0.3,0.6,0.6,0.6h6c0.3,0,0.6-0.3,0.6-0.6v-1.7l4.2,3.6l-4.2,3.6v-1.7c0-0.3-0.3-0.6-0.6-0.6h-7.4v-2.4c0-0.2-0.1-0.4-0.4-0.5
	c-0.2-0.1-0.5-0.1-0.6,0.1l-5.8,5c-0.1,0.1-0.2,0.3-0.2,0.5s0.1,0.3,0.2,0.5l5.8,5c0.1,0.1,0.3,0.1,0.4,0.1c0.1,0,0.2,0,0.3-0.1
	c0.2-0.1,0.4-0.3,0.4-0.5v-2.4h5.4c0.3,0,0.6-0.3,0.6-0.6s-0.3-0.6-0.6-0.6h-6c-0.3,0-0.6,0.3-0.6,0.6v1.7l-4.2-3.6l4.2-3.6v1.7
	c0,0.3,0.3,0.6,0.6,0.6h7.4v2.4c0,0.2,0.1,0.4,0.3,0.5c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.3,0,0.4-0.1l5.8-5c0.1-0.1,0.2-0.3,0.2-0.5
	S-474.5,506.5-474.6,506.4z"
        />
        <path
          className={classes.secondColor}
          d="M-476.5,523.7c-3.1,0-5.6-2.5-5.6-5.6c0-3.1,2.5-5.6,5.6-5.6c3.1,0,5.6,2.5,5.6,5.6
		C-470.9,521.2-473.4,523.7-476.5,523.7z M-476.5,513.8c-2.4,0-4.4,2-4.4,4.4s2,4.4,4.4,4.4c2.4,0,4.4-2,4.4-4.4
		S-474.1,513.8-476.5,513.8z"
        />

        <path
          className={classes.secondColor}
          d="M-477.5,520.5c-0.1,0-0.3,0-0.4-0.1l-1.6-1.3c-0.2-0.2-0.3-0.5-0.1-0.8c0.2-0.2,0.5-0.3,0.8-0.1l1.1,1
			l2.6-3.1c0.2-0.2,0.5-0.3,0.8-0.1c0.2,0.2,0.3,0.5,0.1,0.8l-2.9,3.5C-477.1,520.4-477.3,520.4-477.5,520.5
			C-477.4,520.5-477.4,520.5-477.5,520.5z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(TradeTodayIcon);
