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

const MoneyIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M23.6,5.4L23.6,5.4H21H7H4.4C3.1,5.4,2,6.4,2,7.7v2.9v6.8v2.9c0,1.3,1.1,2.4,2.4,2.4H7h14h2.6h0c1.3,0,2.4-1.1,2.4-2.4V7.7
		C26,6.4,24.9,5.4,23.6,5.4z M23.6,6.4C24.4,6.4,25,7,25,7.7v1.9h-1.1c-1.1,0-1.9-0.9-1.9-1.9V6.4H23.6z M3,7.7C3,7,3.6,6.4,4.4,6.4
		H6v1.3c0,1.1-0.9,1.9-1.9,1.9H3V7.7z M4.4,21.6C3.6,21.6,3,21,3,20.3v-1.9h1.1c1.1,0,1.9,0.9,1.9,1.9v1.3H4.4z M7,21.6v-1.3
		c0-1.6-1.3-2.9-2.9-2.9H3v-6.8h1.1C5.7,10.6,7,9.3,7,7.7V6.4h14v1.3c0,1.6,1.3,2.9,2.9,2.9H25v6.8h-1.1c-1.6,0-2.9,1.3-2.9,2.9v1.3
		H7z M22,21.6v-1.3c0-1.1,0.9-1.9,1.9-1.9H25v1.9c0,0.7-0.6,1.4-1.4,1.4H22z"
        />
        <path
          className={classes.secondColor}
          d="M14,8.9c-2.5,0-4.6,2.3-4.6,5.1s2.1,5.1,4.6,5.1c2.5,0,4.6-2.3,4.6-5.1S16.5,8.9,14,8.9z M14,18.1c-2,0-3.6-1.9-3.6-4.1
		c0-2.3,1.6-4.1,3.6-4.1s3.6,1.9,3.6,4.1C17.6,16.3,16,18.1,14,18.1z"
        />
        <circle className={classes.secondColor} cx="6.3" cy="14" r="1" />
        <circle className={classes.secondColor} cx="21.9" cy="14" r="1" />
      </g>
    </SvgIcon>
  );
};

export default React.memo(MoneyIcon);
