import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import RangeItem from "./rangeItem/rangeItem";
import clsx from "clsx";
import useDevice from "../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    paddingTop: 18,
  },
  rootDesktop: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: "5px",
    justifyContent: "space-around",
    height: "100%",
    padding: `${theme.spacing(3)}px`,
  },
  rootWidget: {
    height: "100%",
    flexWrap: "nowrap",
    paddingTop: 10,
    justifyContent: "space-around",
  },
}));

const Range = (props) => {
  const classes = useStyles();
  const device = useDevice();

  return (
    <Grid
      container
      className={clsx(
        classes.root,
        device.isNotMobile && !props.widget && classes.rootDesktop,
        props.widget && classes.rootWidget
      )}
    >
      <RangeItem period="day" title="بازه مجاز روزانه"></RangeItem>
      <RangeItem period="year" title="بازه سالانه (52هفته)"></RangeItem>
    </Grid>
  );
};

export default Range;
