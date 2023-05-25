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

const GroupIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M12.3,16.8c1-0.8,1.7-2,1.7-3.3c1.3-1.3,2.9-1.9,4.7-1.9c1.5,0,2.9,0.5,4.1,1.4c0.3,0.2,0.7,0.2,0.9-0.1
		c0.2-0.3,0.2-0.7-0.1-0.9c-0.7-0.5-1.5-1-2.3-1.2c1-0.8,1.7-2,1.7-3.4c0-2.3-1.9-4.2-4.3-4.2s-4.3,1.9-4.3,4.2
		c0,1.4,0.7,2.6,1.7,3.3c-0.9,0.3-1.7,0.8-2.5,1.3c-0.6-1.6-2.1-2.8-4-2.8c-2.3,0-4.3,1.9-4.3,4.3c0,1.4,0.7,2.6,1.7,3.3
		c-2.5,0.8-4.6,2.9-5.3,5.5c-0.2,0.7-0.1,1.4,0.4,1.9C2.7,24.7,3.3,25,4,25h8.1c0.4,0,0.6-0.3,0.6-0.7s-0.3-0.7-0.6-0.7H4
		c-0.3,0-0.5-0.1-0.7-0.3c-0.2-0.2-0.2-0.5-0.2-0.8c0.8-2.9,3.5-5,6.5-5c1.5,0,2.9,0.5,4.1,1.4c0.3,0.2,0.7,0.2,0.9-0.1
		c0.2-0.3,0.2-0.7-0.1-0.9C13.9,17.4,13.1,17,12.3,16.8z M18.9,4.3c1.6,0,2.9,1.3,2.9,2.9c0,1.6-1.3,3-2.9,3s-2.9-1.3-2.9-3
		C15.9,5.6,17.2,4.3,18.9,4.3z M9.8,10.4c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,2.9-2.9,2.9c-1.6,0-3-1.3-3-2.9C6.8,11.7,8.2,10.4,9.8,10.4
		z"
        />
        <path
          className={classes.secondColor}
          d="M25.5,23.7h-9.8c-0.4,0-0.7,0.3-0.7,0.7s0.3,0.7,0.7,0.7h9.8c0.4,0,0.7-0.3,0.7-0.7S25.9,23.7,25.5,23.7z"
        />
        <path
          className={classes.secondColor}
          d="M25.5,20h-7c-0.4,0-0.7,0.3-0.7,0.7s0.3,0.7,0.7,0.7h7c0.4,0,0.7-0.3,0.7-0.7S25.9,20,25.5,20z"
        />
        <path
          className={classes.secondColor}
          d="M19.7,16.9c0,0.4,0.3,0.7,0.7,0.7h5.2c0.4,0,0.7-0.3,0.7-0.7s-0.3-0.7-0.7-0.7h-5.2
		C20,16.3,19.7,16.6,19.7,16.9z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(GroupIcon);
