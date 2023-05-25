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

const DenyIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-465 267 28 28">
      <path
        d="M-442.2,272.2c-2.4-2.4-5.5-3.7-8.8-3.7c-3.3,0-6.5,1.3-8.8,3.7c-2.4,2.4-3.7,5.5-3.7,8.8
	c0,3.3,1.3,6.5,3.7,8.8c2.4,2.4,5.6,3.7,8.8,3.7s6.4-1.2,8.8-3.7C-437.3,285-437.3,277-442.2,272.2z M-458.4,273.6
	c2-2,4.6-3.1,7.4-3.1c2.5,0,4.8,0.8,6.7,2.4l-14.8,14.8c-1.6-1.9-2.4-4.2-2.4-6.7C-461.5,278.2-460.4,275.6-458.4,273.6z
	 M-443.6,288.4c-3.9,3.9-10,4.1-14.1,0.7l14.8-14.8C-439.5,278.4-439.7,284.6-443.6,288.4z"
      />
    </SvgIcon>
  );
};

export default React.memo(DenyIcon);
