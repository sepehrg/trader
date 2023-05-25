import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { toJalaliDate, comma } from "../../../shared/utility";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    paddingBottom: 10,
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
    flexWrap: "nowrap",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    minHeight: 42,
    alignItems: "center",
    padding: "0 6px",
  },
  info: {
    padding: "10px 0",
  },
  infoItem: {
    justifyContent: "space-between",
    backgroundColor: `${theme.palette.border.secondary}99`,
    borderRadius: 20,
    padding: "1px 10px",
    minHeight: 24,
    alignItems: "center",
    fontSize: 12,
  },
  infoItemTitle: {
    color: theme.palette.text.secondary,
  },
  amountContainer: {
    alignItems: "baseline",
    flexWrap: "nowrap",
  },
  amount: {
    fontSize: 18,
  },
  currency: {
    fontSize: 11,
    color: theme.palette.text.secondary,
    marginRight: 5,
  },
  headerRight: {
    // alignItems: "center",
    flexWrap: "nowrap",
  },
}));

const DepositMoneyItem = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item>
        <Grid container className={classes.boxMobile}>
          <Grid item>
            <Grid container className={classes.header}>
              <Grid item>
                <Grid container className={classes.headerRight} spacing={4}>
                  <Grid item>{props.isVerify}</Grid>
                  <Grid item>
                    <Grid container className={classes.amountContainer}>
                      <Grid item className={classes.amount}>
                        {comma(props.data.Amount)}
                      </Grid>
                      <Grid item className={classes.currency}>
                        ریال
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>{props.requestStatus}</Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2} className={classes.info}>
              <Grid item xs={12}>
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.infoItemTitle}>
                    کد رهگیری
                  </Grid>
                  <Grid item>{props.data.RefId}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.infoItemTitle}>
                    درگاه
                  </Grid>
                  <Grid item>{props.data.BankTitle}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.infoItemTitle}>
                    تاریخ
                  </Grid>
                  <Grid item>{toJalaliDate(props.data.DateOfEvent)}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DepositMoneyItem;
