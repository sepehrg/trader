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

const ChartIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M13.1,4.8h-0.5C6.8,4.8,2,9.5,2,15.4S6.8,26,12.6,26c5.8,0,10.6-4.8,10.6-10.6v-0.5H13.1V4.8z M22.2,15.9
		C22,21,17.8,25,12.6,25C7.3,25,3,20.7,3,15.4c0-5.1,4-9.3,9.1-9.6v10.1H22.2z"
        />
        <path
          className={classes.secondColor}
          d="M15.4,2h-0.5v11.1H26v-0.5C26,6.8,21.2,2,15.4,2z M15.9,12.1V3c4.9,0.3,8.8,4.2,9.1,9.1H15.9z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(ChartIcon);
