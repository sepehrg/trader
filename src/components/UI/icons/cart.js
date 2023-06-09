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

const CartIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon {...props} viewBox="-497 499 28 28">
      <g>
        <path
          d="M-473.6,511.2c-0.3,0-0.6,0.3-0.6,0.6v1.8c0,1-0.8,1.8-1.8,1.8h-12.2c-1,0-1.8-0.8-1.8-1.8v-10.7
		c0-0.2-0.1-0.5-0.4-0.6l-2.6-1.1c-0.3-0.1-0.7,0-0.8,0.3s0,0.7,0.3,0.8l2.3,0.9v10.3v4.6c0,1.6,1.3,3,3,3c-0.2,0.4-0.3,0.8-0.3,1.2
		c0,1.3,1.1,2.4,2.4,2.4s2.4-1.1,2.4-2.4c0-0.4-0.1-0.9-0.3-1.2h5.3c-0.2,0.4-0.3,0.8-0.3,1.2c0,1.3,1.1,2.4,2.4,2.4
		c1.3,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4h-11.5c-1,0-1.8-0.8-1.8-1.8V516c0.5,0.4,1.1,0.6,1.8,0.6h12.2c1.7,0,3-1.3,3-3v-1.8
		C-473,511.5-473.2,511.2-473.6,511.2z M-484.9,522.4c0,0.7-0.5,1.2-1.2,1.2s-1.2-0.5-1.2-1.2s0.5-1.2,1.2-1.2
		S-484.9,521.8-484.9,522.4z M-475.5,522.4c0,0.7-0.5,1.2-1.2,1.2s-1.2-0.5-1.2-1.2s0.5-1.2,1.2-1.2S-475.5,521.8-475.5,522.4z"
        />
        <path
          // className={classes.secondColor}
          d="M-484,510.6h0.4c0.3,0,0.6-0.3,0.6-0.6s-0.3-0.6-0.6-0.6h-0.4c-1.3,0-2.4-1.1-2.4-2.4s1.1-2.4,2.4-2.4h1.2
		l-0.8,0.8c-0.2,0.2-0.2,0.6,0,0.8c0.1,0.1,0.3,0.2,0.4,0.2s0.3-0.1,0.4-0.2l1.9-1.9c0.1-0.1,0.1-0.1,0.1-0.2c0.1-0.1,0.1-0.3,0-0.5
		c0-0.1-0.1-0.1-0.1-0.2l-1.9-1.9c-0.2-0.2-0.6-0.2-0.8,0s-0.2,0.6,0,0.8l0.8,0.8h-1.2c-2,0-3.6,1.6-3.6,3.6S-486,510.6-484,510.6z"
        />
        <path
          // className={classes.secondColor}
          d="M-478.7,507.8c-0.2-0.2-0.6-0.2-0.8,0l-1.9,1.9c0,0,0,0,0,0.1c0,0-0.1,0.1-0.1,0.1c-0.1,0.1-0.1,0.3,0,0.5
		c0,0.1,0.1,0.1,0.1,0.2l1.9,1.9c0.1,0.1,0.3,0.2,0.4,0.2s0.3-0.1,0.4-0.2c0.2-0.2,0.2-0.6,0-0.8l-0.8-0.8h1.2c2,0,3.6-1.6,3.6-3.6
		s-1.6-3.6-3.6-3.6h-0.4c-0.3,0-0.6,0.3-0.6,0.6s0.3,0.6,0.6,0.6h0.4c1.3,0,2.4,1.1,2.4,2.4s-1.1,2.4-2.4,2.4h-1.2l0.8-0.8
		C-478.5,508.4-478.5,508-478.7,507.8z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(CartIcon);
