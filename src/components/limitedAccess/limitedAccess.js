import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import WarningIcon from "../UI/icons/warning";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    alignItems: "center",
    padding: 100,
  },
  title: {
    fontSize: 14,
    color: theme.palette.text.primary,
  },
  subtitle: {
    fontSize: 11,
    color: theme.palette.text.secondary,
  },
  warningIcon: {
    width: 32,
    height: 32,
  },
}));

const LimitedAccess = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={6}>
      <Grid item>
        <WarningIcon className={classes.warningIcon} />
      </Grid>
      <Grid item className={classes.title}>
        امکان دسترسی برای شما به این بخش امکانپذیر نمی‌باشد.
      </Grid>
      <Grid item className={classes.subtitle}>
        برای رفع مشکل با پشتیبانی در تماس باشید.
      </Grid>
    </Grid>
  );
};

export default LimitedAccess;
