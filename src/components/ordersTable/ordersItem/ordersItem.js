import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { comma, toJalaliDateTime } from "../../../shared/utility";
import TradeStatus from "../tradeStatus/tradeStatus";
import TradeCount from "../tradeCount/tradeCount";
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
    padding: "7px 12px 3px 12px",
    // width: "100%",
    flexDirection: "column",
  },
  header: {
    justifyContent: "space-between",
    minHeight: 42,
    alignItems: "center",
  },
  headerItem: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  chart: {
    flexDirection: "column",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    paddingBottom: 6,
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
  orderStatus: {
    fontSize: 11,
    padding: "1px 7px",
    borderRadius: 15,
    marginRight: 6,
    display: "flex",
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

const OrdersItem = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item>
        <Grid container className={classes.boxMobile}>
          <Grid item>
            <Link onClick={props.orderInfoModalToggle}>
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
                  <Grid container className={classes.headerItem}>
                    <Grid item>
                      <Grid
                        container
                        className={classes.priceContainer}
                        spacing={2}
                      >
                        <Grid item className={classes.price}>
                          {comma(props.data.Price)}
                        </Grid>
                        <Grid item className={classes.priceCurrency}>
                          ریال
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <TradeStatus
                        className={classes.orderStatus}
                        status={props.data.OrderStatusId}
                        icon={true}
                      >
                        {props.data.OrderStatusTitle}
                      </TradeStatus>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item>
            <Grid container className={classes.chart}>
              <Grid item>
                <TradeCount
                  quantity={props.data.Quantity}
                  remainingQuantity={props.data.RemainingQuantity}
                ></TradeCount>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container className={classes.info}>
              <Grid item>
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.infoItemTitle}>
                    ردیف
                  </Grid>
                  <Grid item>{props.data.Id}</Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.infoItemTitle}>
                    اعتبار
                  </Grid>
                  <Grid item>
                    {props.formatValidityType(
                      props.data.OrderValidityTypeId,
                      props.data.OrderValidityDate
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.infoItemTitle}>
                    محل اعتبار
                  </Grid>
                  <Grid item>{props.data.OrderPaymentGatewayTitle}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container className={classes.footer}>
              <Grid item>
                <TimeIcon className={classes.clockIcon} />
                {toJalaliDateTime(props.data.EntryDate)}
              </Grid>
              <Grid item className={classes.actions}>
                {props.operations.slice(1, 3).map((o) => (
                  <Link component={o.icon} onClick={o.action} key={o.title} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrdersItem;
