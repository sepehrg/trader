import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { comma, toJalaliDateTime } from "../../../shared/utility";
import TimeIcon from "../../UI/icons/time";
import Link from "../../UI/Link/Link";

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
  footer: {
    justifyContent: "space-between",
    borderTop: `1px solid ${theme.palette.border.primary}`,
    color: theme.palette.text.secondary,
    fontSize: 11,
    minHeight: 30,
    alignItems: "center",
  },

  side: {
    backgroundColor: theme.palette.text.secondary,
    color: "#FFF",
    fontSize: 11,
    borderRadius: "10px 0 0 10px",
    padding: "1px 4px",
    marginRight: -12,
    display: "flex",
    alignItems: "center",
  },
  persianCode: {
    fontSize: 14,
    marginRight: 6,
  },
  priceContainer: {
    alignItems: "baseline",
    flexWrap: "nowrap",
  },
  price: {
    fontSize: 14,
  },
  priceCurrency: {
    fontSize: 11,
    color: theme.palette.text.secondary,
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
  clockIcon: {
    width: 16,
    height: 16,
    marginLeft: 3,
  },
  actions: {
    display: "flex",
    flexWrap: "nowrap",
  },
}));

const TradesItem = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={6}>
      <Grid item>
        <Grid container className={classes.boxMobile}>
          <Grid item>
            <Grid container className={classes.header}>
              <Grid item>
                <Grid container>
                  <Grid
                    item
                    className={classes.side}
                    style={{
                      backgroundColor:
                        props.data.OrderSideId === 1
                          ? theme.palette.color.green
                          : theme.palette.color.red,
                    }}
                  >
                    {props.data.OrderSideId === 1 ? "خرید" : "فروش"}
                  </Grid>
                  <Grid item className={classes.persianCode}>
                    {props.data.InstrumentPersianCode}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container className={classes.priceContainer} spacing={2}>
                  <Grid item className={classes.price}>
                    {comma(props.data.Price)}
                  </Grid>
                  <Grid item className={classes.priceCurrency}>
                    ریال
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
                    تعداد
                  </Grid>
                  <Grid item>{comma(props.data.Quantity)}</Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.infoItemTitle}>
                    ارزش معامله
                  </Grid>
                  <Grid item>
                    <Grid container>
                      {props.data.Amount ? (
                        <>
                          <Grid item>{props.data.Amount}</Grid>
                          <Grid item className={classes.priceCurrency}>
                            ریال
                          </Grid>
                        </>
                      ) : (
                        <Grid item>بدون اطلاعات</Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container className={classes.footer}>
              <Grid item>
                <TimeIcon className={classes.clockIcon} />
                {toJalaliDateTime(props.data.TradeDateTime).split(" ")[1]}
              </Grid>
              {/* <Grid item className={classes.actions}>
                {props.operations.map((o) => (
                  <Link component={o.icon} onClick={o.action} key={o.title} />
                ))}
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TradesItem;
