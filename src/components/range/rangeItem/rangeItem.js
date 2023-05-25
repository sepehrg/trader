import React, { useState, useEffect, useCallback, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tooltip from "../../UI/Tooltip/Tooltip";
import { comma } from "../../../shared/utility";
import LocationIcon from "../../UI/icons/location";
import MessageTypes from "../../../enums/messageTypes";
import { connect } from "react-redux";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    padding: theme.spacing(8),
    justifyContent: "center",
    overflow: "hidden",
  },
  price: {
    justifyContent: "space-between",
    paddingTop: theme.spacing(4),
  },
  bar: {
    height: 5,
    width: "100%",
    backgroundColor: theme.palette.border.bar,
    position: "relative",
  },
  period: {
    height: "100%",
    position: "absolute",
    borderRadius: 4,
  },
  name: {
    color: theme.palette.text.secondary,
    marginTop: -15,
    textAlign: "center",
  },
  periodAvg: {
    height: 5,
    width: 3,
    backgroundColor: theme.palette.text.secondary,
    position: "absolute",
    transform: "translate(-50%,-100%)",
  },
  currentPrice: {
    height: 0,
    width: 0,
    position: "absolute",
    transform: "translate(-50%,-100%)",
    transition: "1s",
  },
  currentPriceIcon: {
    stroke: "none",
    width: 10,
    transform: "translate(50%, -70%)",
  },
  barMobile: {
    height: 10,
    borderRadius: 4,
  },
  nameMobile: {
    fontSize: 12,
    marginTop: -18,
  },
  priceMobile: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  currentPriceIconMobile: {
    width: 14,
  },
}));

