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

const TransactionIcon = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon viewBox="-497 499 28 28" {...props}>
      <g>
        <path
          d="M-487.9,522.1c-0.2,0-0.3-0.1-0.4-0.2l-7.1-6.1c-0.1-0.1-0.2-0.3-0.2-0.5s0.1-0.4,0.2-0.5l7.1-6.1
		c0.2-0.2,0.5-0.2,0.7-0.1c0.2,0.1,0.4,0.3,0.4,0.6v3.7c0,0.4-0.3,0.6-0.6,0.6s-0.6-0.3-0.6-0.6v-2.3l-5.4,4.7l5.4,4.7v-2.3
		c0-0.4,0.3-0.7,0.6-0.7h6.3c0.4,0,0.7,0.3,0.7,0.7s-0.3,0.7-0.7,0.7h-5.6v3.1c0,0.3-0.1,0.5-0.4,0.6
		C-487.7,522.1-487.8,522.1-487.9,522.1z"
        />
        <path
          className={classes.secondColor}
          d="M-478.1,517.4c-0.1,0-0.2,0-0.3-0.1c-0.2-0.1-0.4-0.3-0.4-0.6V513c0-0.4,0.3-0.6,0.7-0.6s0.7,0.3,0.7,0.6v2.3
		l5.4-4.7l-5.4-4.7v2.3c0,0.4-0.3,0.6-0.7,0.6h-6.3c-0.4,0-0.6-0.3-0.6-0.6s0.3-0.6,0.6-0.6h5.6v-3.1c0-0.3,0.1-0.5,0.4-0.6
		c0.2-0.1,0.5-0.1,0.7,0.1l7.1,6.1c0.1,0.1,0.2,0.3,0.2,0.5c0,0.2-0.1,0.4-0.2,0.5l-7.1,6.1C-477.8,517.3-477.9,517.4-478.1,517.4z"
        />
        <path
          className={classes.secondColor}
          d="M-478.1,513.7h-9.8c-0.4,0-0.6-0.3-0.6-0.6s0.3-0.6,0.6-0.6h9.8c0.4,0,0.7,0.3,0.7,0.6
		S-477.7,513.7-478.1,513.7z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(TransactionIcon);
