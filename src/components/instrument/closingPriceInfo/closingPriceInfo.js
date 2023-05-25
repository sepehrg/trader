import React, { useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { coloredPercentHtml, comma } from "../../../shared/utility";
import MessageTypes from "../../../enums/messageTypes";
import { connect } from "react-redux";
import useDevice from "../../../hooks/useDevice";
import DefaultClosingPriceInfo from "./views/default";
import MobileClosingPriceInfo from "./views/mobile";
import WidgetClosingPriceInfo from "./views/widget";

const useStyles = makeStyles((theme) => ({
  highlight: {
    textShadow:
      theme.palette.type === "dark"
        ? "1px 1px 1px #000, 0 0 1px #000, 0 0 3px #fff, 0 0 2px #fff, 0 0 4px #fff"
        : "-1px -1px 1px #ffd50033, 1px -1px 1px #ffd50033, -1px 1px 1px #ffd50033, 1px 1px 1px #ffd50033",
  },
}));

const ClosingPriceInfo = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();

  const priceRef = useRef();
  const priceVariationRef = useRef();
  const priceVariationPercentageRef = useRef();

  useEffect(() => {
    if (props.instrument) {
      props.socket.on(MessageTypes.ClosingPrice, listenClosingPrice);

      priceRef.current.innerHTML = comma(props.instrument.ClosingPrice);
      priceVariationRef.current.innerHTML = coloredPercentHtml(
        props.instrument.ClosingPriceVariation,
        theme
      );
      priceVariationPercentageRef.current.innerHTML = coloredPercentHtml(
        props.instrument.ClosingPriceVariationPercentage,
        theme,
        true,
        true
      );
    }
    return () => {
      if (props.instrument)
        props.socket.off(MessageTypes.ClosingPrice, listenClosingPrice);
    };
  }, [props.instrument]);

  const listenClosingPrice = (closingPrice) => {
    if (closingPrice.InstrumentId === props.instrument?.InstrumentId) {
      const cPrice = comma(closingPrice.ClosingPrice);
      if (priceRef.current.innerHTML !== cPrice) {
        highlight(priceRef.current);
        priceRef.current.innerHTML = cPrice;
        priceVariationRef.current.innerHTML = coloredPercentHtml(
          closingPrice.ClosingPriceVariation,
          theme
        );
        priceVariationPercentageRef.current.innerHTML = coloredPercentHtml(
          closingPrice.ClosingPriceVariationPercentage,
          theme,
          true,
          true
        );
      }
    }
  };

  const highlight = (element) => {
    element.classList.add(classes.highlight);
    setTimeout(function () {
      element.classList.remove(classes.highlight);
    }, 500);
  };

  const defaultProps = {
    ref: { priceRef, priceVariationRef, priceVariationPercentageRef },
    instrument: props.instrument,
  };

  return (
    <>
      {device.isNotMobile && !props.widget && (
        <DefaultClosingPriceInfo {...defaultProps} />
      )}
      {device.isNotMobile && props.widget && (
        <WidgetClosingPriceInfo {...defaultProps} />
      )}
      {device.isMobile && <MobileClosingPriceInfo {...defaultProps} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
  };
};

export default connect(mapStateToProps)(ClosingPriceInfo);
