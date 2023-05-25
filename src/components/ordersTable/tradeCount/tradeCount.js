import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {},
  trade: {
    justifyContent: "space-between",
    width: "100%",
  },
  bar: {
    height: 3,
    width: "100%",
    backgroundColor: theme.palette.border.bar,
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  barProgress: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    width: (percent) => `${percent}%`,
  },
  barParent: {
    width: "100%",
  },

  tradeMobile: {
    order: 2,
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  barParentMobile: {
    order: 1,
  },
  barMobile: {
    height: 5,
    borderRadius: 50,
  },
  numberMobile: {
    fontSize: 13,
    color: theme.palette.text.primary,
  },
  tradeTitleMobile: {
    fontSize: 11,
    marginRight: 3,
  },
}));

const TradeCount = (props) => {
  const traded = props.quantity - props.remainingQuantity;
  const percent = (traded / props.quantity) * 100;
  const classes = useStyles(percent);
  const device = useDevice();

  return (
    <Grid container className={classes.root} spacing={device.isMobile && 2}>
      <Grid
        item
        className={clsx(classes.trade, device.isMobile && classes.tradeMobile)}
      >
        <Grid container className={classes.trade}>
          <Grid item>{parseInt(percent)}%</Grid>
          <Grid item>
            <span className={clsx(device.isMobile && classes.numberMobile)}>
              {traded}
            </span>
            /{props.quantity}
            {device.isMobile && (
              <span className={classes.tradeTitleMobile}>تعداد</span>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        className={clsx(
          classes.barParent,
          device.isMobile && classes.barParentMobile
        )}
      >
        <Grid
          container
          item
          className={clsx(classes.bar, device.isMobile && classes.barMobile)}
        >
          <Grid container item className={classes.barProgress}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TradeCount;
