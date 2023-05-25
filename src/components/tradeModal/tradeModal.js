import React, { useState, useEffect, useCallback, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Modal from "../UI/modal/modal";
import Tabs from "../UI/Tab/Tabs";
import Tab from "../UI/Tab/Tab";
import TradeForm from "../tradeForm/tradeForm";
import Bidask from "../bidask/bidask";
import { coloredPercentHtml, comma } from "../../shared/utility";
import clsx from "clsx";
import Components from "../../enums/components";
import MessageTypes from "../../enums/messageTypes";
import * as actions from "../../store/actions/index";
import ChangeHighlight from "../UI/changeHighlight/changeHighlight";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "5px",
    height: "100%",
    flexWrap: "nowrap",
  },
  right: {
    backgroundColor: theme.palette.background.paper,
  },
  rightContainer: {
    width: 135,
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
  instrument: {
    alignSelf: "center",
    width: "100%",
  },
  instrumentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  name: {
    fontSize: 16,
  },
  avatar: {
    margin: "10px auto 5px",
  },
  change: {
    justifyContent: "center",
    marginBottom: 5,
  },
  tabContainer: {
    flexDirection: "row-reverse",
    marginTop: 10,
    marginBottom: 10,
  },
  tab: {
    minWidth: 60,
    minHeight: 25,
    fontSize: 12,
  },
  roundTop: {
    borderRadius: "0 8px 0 0",
  },
  roundBottom: {
    borderRadius: "0 0 8px 0",
  },
  buy: {
    backgroundColor: theme.palette.color.blue,
  },
  sell: {
    backgroundColor: theme.palette.color.red,
  },
  tabPanel: {
    paddingTop: 3,
  },
  left: {
    marginTop: -30,
    transition: "0.1s",
  },
  blueBorder: {
    borderRight: `2px solid ${theme.palette.color.blue}`,
  },
  redBorder: {
    borderRight: `2px solid ${theme.palette.color.red}`,
  },
  indicator: {
    display: "none",
  },
  paddingMinimized: {
    padding: "4px 0 10px",
  },
  bidask: {
    padding: 7,
    flexGrow: 1,
  },
  infoItem: {
    flexDirection: "column",
  },
  infoTitle: {
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  infoAmount: {
    fontSize: 12,
    display: "flex",
    "&:before": {
      content: "''",
      flex: "1",
      height: 1,
      backgroundColor: theme.palette.text.secondary,
      margin: "auto",
      marginLeft: theme.spacing(2),
    },
    "&:after": {
      content: "''",
      flex: "1",
      height: 1,
      backgroundColor: theme.palette.text.secondary,
      margin: "auto",
      marginRight: theme.spacing(2),
    },
  },
}));