const RangeItem = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();
  const range = useRef();
  const currentPrice = useRef();
  const periodAvg = useRef();

  const [data, setData] = useState({});
  const [currentPriceTooltip, setCurrentPriceTooltip] = useState(0);

  const getValues = useCallback(
    (source) => {
      if (props.instrument)
        return {
          LowerStaticThreshold:
            props.period === "day"
              ? props.instrument.LowerStaticThreshold
              : props.instrument.YearLowestTradePrice,
          UpperStaticThreshold:
            props.period === "day"
              ? props.instrument.UpperStaticThreshold
              : props.instrument.YearHighestTradePrice,
          LowestTradePrice: source["LowestTradePrice"],
          HighestTradePrice: source["HighestTradePrice"],
          LastTradePrice: source["LastTradePrice"],
          PreviousDayPrice: props.instrument.PreviousDayPrice,
        };
    },
    [props.instrument, props.trade, props.period]
  );

  useEffect(() => {
    if (props.instrument) {
      setRange(props.instrument);
      props.socket.on(MessageTypes.Trade, listenTrade);

      setData(getValues(props.instrument));
    }
    return () => {
      if (props.instrument) props.socket.off(MessageTypes.Trade, listenTrade);
    };
  }, [props.instrument, getValues]);

  const listenTrade = (trade) => {
    if (trade.InstrumentId === props.instrument?.InstrumentId) setRange(trade);
  };

  const setRange = (instrument) => {
    const rangeInfo = getValues(instrument);
    const barLeft =
      rangeInfo.HighestTradePrice > rangeInfo.UpperStaticThreshold
        ? ((rangeInfo.LowestTradePrice - rangeInfo.LowerStaticThreshold) /
            (rangeInfo.HighestTradePrice - rangeInfo.LowerStaticThreshold)) *
          100
        : ((rangeInfo.LowestTradePrice - rangeInfo.LowerStaticThreshold) /
            (rangeInfo.UpperStaticThreshold - rangeInfo.LowerStaticThreshold)) *
          100;

    const barWidth =
      rangeInfo.HighestTradePrice > rangeInfo.UpperStaticThreshold
        ? ((rangeInfo.HighestTradePrice - rangeInfo.LowerStaticThreshold) /
            (rangeInfo.HighestTradePrice - rangeInfo.LowerStaticThreshold)) *
            100 -
          ((rangeInfo.LowestTradePrice - rangeInfo.LowerStaticThreshold) /
            (rangeInfo.HighestTradePrice - rangeInfo.LowerStaticThreshold)) *
            100
        : ((rangeInfo.HighestTradePrice - rangeInfo.LowerStaticThreshold) /
            (rangeInfo.UpperStaticThreshold - rangeInfo.LowerStaticThreshold)) *
            100 -
          ((rangeInfo.LowestTradePrice - rangeInfo.LowerStaticThreshold) /
            (rangeInfo.UpperStaticThreshold - rangeInfo.LowerStaticThreshold)) *
            100;

    range.current.style.left = `${barLeft}%`;
    range.current.style.width = `${barWidth}%`;

    const currentPricePosition =
      rangeInfo.HighestTradePrice > rangeInfo.UpperStaticThreshold
        ? ((rangeInfo.LastTradePrice - rangeInfo.LowerStaticThreshold) /
            (rangeInfo.HighestTradePrice - rangeInfo.LowerStaticThreshold)) *
          100
        : ((rangeInfo.LastTradePrice - rangeInfo.LowerStaticThreshold) /
            (rangeInfo.UpperStaticThreshold - rangeInfo.LowerStaticThreshold)) *
          100;

    currentPrice.current.style.left = `${currentPricePosition}%`;
    setCurrentPriceTooltip(comma(rangeInfo.LastTradePrice));

    currentPrice.current.children[0].style.fill =
      rangeInfo.LastTradePrice > rangeInfo.PreviousDayPrice
        ? `${theme.palette.color.green}`
        : `${theme.palette.color.red}`;

    const originMiddlePoint =
      ((rangeInfo.PreviousDayPrice - rangeInfo.LowestTradePrice) /
        (rangeInfo.HighestTradePrice - rangeInfo.LowestTradePrice)) *
      100;
    range.current.style.backgroundImage = `linear-gradient(to right, ${theme.palette.color.red}, rgba(256,256,256,0.1) ${originMiddlePoint}%, ${theme.palette.color.green})`;

    const originLeftPercent =
      ((rangeInfo.PreviousDayPrice - rangeInfo.LowerStaticThreshold) /
        (rangeInfo.UpperStaticThreshold - rangeInfo.LowerStaticThreshold)) *
      100;
    if (props.period === "day") {
      periodAvg.current.style.left = `${originLeftPercent}%`;
    }
  };

  const upperStaticThreshold = data
    ? data.HighestTradePrice > data.UpperStaticThreshold
      ? data.HighestTradePrice
      : data.UpperStaticThreshold
    : 0;

  const lowerStaticThreshold = data.LowerStaticThreshold;

  return (
    <Grid item className={classes.root}>
      <Grid
        item
        className={clsx(classes.bar, device.isMobile && classes.barMobile)}
      >
        <Grid container>
          {props.period === "day" && (
            <Tooltip
              placement="top"
              title={comma(props.instrument?.PreviousDayPrice)}
            >
              <Grid item ref={periodAvg} className={classes.periodAvg}></Grid>
            </Tooltip>
          )}
          <Tooltip placement="top" title={comma(currentPriceTooltip)}>
            <Grid item className={classes.currentPrice} ref={currentPrice}>
              <LocationIcon
                className={clsx(
                  classes.currentPriceIcon,
                  device.isMobile && classes.currentPriceIconMobile
                )}
              ></LocationIcon>
            </Grid>
          </Tooltip>
          <Grid item ref={range} className={classes.period}></Grid>
        </Grid>
      </Grid>
      <Grid
        container
        className={clsx(classes.price, device.isMobile && classes.priceMobile)}
      >
        <Grid item>{comma(upperStaticThreshold)}</Grid>
        <Grid item>{comma(lowerStaticThreshold)}</Grid>
      </Grid>
      <Grid
        item
        className={clsx(classes.name, device.isMobile && classes.nameMobile)}
      >
        {props.title}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
    instrument: state.app.instrument,
  };
};

export default connect(mapStateToProps)(RangeItem);
