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

const HistoryIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M14.8,2.8c-5.7,0-10.4,4.3-11.1,9.8l-0.8-1l-0.8,0.6L4,14.7l2.5-2.1l-0.6-0.8l-1.2,1c0.6-5.1,4.9-9.1,10.1-9.1
		C20.5,3.8,25,8.4,25,14c0,5.6-4.6,10.2-10.2,10.2c-3.3,0-6.2-1.5-8.2-4.1l-0.8,0.6c2.1,2.9,5.4,4.5,9,4.5C21,25.2,26,20.2,26,14
		C26,7.8,21,2.8,14.8,2.8z"
        />
        <polygon
          className={classes.secondColor}
          points="13.9,7.3 13.9,14.2 14.1,14.6 18.9,18.1 19.5,17.3 14.9,13.9 14.9,7.3 	"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(HistoryIcon);
