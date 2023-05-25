import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { comma, shortenNumber } from "../../../shared/utility";
import NextIcon from "../../UI/icons/next";
import Tooltip from "../../UI/Tooltip/Tooltip";
import MessageTypes from "../../../enums/messageTypes";
import { connect } from "react-redux";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
  },
  main: {
    alignItems: "center",
    flexWrap: "nowrap",
  },
  bar: {
    height: 5,
    display: "flex",
    backgroundColor: theme.palette.border.bar,
    borderRadius: 4,
  },
  barBuyParent: {
    justifyContent: "flex-end",
  },
  barSellParent: {
    justifyContent: "flex-start",
  },
  barBuy: {
    height: "100%",
    backgroundColor: theme.palette.color.blue,
    transition: "1s",
    borderRadius: 4,
  },
  barSell: {
    height: "100%",
    backgroundColor: theme.palette.color.red,
    transition: "1s",
    borderRadius: 4,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    margin: "0 6px",
  },

  num: {
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  buy: {
    padding: `0 ${theme.spacing(1)}px`,
    color: theme.palette.text.primary,
    direction: "ltr",
  },
  sell: {
    color: theme.palette.text.primary,
    direction: "ltr",
  },
  buyPercent: {
    padding: `0 ${theme.spacing(1)}px`,
    color: theme.palette.color.blue,
  },
  sellPercent: {
    padding: `0 ${theme.spacing(1)}px`,
    color: theme.palette.color.red,
  },
  nextIcon: {
    width: 20,
    height: 14,
    fill: `${theme.palette.icon.primary}55`,
  },

  rootMobile: {
    padding: "10px 0px",
  },
  titleMobile: {
    fontSize: 12,
  },
  numTitleMobile: {
    flexDirection: "column",
    color: theme.palette.text.secondary,
    fontSize: 10,
    lineHeight: 1.6,
    textAlign: "center",
  },
  numMobile: {
    flexDirection: "column",
    fontSize: 12,
  },
  buyNumMobile: {
    textAlign: "right",
  },
  volumeNumMobile: {
    order: 1,
  },
  countNumMobile: {
    order: 2,
  },
  sellCountNumMobile: {
    justifyContent: "flex-end",
  },
  rowItemMobile: {
    width: "40%",
  },
  barMobile: {
    height: 10,
    borderRadius: 4,
  },
}));

