import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    padding: theme.spacing(4),
    justifyContent: "center",
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.primary}`,
    borderRadius: "5px",
  },
  walletItem: {
    justifyContent: "space-between",
    padding: `${theme.spacing(2)}px 0px`,
  },
  currency: {
    cursor: "default",
    transition: "0.3s",
    "&:after": {
      content: '"ریال"',
      fontSize: "10px",
      color: theme.palette.text.secondary,
      paddingRight: theme.spacing(2),
    },
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  firstItem: {
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    marginBottom: theme.spacing(2),
  },
  firstCurrency: {
    fontSize: "14px",
  },
  title: {
    color: theme.palette.text.secondary,
  },
}));

const UserInfo = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Grid
          container
          className={`${classes.walletItem} ${classes.firstItem}`}
        >
          <Grid item className={classes.title}>
            قدرت خرید
          </Grid>
          <Grid item className={`${classes.currency} ${classes.firstCurrency}`}>
            831،029،254
          </Grid>
        </Grid>
        <Grid container className={classes.walletItem}>
          <Grid item className={classes.title}>
            مانده مشتری
          </Grid>
          <Grid item className={classes.currency}>
            450،620،000
          </Grid>
        </Grid>
        <Grid container className={classes.walletItem}>
          <Grid item className={classes.title}>
            خالص دارائی
          </Grid>
          <Grid item className={classes.currency}>
            831،029،254
          </Grid>
        </Grid>
        <Grid container className={classes.walletItem}>
          <Grid item className={classes.title}>
            بلوکه شده
          </Grid>
          <Grid item className={classes.currency}>
            0
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
