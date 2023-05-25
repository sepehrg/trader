import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { comma } from "../../../shared/utility";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    paddingBottom: 6,
  },
  boxMobile: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.box,
    borderRadius: 8,
    padding: "3px 9px",
    width: "100%",
    flexDirection: "column",
  },
  header: {
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    minHeight: 32,
    alignItems: "center",
  },
  headerRight: {
    alignItems: "baseline",
    flexWrap: "nowrap",
  },
  headerLeft: {
    alignItems: "baseline",
    flexWrap: "nowrap",
  },
  info: {
    justifyContent: "space-around",
    minHeight: 42,
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "column",
    fontSize: 12,
    alignItems: "center",
  },
  infoItemTitle: {
    fontSize: 11,
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
  },
  companyName: {
    fontSize: 11,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
  },
  quantity: {
    fontSize: 14,
  },
  quantityTitle: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
}));

const PortfolioItem = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={6}>
      <Grid item>
        <Grid container className={classes.boxMobile}>
          <Grid item>
            <Grid container className={classes.header}>
              <Grid item>
                <Grid container className={classes.headerRight} spacing={2}>
                  <Grid item className={classes.title}>
                    {props.data.InstrumentPersianCode}
                  </Grid>
                  <Grid item className={classes.companyName}>
                    {props.data.InstrumentTitle}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container className={classes.headerLeft} spacing={2}>
                  <Grid item className={classes.quantity}>
                    {comma(props.data.Quantity)}
                  </Grid>
                  <Grid item className={classes.quantityTitle}>
                    تعداد
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container className={classes.info}>
              <Grid item>
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.infoItemTitle}>
                    قیمت پایانی
                  </Grid>
                  <Grid item>{comma(props.data.ClosingPrice)}</Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.infoItemTitle}>
                    قیمت لحطه‌ای
                  </Grid>
                  <Grid item>{comma(props.data.LastTradePrice)}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PortfolioItem;
