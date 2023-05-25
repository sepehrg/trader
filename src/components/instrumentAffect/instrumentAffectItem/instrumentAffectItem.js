import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import style from "../../../shared/style";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  grid: {
    width: "100%",
    zIndex: 1,
  },
  row: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "hidden",
    borderRadius: 4,
  },
  gainerPrice: {
    color: theme.palette.color.green,
  },
  loserPrice: {
    color: theme.palette.color.red,
  },
  bar: {
    position: "absolute",
    height: "100%",
  },
  gainerBar: {
    left: 0,
    backgroundImage: `linear-gradient(to left, ${theme.palette.background.paper}22, ${theme.palette.color.green}99)`,
    width: (props) =>
      `${Math.abs(parseInt(props.insAffect) / props.max) * 100}%`,
  },
  loserBar: {
    right: 0,
    backgroundImage: `linear-gradient(to right, ${theme.palette.background.paper}22, ${theme.palette.color.red}99)`,
    width: (props) =>
      `${Math.abs(parseInt(props.insAffect) / props.max) * 100}%`,
  },
  value: {
    padding: "0 10px",
    height: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  loserGrid: {
    direction: "ltr",
  },
  gainerGridMobile: {
    direction: "ltr",
  },
  valueMobile: {
    height: 30,
    fontSize: 13,
  },
  gainerBarMobile: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.background.paper}22, ${theme.palette.color.green}99)`,
    right: 0,
  },
  rowMobile: {
    borderRadius: 8,
  },
}));

const InstrumentAffectItem = (props) => {
  const classes = useStyles(props);
  const device = useDevice();

  return (
    <Grid container className={clsx(classes.row, classes.rowMobile)}>
      <Grid
        item
        className={clsx(
          classes.bar,
          props.gainer && classes.gainerBar,
          props.gainer && device.isMobile && classes.gainerBarMobile,
          props.loser && classes.loserBar
        )}
      ></Grid>
      <Grid
        item
        className={clsx(
          classes.grid,
          props.loser && classes.loserGrid,
          device.isMobile && props.gainer && classes.gainerGridMobile
        )}
      >
        <Grid
          container
          className={clsx(
            classes.value,
            device.isMobile && classes.valueMobile
          )}
        >
          <Grid
            item
            className={clsx(
              props.gainer && classes.gainerPrice,
              props.loser && classes.loserPrice
            )}
          >
            {Math.abs(props.insAffect)}
          </Grid>
          <Grid item>{props.persianCode}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(InstrumentAffectItem);
