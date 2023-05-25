import React, { useRef, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { coloredPercentHtml, comma } from "../../../shared/utility";
import { connect } from "react-redux";
import MessageTypes from "../../../enums/messageTypes";
import useDevice from "../../../hooks/useDevice";
import DefaultWatchlistItem from "./views/default";
import MobileWatchlistItem from "./views/mobile";
import WidgetWatchlistItem from "./views/widget";

const useStyles = makeStyles((theme) => ({
  highlight: {
    textShadow:
      theme.palette.type === "dark"
        ? "1px 1px 1px #000, 0 0 1px #000, 0 0 3px #fff, 0 0 2px #fff, 0 0 4px #fff"
        : "-1px -1px 1px #ffd50033, 1px -1px 1px #ffd50033, -1px 1px 1px #ffd50033, 1px 1px 1px #ffd50033",
  },
}));

const WatchlistItem = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();

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
    }
    return () => {
      if (props.instrument) {
        props.socket.off(MessageTypes.Trade, listenTrade);
      }
    };
  }, [props.instrument]);

  const listenTrade = (trade) => {
    if (trade.InstrumentId === props.instrument.InstrumentId) {
      const lastPrice = comma(trade.LastTradePrice);
      if (lastTradePrice.current?.innerHTML !== lastPrice) {
        highlight(lastTradePrice.current);
        lastTradePrice.current.innerHTML = lastPrice;
      }
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
  };

  const highlight = (element) => {
    if (element) {
      element.classList.add(classes.highlight);
      setTimeout(function () {
        element.classList.remove(classes.highlight);
      }, 500);
    }
  };

  const defaultProps = {
    ref: { lastTradePrice, priceVariation, priceVariationPercentage },
    instrument: props.instrument,
    onClick: props.onClick,
    onDelete: props.onDelete,
    userDefinedWatchlist: props.userDefinedWatchlist,
  };

  return (
    <>
      {device.isMobile ? (
        <MobileWatchlistItem {...defaultProps} />
      ) : props.widget ? (
        <WidgetWatchlistItem {...defaultProps} />
      ) : (
        <DefaultWatchlistItem
          {...defaultProps}
          listView={props.listView}
          instrument={props.instrument}
          selectedInstrument={props.selectedInstrument}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
    selectedInstrument: state.app.instrument,
    userDefinedWatchlist: state.app.userDefinedWatchlist,
  };
};

export default connect(mapStateToProps)(WatchlistItem);
