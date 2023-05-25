import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { toJalaliDateTime, comma } from "../../../../shared/utility";
import TradeStatus from "../../../../components/ordersTable/tradeStatus/tradeStatus";
import Accordion from "../../../../components/UI/accordion/accordion";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    paddingBottom: 10,
  },
  main: {
    flexDirection: "column",
  },
  boxMobile: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.box,
    borderRadius: 8,
    padding: "3px 9px",
    width: "100%",
  },
  states: {
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    minHeight: 38,
    alignItems: "center",
    flexWrap: "nowrap",
  },
  statesRight: {
    alignItems: "center",
    flexWrap: "nowrap",
  },
  statesLeft: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  side: {
    backgroundColor: theme.palette.text.secondary,
    color: "#FFF",
    fontSize: 11,
    borderRadius: "10px 0 0 10px",
    padding: "1px 4px",
    marginRight: -10,
  },
  persianCode: {
    fontSize: 14,
    marginRight: 6,
  },
  orderStatus: {
    fontSize: 11,
    padding: "1px 7px",
    borderRadius: 15,
    marginRight: 6,
  },
  date: {
    color: theme.palette.text.secondary,
    fontSize: 11,
    direction: "ltr",
  },
  prices: {
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 42,
  },
  pricesItem: {
    alignItems: "Center",
    flexWrap: "nowrap",
  },
  digit: {
    fontSize: 16,
    color: theme.palette.text.primary,
  },
  digitTitle: {
    fontSize: 11,
    color: theme.palette.text.secondary,
  },
  moreBtn: {
    display: "flex",
    justifyContent: "Center",
    alignItems: "Center",
    height: 22,
    fontSize: 11,
    color: theme.palette.text.secondary,
  },
  moreIcon: {
    transform: "rotate(-90deg)",
    height: 14,
    width: 14,
    marginRight: 6,
    strokeWidth: 1,
    stroke: theme.palette.icon.primary,
  },
  info: {
    borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  infoInner: {
    padding: "10px 0px",
  },
  infoItem: {
    justifyContent: "space-between",
    backgroundColor: `${theme.palette.border.secondary}99`,
    borderRadius: 20,
    padding: "1px 10px",
    minHeight: 20,
    alignItems: "center",
    fontSize: 11,
  },
  infoItemTitle: {
    color: theme.palette.text.secondary,
  },
  accordionSummary: {
    flexDirection: "column",
  },
}));

const OrderBookItem = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item>
        <Grid container>
          <Grid item className={classes.boxMobile}>
            <Grid container className={classes.main}>
              <Accordion>
                <Grid item xs={12}>
                  <Grid container className={classes.accordionSummary}>
                    <Grid item>
                      <Grid container className={classes.states}>
                        <Grid item>
                          <Grid container className={classes.statesRight}>
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
                              {props.data.OrderSideTitle}
                            </Grid>
                            <Grid item className={classes.persianCode}>
                              {props.data.InstrumentPersianCode}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container className={classes.statesLeft}>
                            <Grid item className={classes.date}>
                              {toJalaliDateTime(props.data.EntryDate)}
                            </Grid>
                            <Grid item>
                              <TradeStatus
                                className={classes.orderStatus}
                                status={props.data.OrderStatusId}
                              >
                                {props.data.OrderStatusTitle}
                              </TradeStatus>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container className={classes.prices}>
                        <Grid item className={classes.infoInner}>
                          <Grid
                            container
                            className={classes.pricesItem}
                            spacing={3}
                          >
                            <Grid item className={classes.digit}>
                              {comma(props.data.Price)}
                            </Grid>
                            <Grid item className={classes.digitTitle}>
                              ریال
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            className={classes.pricesItem}
                            spacing={3}
                          >
                            <Grid item className={classes.digit}>
                              {comma(props.data.Quantity)}
                            </Grid>
                            <Grid item className={classes.digitTitle}>
                              تعداد
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.info}>
                  <Grid container spacing={2} className={classes.infoInner}>
                    <Grid item xs={6}>
                      <Grid container className={classes.infoItem}>
                        <Grid item className={classes.infoItemTitle}>
                          کد پیگیری
                        </Grid>
                        <Grid item>{props.data.TrackingNumber}</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container className={classes.infoItem}>
                        <Grid item className={classes.infoItemTitle}>
                          محل تامین اعتبار
                        </Grid>
                        <Grid item>{props.data.OrderPaymentGatewayTitle}</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container className={classes.infoItem}>
                        <Grid item className={classes.infoItemTitle}>
                          حجم نمایشی
                        </Grid>
                        <Grid item>{comma(props.data.DisclosedQuantity)}</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container className={classes.infoItem}>
                        <Grid item className={classes.infoItemTitle}>
                          حجم باقیمانده
                        </Grid>
                        <Grid item>{comma(props.data.DisclosedQuantity)}</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container className={classes.infoItem}>
                        <Grid item className={classes.infoItemTitle}>
                          اعتبار
                        </Grid>
                        <Grid item>{props.data.OrderValidityType}</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container className={classes.infoItem}>
                        <Grid item className={classes.infoItemTitle}>
                          تعداد معامله شده
                        </Grid>
                        <Grid item>
                          {comma(props.data.Quantity - props.data.Remaining)}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container className={classes.infoItem}>
                        <Grid item className={classes.infoItemTitle}>
                          ارزش خالص
                        </Grid>
                        <Grid item>
                          {comma(props.data.Quantity * props.data.Price)}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container className={classes.infoItem}>
                        <Grid item className={classes.infoItemTitle}>
                          ارزش ناخالص
                        </Grid>
                        <Grid item>
                          {comma(props.data.Quantity * props.data.Price)}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* ))} */}
    </Grid>
  );
};

export default OrderBookItem;
