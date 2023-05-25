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

const PersonalizeIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-497 499 28 28">
      <g>
        <path
          d="M-472.9,500.9h-20.2c-1.1,0-2,0.9-2,2v20.2c0,1.1,0.9,2,2,2h20.2c1.1,0,2-0.9,2-2v-20.2
		C-470.9,501.8-471.8,500.9-472.9,500.9z M-493.1,502.1h20.2c0.4,0,0.8,0.3,0.8,0.8v4h-21.8v-4
		C-493.9,502.4-493.6,502.1-493.1,502.1z M-472.9,523.9h-20.2c-0.4,0-0.8-0.4-0.8-0.8v-15h21.8v15
		C-472.1,523.5-472.5,523.9-472.9,523.9z"
        />
        <circle cx="-490.5" cy="504.6" r="1.1" />
        <circle cx="-487.2" cy="504.6" r="1.1" />
        <circle cx="-475.6" cy="504.6" r="1.1" />
        <path
          className={classes.secondColor}
          d="M-485.2,509.2h-5.4c-0.7,0-1.3,0.6-1.3,1.3v4.3c0,0.7,0.6,1.3,1.3,1.3h5.4c0.7,0,1.3-0.6,1.3-1.3v-4.3
		C-483.9,509.8-484.5,509.2-485.2,509.2z M-485.1,514.8c0,0.1-0.1,0.1-0.1,0.1h-5.4c-0.1,0-0.1-0.1-0.1-0.1v-4.3
		c0-0.1,0.1-0.1,0.1-0.1h5.4c0.1,0,0.1,0.1,0.1,0.1V514.8z"
        />
        <path
          d="M-485,517.3h-5.8c-0.6,0-1.1,0.5-1.1,1.1v3c0,0.6,0.5,1.1,1.1,1.1h5.8c0.6,0,1.1-0.5,1.1-1.1v-3
		C-483.9,517.8-484.4,517.3-485,517.3z M-485.1,521.4h-5.7v-2.9h5.7V521.4z"
        />
        <path
          className={classes.secondColor}
          d="M-475.4,515.6h-5.4c-0.7,0-1.3,0.6-1.3,1.3v4.3c0,0.7,0.6,1.3,1.3,1.3h5.4c0.7,0,1.3-0.6,1.3-1.3v-4.3
		C-474.1,516.2-474.7,515.6-475.4,515.6z M-475.3,521.2c0,0.1-0.1,0.1-0.1,0.1h-5.4c-0.1,0-0.1-0.1-0.1-0.1v-4.3
		c0-0.1,0.1-0.1,0.1-0.1h5.4c0.1,0,0.1,0.1,0.1,0.1V521.2z"
        />
        <path
          d="M-475.2,509.2h-5.8c-0.6,0-1.1,0.5-1.1,1.1v3c0,0.6,0.5,1.1,1.1,1.1h5.8c0.6,0,1.1-0.5,1.1-1.1v-3
		C-474.1,509.7-474.6,509.2-475.2,509.2z M-475.3,513.2h-5.7v-2.9h5.7V513.2z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(PersonalizeIcon);
