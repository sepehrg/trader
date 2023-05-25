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

const TableIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M22.7,2.5H5.3c-1.6,0-2.8,1.3-2.8,2.8v17.4c0,1.6,1.3,2.8,2.8,2.8h17.4c1.6,0,2.8-1.3,2.8-2.8V5.3
		C25.5,3.8,24.2,2.5,22.7,2.5z M24.4,5.3v1.8h-9.8V3.6h8.1C23.6,3.6,24.4,4.4,24.4,5.3z M5.3,3.6h8.1v3.5H3.6V5.3
		C3.6,4.4,4.4,3.6,5.3,3.6z M3.6,22.7V8.3h9.8v16.1H5.3C4.4,24.4,3.6,23.6,3.6,22.7z M22.7,24.4h-8.1V8.3h9.8v14.4
		C24.4,23.6,23.6,24.4,22.7,24.4z"
        />
        <path
          className={classes.secondColor}
          d="M21.2,12.4h-3.4c-0.3,0-0.6,0.3-0.6,0.6s0.3,0.6,0.6,0.6h3.4c0.3,0,0.6-0.3,0.6-0.6S21.5,12.4,21.2,12.4z"
        />
        <path
          className={classes.secondColor}
          d="M21.2,15.8h-3.4c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6h3.4c0.3,0,0.6-0.3,0.6-0.6
		C21.7,16.1,21.5,15.8,21.2,15.8z"
        />
        <path
          className={classes.secondColor}
          d="M21.2,19.2h-3.4c-0.3,0-0.6,0.3-0.6,0.6s0.3,0.6,0.6,0.6h3.4c0.3,0,0.6-0.3,0.6-0.6S21.5,19.2,21.2,19.2z"
        />
        <path
          className={classes.secondColor}
          d="M6.8,13.6h3.4c0.3,0,0.6-0.3,0.6-0.6s-0.3-0.6-0.6-0.6H6.8c-0.3,0-0.6,0.3-0.6,0.6S6.5,13.6,6.8,13.6z"
        />
        <path
          d="M10.2,15.8H6.8c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6h3.4c0.3,0,0.6-0.3,0.6-0.6
		C10.8,16.1,10.6,15.8,10.2,15.8z"
        />
        <path
          className={classes.secondColor}
          d="M10.2,19.2H6.8c-0.3,0-0.6,0.3-0.6,0.6s0.3,0.6,0.6,0.6h3.4c0.3,0,0.6-0.3,0.6-0.6S10.6,19.2,10.2,19.2z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(TableIcon);
