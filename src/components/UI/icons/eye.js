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

const EyeIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M26.1,13.6C26,13.3,21.5,6.2,14,6.2c-7.5,0-12,7.1-12.1,7.4L1.6,14l0.2,0.4C2,14.7,6.5,21.8,14,21.8c7.5,0,12-7.1,12.1-7.4
		l0.2-0.4L26.1,13.6z M14,20.3c-5.7,0-9.6-4.9-10.6-6.3c1-1.4,4.9-6.3,10.6-6.3c5.7,0,9.6,4.9,10.6,6.3C23.6,15.4,19.7,20.3,14,20.3
		z"
        />
        <path
          d="M14,9.8c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2S16.3,9.8,14,9.8z M14,16.7c-1.5,0-2.7-1.2-2.7-2.7
		c0-1.5,1.2-2.7,2.7-2.7c1.5,0,2.7,1.2,2.7,2.7C16.7,15.5,15.5,16.7,14,16.7z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(EyeIcon);
