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

const IndexIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          className={classes.secondColor}
          d="M4.8,16c-1.7,0-3.1,1.4-3.1,3.1v3.9c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1v-3.9C7.9,17.4,6.5,16,4.8,16z
		 M6.9,22.9C6.9,24.1,6,25,4.8,25s-2.1-0.9-2.1-2.1v-3.9c0-1.2,0.9-2.1,2.1-2.1s2.1,0.9,2.1,2.1V22.9z"
        />
        <path
          d="M14,2c-1.7,0-3.1,1.4-3.1,3.1v17.8c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1V5.1C17.1,3.4,15.7,2,14,2z
		 M16.1,22.9c0,1.2-0.9,2.1-2.1,2.1s-2.1-0.9-2.1-2.1V5.1C11.9,3.9,12.8,3,14,3s2.1,0.9,2.1,2.1V22.9z"
        />
        <path
          className={classes.secondColor}
          d="M23.2,8.7c-1.7,0-3.1,1.4-3.1,3.1v11.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1V11.8
		C26.3,10.1,24.9,8.7,23.2,8.7z M25.3,22.9c0,1.2-0.9,2.1-2.1,2.1s-2.1-0.9-2.1-2.1V11.8c0-1.2,0.9-2.1,2.1-2.1s2.1,0.9,2.1,2.1
		V22.9z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(IndexIcon);
