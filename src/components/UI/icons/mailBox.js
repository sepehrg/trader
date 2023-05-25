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

const MailBoxIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-479 281 28 28">
      <g>
        <path
          d="M-458.7,288.4h-12.1h-0.4c-3.2,0-5.8,2.6-5.8,5.8v7.7c0,0.5,0.4,0.9,0.9,0.9h8.5v3.3c0,0.6,0.5,1.1,1.1,1.1h3
	c0.6,0,1-0.5,1-1v-3.3h8.5c0.5,0,0.9-0.4,0.9-0.9v-7.7C-453,291-455.5,288.4-458.7,288.4z M-476,294.2c0-2.6,2.1-4.7,4.7-4.7h0.4
	c2.6,0,4.7,2.1,4.7,4.7v7.5h-9.8L-476,294.2L-476,294.2z M-463.5,306.1h-3v-3.3h0.5h2.5V306.1z M-454,301.7h-11v-7.5
	c0-1.9-1-3.6-2.4-4.7h8.7c2.6,0,4.7,2.1,4.7,4.7L-454,301.7L-454,301.7z"
        />
        <path
          className={classes.secondColor}
          d="M-454.3,282.8h-5.4c-0.3,0-0.5,0.2-0.5,0.5v10.3c-1,0.2-1.8,1.2-1.8,2.3c0,1.3,1,2.3,2.3,2.3s2.3-1,2.3-2.3
	c0-1.1-0.8-2-1.8-2.3v-6.4h4.9c0.5,0,1-0.4,1-1v-2.4C-453.3,283.2-453.8,282.8-454.3,282.8z M-458.5,295.9c0,0.7-0.6,1.2-1.2,1.2
	c-0.7,0-1.2-0.6-1.2-1.2c0-0.7,0.6-1.2,1.2-1.2C-459.1,294.6-458.5,295.2-458.5,295.9z M-454.4,286.1h-4.8v-2.2h4.8V286.1z"
        />
        <path
          className={classes.secondColor}
          d="M-469.3,295.3h-4.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h4.5c0.3,0,0.5,0.2,0.5,0.5S-469,295.3-469.3,295.3
		z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(MailBoxIcon);
