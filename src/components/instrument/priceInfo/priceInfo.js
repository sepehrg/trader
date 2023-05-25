import React, { useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { coloredPercentHtml, comma } from "../../../shared/utility";
import { connect } from "react-redux";
import MessageTypes from "../../../enums/messageTypes";
import useDevice from "../../../hooks/useDevice";
import * as actions from "../../../store/actions/index";
import DefaultPriceInfo from "./views/default";
import MobilePriceInfo from "./views/mobile";
import WidgetPriceInfo from "./views/widget";

const useStyles = makeStyles((theme) => ({
  highlight: {
    textShadow:
      theme.palette.type === "dark"
        ? "1px 1px 1px #000, 0 0 1px #000, 0 0 3px #fff, 0 0 2px #fff, 0 0 4px #fff"
        : "-1px -1px 1px #ffd50033, 1px -1px 1px #ffd50033, -1px 1px 1px #ffd50033, 1px 1px 1px #ffd50033",
  },
}));

let firstLoad = true;

const PriceInfo = (props) => {
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
      if (props.instrument) props.socket.off(MessageTypes.Trade, listenTrade);
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

  useEffect(() => {
    if (device.isMobile && firstLoad) {
      if (props.watchlistInstruments?.length > 0) {
        firstLoad = false;
        if (localStorage.getItem("instrument"))
          props.setInstrument(localStorage.getItem("instrument"));
        else props.setInstrument(props.watchlistInstruments[0].Isin);
      }
    }
  }, [props.watchlistInstruments]);

  const highlight = (element) => {
    element.classList.add(classes.highlight);
    setTimeout(function () {
      element.classList.remove(classes.highlight);
    }, 500);
  };

  const defaultProps = {
    ref: { lastTradePrice, priceVariation, priceVariationPercentage },
    instrument: props.instrument,
  };

  return (
    <>
      {device.isNotMobile && !props.widget && (
        <DefaultPriceInfo {...defaultProps} />
      )}
      {device.isNotMobile && props.widget && (
        <WidgetPriceInfo
          {...defaultProps}
          onTradeModalBuyOpen={props.onTradeModalBuyOpen}
          onTradeModalSellOpen={props.onTradeModalSellOpen}
        />
      )}
      {device.isMobile && <MobilePriceInfo {...defaultProps} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
    instrument: state.app.instrument,
    watchlistInstruments: state.app.watchlistInstruments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInstrument: (isin) => dispatch(actions.setInstrument(isin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceInfo);