const ClientTradeItem = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const buyBar = useRef();
  const sellBar = useRef();
  const buyVolumePercent = useRef();
  const sellVolumePercent = useRef();
  // const buyCount = useRef();
  // const buyVolume = useRef();
  // const sellCount = useRef();
  // const sellVolume = useRef();
  const [buyCount, setBuyCount] = useState(0);
  const [buyVolume, setBuyVolume] = useState(0);
  const [sellCount, setSellCount] = useState(0);
  const [sellVolume, setSellVolume] = useState(0);

  useEffect(() => {
    if (props.instrument) {
      setClientTrade(props.instrument);
      props.socket.on(MessageTypes.ClientTrade, listenClientTrade);
    }
    return () => {
      if (props.instrument)
        props.socket.off(MessageTypes.ClientTrade, listenClientTrade);
    };
  }, [props.instrument]);

  const listenClientTrade = (trade) => {
    if (trade.InstrumentId === props.instrument?.InstrumentId)
      setClientTrade(renameFields(trade));
  };

  const renameFields = (data) => {
    return {
      ...data,
      SellFirmCount: data.SelFirmCount,
      SellFirmVolume: data.SelFirmVolume,
      SellFirmVolumePercent: data.SelFirmVolumePercent,
      SellIndividualCount: data.SelIndividualCount,
      SellIndividualVolume: data.SelIndividualVolume,
      SellIndividualVolumePercent: data.SelIndividualVolumePercent,
    };
  };

  const setClientTrade = (data) => {
    const buyVolumePercentValue =
      props.type === "Firm"
        ? data.BuyFirmVolumePercent
        : data.BuyIndividualVolumePercent;
    buyVolumePercent.current.innerHTML = `(${buyVolumePercentValue || 0}%)`;
    buyBar.current.style.width = `${buyVolumePercentValue}%`;

    const sellVolumePercentValue =
      props.type === "Firm"
        ? data.SellFirmVolumePercent
        : data.SellIndividualVolumePercent;
    sellVolumePercent.current.innerHTML = `(${sellVolumePercentValue || 0}%)`;
    sellBar.current.style.width = `${sellVolumePercentValue}%`;

    // const buyCountValue =
    //   props.type === "Firm" ? data.BuyFirmCount : data.BuyIndividualCount;
    // buyCount.current.innerHTML = comma(shortenNumber(buyCountValue));
    setBuyCount(
      props.type === "Firm" ? data.BuyFirmCount : data.BuyIndividualCount
    );

    // const buyVolumeValue =
    //   props.type === "Firm" ? data.BuyFirmVolume : data.BuyIndividualVolume;
    // buyVolume.current.innerHTML = comma(shortenNumber(buyVolumeValue));
    setBuyVolume(
      props.type === "Firm" ? data.BuyFirmVolume : data.BuyIndividualVolume
    );

    // const sellCountValue =
    //   props.type === "Firm" ? data.SellFirmCount : data.SellIndividualCount;
    // sellCount.current.innerHTML = comma(shortenNumber(sellCountValue));
    setSellCount(
      props.type === "Firm" ? data.SellFirmCount : data.SellIndividualCount
    );

    // const sellVolumeValue =
    //   props.type === "Firm" ? data.SellFirmVolume : data.SellIndividualVolume;
    // sellVolume.current.innerHTML = comma(shortenNumber(sellVolumeValue));
    setSellVolume(
      props.type === "Firm" ? data.SellFirmVolume : data.SellIndividualVolume
    );
  };

  return (
    <React.Fragment>
      <Grid
        container
        className={clsx(device.isNotMobile ? classes.root : classes.rootMobile)}
      >
        <Grid item xs={12}>
          <Grid container className={classes.main}>
            <Grid
              item
              xs={6}
              className={clsx(
                classes.barBuyParent,
                classes.bar,
                device.isMobile && classes.barMobile
              )}
            >
              <div className={classes.barBuy} ref={buyBar}></div>
            </Grid>
            <Grid
              item
              className={clsx(
                classes.title,
                device.isMobile && classes.titleMobile
              )}
            >
              {props.name}
            </Grid>
            <Grid
              item
              xs={6}
              className={clsx(
                classes.barSellParent,
                classes.bar,
                device.isMobile && classes.barMobile
              )}
            >
              <div className={classes.barSell} ref={sellBar}></div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.num}>
            <Grid
              item
              className={clsx(device.isMobile && classes.rowItemMobile)}
            >
              <Grid
                container
                className={clsx(
                  device.isMobile && classes.numMobile,
                  device.isMobile && classes.buyNumMobile
                )}
              >
                <Grid
                  item
                  className={clsx(device.isMobile && classes.countNumMobile)}
                >
                  <Grid container>
                    <Grid
                      item
                      className={classes.buyPercent}
                      ref={buyVolumePercent}
                    ></Grid>
                    <Grid item>
                      <Tooltip
                        arrow
                        placement="bottom"
                        title={`تعداد: ${comma(buyCount)}`}
                      >
                        <Grid item className={classes.buy}>
                          {shortenNumber(buyCount)}
                        </Grid>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                {device.isNotMobile && (
                  <Grid item>
                    <NextIcon className={classes.nextIcon}></NextIcon>
                  </Grid>
                )}
                <Grid
                  item
                  className={clsx(device.isMobile && classes.volumeNumMobile)}
                >
                  <Tooltip
                    arrow
                    placement="bottom"
                    title={`حجم: ${comma(buyVolume)}`}
                  >
                    <Grid item className={classes.buy}>
                      {shortenNumber(buyVolume)}
                    </Grid>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            {device.isMobile && (
              <Grid item>
                <Grid container className={classes.numTitleMobile}>
                  <Grid item>حجم</Grid>
                  <Grid item>تعداد</Grid>
                </Grid>
              </Grid>
            )}
            <Grid
              item
              className={clsx(device.isMobile && classes.rowItemMobile)}
            >
              <Grid
                container
                className={clsx(device.isMobile && classes.numMobile)}
              >
                <Grid
                  item
                  className={clsx(device.isMobile && classes.countNumMobile)}
                >
                  <Grid
                    container
                    className={clsx(
                      device.isMobile && classes.sellCountNumMobile
                    )}
                  >
                    <Grid
                      item
                      className={classes.sellPercent}
                      ref={sellVolumePercent}
                    ></Grid>
                    <Grid item>
                      <Tooltip
                        arrow
                        placement="bottom"
                        title={`تعداد: ${comma(sellCount)}`}
                      >
                        <Grid item className={classes.sell}>
                          {shortenNumber(sellCount)}
                        </Grid>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                {device.isNotMobile && (
                  <Grid item>
                    <NextIcon className={classes.nextIcon}></NextIcon>
                  </Grid>
                )}
                <Grid
                  item
                  className={clsx(device.isMobile && classes.volumeNumMobile)}
                >
                  <Tooltip
                    arrow
                    placement="bottom"
                    title={`حجم: ${comma(sellVolume)}`}
                  >
                    <Grid item className={classes.sell}>
                      {shortenNumber(sellVolume)}
                    </Grid>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
    instrument: state.app.instrument,
  };
};

export default connect(mapStateToProps)(ClientTradeItem);
