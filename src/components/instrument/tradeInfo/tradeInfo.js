import React, { useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "../../UI/Tooltip/Tooltip";
import {
  ltr,
  comma,
  shortenNumber,
  toJalaliDateTime,
} from "../../../shared/utility";
import clsx from "clsx";
import Skeleton from "@material-ui/lab/Skeleton";
import MessageTypes from "../../../enums/messageTypes";
import { connect } from "react-redux";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  tableItem: {
    margin: "2px 0px",
    flexWrap: "nowrap",
  },
  tableTitle: {
    minWidth: "40%",
    color: theme.palette.text.secondary,
    textAlign: "left",
    margin: "auto 0",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  tableDigit: {
    color: theme.palette.text.primary,
    fontSize: "12px",
    margin: "auto 0",
    marginRight: "5px",
    textAlign: "right",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  direction: {
    direction: "ltr",
  },
  highlight: {
    textShadow:
      theme.palette.type === "dark"
        ? "1px 1px 1px #000, 0 0 1px #000, 0 0 3px #fff, 0 0 2px #fff, 0 0 4px #fff"
        : "-1px -1px 1px #ffd50033, 1px -1px 1px #ffd50033, -1px 1px 1px #ffd50033, 1px 1px 1px #ffd50033",
  },
  tradeInfo: {
    flexDirection: "column",
  },
  tableTitleMobile: {
    textAlign: "right",
    color: theme.palette.text.secondary,
    fontSize: 12,
    minWidth: "auto",
  },
  tableDigitMobile: {
    textAlign: "left",
    color: theme.palette.text.primary,
    fontSize: 12,
    // flexGrow: 1,
  },
  tableInnerItemMobile: {
    justifyContent: "space-between",
    height: 30,
    alignItems: "center",
  },
  tableItemMobile: {
    maxWidth: "none",
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.border.bar}`,
    },
    padding: "0px 5px",
  },
}));

const TradeInfo = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const totalNumberOfShares = useRef();
  const totalTradeValue = useRef();
  const lastTradeDate = useRef();
  const staticThreshold = useRef();
  const orderQuantity = useRef();
  const [totalNumberOfSharesTooltip, setTotalNumberOfSharesTooltip] = useState(
    ""
  );
  const [totalTradeValueTooltip, setTotalTradeValueTooltip] = useState("");
  const [lastTradeDateTooltip, setLastTradeDateTooltip] = useState("");

  useEffect(() => {
    if (props.instrument) {
      props.socket.on(MessageTypes.Trade, listenTrade);
      props.socket.on(MessageTypes.StaticThreshold, listenStaticThreshold);

      totalNumberOfShares.current.innerHTML = shortenNumber(
        props.instrument.TotalNumberOfSharesTraded
      );
      totalTradeValue.current.innerHTML = shortenNumber(
        props.instrument.TotalTradeValue
      );
      lastTradeDate.current.innerHTML = toJalaliDateTime(
        props.instrument.LastTradeDate
      );
      staticThreshold.current.innerHTML = `${comma(
        props.instrument.UpperStaticThreshold
      )} - ${comma(props.instrument.LowerStaticThreshold)}`;
      orderQuantity.current.innerHTML = `${comma(
        props.instrument.MaximumOrderQuantity
      )} - ${comma(props.instrument.MinimumOrderQuantity)}`;

      setTotalNumberOfSharesTooltip(
        comma(props.instrument.TotalNumberOfSharesTraded)
      );
      setTotalTradeValueTooltip(comma(props.instrument.TotalTradeValue));
      setLastTradeDateTooltip(
        ltr(toJalaliDateTime(props.instrument.LastTradeDate))
      );
    }
    return () => {
      if (props.instrument) {
        props.socket.off(MessageTypes.Trade, listenTrade);
        props.socket.off(MessageTypes.StaticThreshold, listenStaticThreshold);
      }
    };
  }, [props.instrument]);

  const listenTrade = (trade) => {
    if (trade.InstrumentId === props.instrument?.InstrumentId) {
      const newTotalShare = shortenNumber(trade.TotalNumberOfSharesTraded);
      const newTotalTrade = shortenNumber(trade.TotalTradeValue);
      const newLastTrade = toJalaliDateTime(trade.LastTradeDate);
      if (totalNumberOfShares.current.innerHTML !== newTotalShare) {
        highlight(totalNumberOfShares.current);
        totalNumberOfShares.current.innerHTML = newTotalShare;
      }
      if (totalTradeValue.current.innerHTML !== newTotalTrade) {
        highlight(totalTradeValue.current);
        totalTradeValue.current.innerHTML = newTotalTrade;
      }
      if (lastTradeDate.current.innerHTML !== newLastTrade) {
        highlight(lastTradeDate.current);
        lastTradeDate.current.innerHTML = newLastTrade;
      }
      setTotalNumberOfSharesTooltip(comma(trade.TotalNumberOfSharesTraded));
      setTotalTradeValueTooltip(comma(trade.TotalTradeValue));
      setLastTradeDateTooltip(ltr(toJalaliDateTime(trade.LastTradeDate)));
    }
  };

  const listenStaticThreshold = (threshold) => {
    if (threshold.InstrumentId === props.instrument.InstrumentId) {
      const newThreshold = `${comma(threshold.UpperStaticThreshold)} - ${comma(
        threshold.LowerStaticThreshold
      )}`;
      if (staticThreshold.current.innerHTML !== newThreshold) {
        highlight(staticThreshold.current);
        staticThreshold.current.innerHTML = newThreshold;
      }
    }
  };

  const highlight = (element) => {
    element.classList.add(classes.highlight);
    setTimeout(function () {
      element.classList.remove(classes.highlight);
    }, 500);
  };

  const loading = (
    <Skeleton animation="wave" variant="text" height={20} width={50} />
  );

  const compact = device.isMobile || props.widget;

  return (
    <Grid container className={clsx(compact && classes.tradeInfo)}>
      <Grid
        item
        md={4}
        className={clsx(classes.tableItem, compact && classes.tableItemMobile)}
      >
        <Grid
          container
          className={clsx(compact && classes.tableInnerItemMobile)}
        >
          <Grid
            item
            className={compact ? classes.tableTitleMobile : classes.tableTitle}
          >
            حجم معاملات
          </Grid>
          <Tooltip arrow placement="top" title={totalNumberOfSharesTooltip}>
            <Grid
              item
              className={clsx(
                classes.direction,
                compact ? classes.tableDigitMobile : classes.tableDigit
              )}
              ref={React.createRef()}
            >
              {props.instrument ? (
                <div ref={totalNumberOfShares}></div>
              ) : (
                loading
              )}
            </Grid>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        item
        md={4}
        className={clsx(classes.tableItem, compact && classes.tableItemMobile)}
      >
        <Grid
          container
          className={clsx(compact && classes.tableInnerItemMobile)}
        >
          <Grid
            item
            className={clsx(
              classes.tableTitle,
              compact && classes.tableTitleMobile
            )}
          >
            ارزش معاملات
          </Grid>
          <Grid
            item
            className={clsx(
              classes.direction,
              compact ? classes.tableDigitMobile : classes.tableDigit
            )}
            ref={React.createRef()}
          >
            <Tooltip arrow placement="top" title={totalTradeValueTooltip}>
              {props.instrument ? <div ref={totalTradeValue}></div> : loading}
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={4}
        className={clsx(classes.tableItem, compact && classes.tableItemMobile)}
      >
        <Grid
          container
          className={clsx(compact && classes.tableInnerItemMobile)}
        >
          <Grid
            item
            className={clsx(
              classes.tableTitle,
              compact && classes.tableTitleMobile
            )}
          >
            حجم مبنا
          </Grid>
          <Tooltip
            arrow
            placement="top"
            title={comma(props.instrument?.BaseVolume)}
          >
            <Grid
              item
              className={clsx(
                classes.direction,
                compact ? classes.tableDigitMobile : classes.tableDigit
              )}
              ref={React.createRef()}
            >
              {props.instrument
                ? shortenNumber(props.instrument.BaseVolume)
                : loading}
            </Grid>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        item
        md={4}
        className={clsx(classes.tableItem, compact && classes.tableItemMobile)}
      >
        <Grid
          container
          className={clsx(compact && classes.tableInnerItemMobile)}
        >
          <Grid
            item
            className={clsx(
              classes.tableTitle,
              compact && classes.tableTitleMobile
            )}
          >
            آستانه تعداد
          </Grid>
          <Tooltip
            arrow
            placement="bottom"
            title={`${orderQuantity.current?.innerHTML}`}
          >
            <Grid
              item
              className={clsx(
                compact ? classes.tableDigitMobile : classes.tableDigit
              )}
              ref={React.createRef()}
            >
              {props.instrument ? <div ref={orderQuantity}></div> : loading}
            </Grid>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        item
        md={4}
        className={clsx(classes.tableItem, compact && classes.tableItemMobile)}
      >
        <Grid
          container
          className={clsx(compact && classes.tableInnerItemMobile)}
        >
          <Grid
            item
            className={clsx(
              classes.tableTitle,
              compact && classes.tableTitleMobile
            )}
          >
            قیمت مجاز
          </Grid>
          {props.instrument ? (
            <Tooltip
              arrow
              placement="bottom"
              title={`${staticThreshold.current?.innerHTML}`}
            >
              <Grid
                item
                className={clsx(
                  compact ? classes.tableDigitMobile : classes.tableDigit
                )}
                ref={React.createRef()}
              >
                <div ref={staticThreshold}></div>
              </Grid>
            </Tooltip>
          ) : (
            loading
          )}
        </Grid>
      </Grid>
      <Grid
        item
        md={4}
        className={clsx(classes.tableItem, compact && classes.tableItemMobile)}
      >
        <Grid
          container
          className={clsx(compact && classes.tableInnerItemMobile)}
        >
          <Grid
            item
            className={clsx(
              classes.tableTitle,
              compact && classes.tableTitleMobile
            )}
          >
            آخرین معامله
          </Grid>
          {props.instrument ? (
            <Tooltip arrow placement="bottom" title={lastTradeDateTooltip}>
              <Grid
                item
                className={clsx(
                  classes.direction,
                  compact ? classes.tableDigitMobile : classes.tableDigit
                )}
                ref={React.createRef()}
              >
                <div ref={lastTradeDate}></div>
              </Grid>
            </Tooltip>
          ) : (
            loading
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
    staticThreshold: state.app.staticThreshold,
  };
};

export default connect(mapStateToProps)(TradeInfo);