const TradeModal = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [side, setSide] = useState(props.side);
  const [minimized, setMinimized] = useState(false);

  const lastTradePrice = useRef();
  const priceVariation = useRef();
  const priceVariationPercentage = useRef();

  useEffect(() => {
    if (props.instrument) {
      props.socket.on(MessageTypes.Trade, listenTrade);

      lastTradePrice.current.innerHTML = comma(props.instrument.LastTradePrice);
      priceVariation.current.innerHTML = coloredPercentHtml(
        props.instrument.PriceVariation,
        theme
      );
      priceVariationPercentage.current.innerHTML = coloredPercentHtml(
        props.instrument.PriceVariationPercentage,
        theme,
        true,
        true
      );

      props.subscribe(
        MessageTypes.Trade,
        props.instrument.InstrumentId,
        Components.TradeModal
      );
      props.subscribe(
        MessageTypes.InstrumentStateChange,
        props.instrument.InstrumentId,
        Components.TradeModal
      );
    }
    return () => {
      if (props.instrument) {
        props.socket.off(MessageTypes.Trade, listenTrade);
        props.unsubscribe(
          MessageTypes.Trade,
          props.instrument.InstrumentId,
          Components.TradeModal
        );
        props.unsubscribe(
          MessageTypes.InstrumentStateChange,
          props.instrument.InstrumentId,
          Components.TradeModal
        );
      }
    };
  }, [props.instrument]);

  const listenTrade = (trade) => {
    if (trade.InstrumentId === props.instrument?.InstrumentId) {
      const lastPrice = comma(trade.LastTradePrice);
      if (lastTradePrice.current.innerHTML !== lastPrice) {
        highlight(lastTradePrice.current);
        lastTradePrice.current.innerHTML = lastPrice;
        priceVariation.current.innerHTML = coloredPercentHtml(
          trade.PriceVariation,
          theme
        );
        priceVariationPercentage.current.innerHTML = coloredPercentHtml(
          trade.PriceVariationPercentage,
          theme,
          true,
          true
        );
      }
    }
  };

  const handleSideChange = useCallback(
    (event, newValue) => {
      setSide(newValue);
    },
    [side]
  );

  const minimizeHandler = () => {
    setMinimized(!minimized);
  };

  const highlight = (element) => {
    element.classList.add(classes.highlight);
    setTimeout(function () {
      element.classList.remove(classes.highlight);
    }, 500);
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.onClose(props.id)}
      onMinimize={minimizeHandler}
      width={600}
    >
      <Grid container className={classes.root}>
        <Grid item className={classes.right}>
          <Grid container className={classes.rightContainer}>
            <Grid item className={classes.instrument}>
              <Grid
                container
                spacing={3}
                className={classes.instrumentContainer}
              >
                {!minimized && (
                  <Grid item>
                    <Avatar
                      className={clsx(classes.avatar, "no-drag")}
                      src={"data:image/png;base64, " + props.instrument.Picture}
                    />
                  </Grid>
                )}
                <Grid item>
                  <Typography
                    variant="h4"
                    className={clsx(
                      classes.name,
                      minimized && classes.paddingMinimized
                    )}
                  >
                    {props.instrument.PersianCode}
                  </Typography>
                </Grid>
                {!minimized && (
                  <>
                    <Grid item>
                      <ChangeHighlight>
                        <Typography
                          variant="subtitle2"
                          className={classes.price}
                        >
                          <div ref={lastTradePrice}></div>
                        </Typography>
                      </ChangeHighlight>
                    </Grid>
                    <Grid item>
                      <Grid container className={classes.change} spacing={3}>
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            className={classes.percent}
                          >
                            <div ref={priceVariationPercentage}></div>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            className={classes.percent}
                          >
                            <div ref={priceVariation}></div>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            {!minimized && (
              <Grid item>
                <Grid container className={classes.tabContainer}>
                  <Grid item>
                    <Tabs
                      classes={{
                        indicator: classes.indicator,
                      }}
                      orientation="vertical"
                      value={side}
                      onChange={handleSideChange}
                    >
                      <Tab
                        className={clsx(
                          classes.tab,
                          classes.roundTop,
                          side === 0 && classes.buy
                        )}
                        label="خرید"
                        id="tab-0"
                      ></Tab>
                      <Tab
                        className={clsx(
                          classes.tab,
                          classes.roundBottom,
                          side === 1 && classes.sell
                        )}
                        label="فروش"
                        id="tab-1"
                      ></Tab>
                    </Tabs>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          className={clsx(
            classes.left,
            side === 0 ? classes.blueBorder : classes.redBorder
          )}
        >
          <Grid container className={classes.tabPanel}>
            {!minimized && (
              <Grid item className={classes.bidask}>
                <Bidask
                  border={false}
                  instrument={props.instrument}
                  component={Components.TradeModal}
                ></Bidask>
              </Grid>
            )}
            <Grid item>
              <TradeForm
                side={side === 0 ? "buy" : "sell"}
                instrument={props.instrument}
                expandable={true}
                minimized={minimized}
                order={props.order}
                isDraftEdit={props.isDraftEdit}
              ></TradeForm>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (messageType, instrumentId, component) =>
      dispatch(actions.subscribe(messageType, instrumentId, component)),
    unsubscribe: (messageType, instrumentId, component) =>
      dispatch(actions.unsubscribe(messageType, instrumentId, component)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeModal);
