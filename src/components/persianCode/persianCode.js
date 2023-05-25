import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { coloredPercent, comma } from "../../shared/utility";
import InstrumentStateIcon from "../instrumentStateIcon/instrumentStateIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
}));

const PersianCode = ({ instrument }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item className={classes.title}>
        {instrument.PersianCode}
      </Grid>
      <Grid item>
        <InstrumentStateIcon
          instrument={instrument}
        ></InstrumentStateIcon>
      </Grid>
    </Grid>
  );
};

export default PersianCode;
