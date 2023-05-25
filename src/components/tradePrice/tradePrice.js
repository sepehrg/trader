import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { coloredPercent, comma } from "../../shared/utility";
import MessageTypes from "../../enums/messageTypes";
import { connect } from "react-redux";
import ChangeHighlight from "../UI/changeHighlight/changeHighlight";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
}));

const TradePrice = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [percentage, setPercentage] = useState(props.percentage);
  const [variation, setVariation] = useState(props.variation);
  const [last, setLast] = useState(props.last);

  useEffect(() => {
    if (props.socket) {
      if (props.type === "trade")
        props.socket.on(MessageTypes.Trade, listenTrade);
      else props.socket.on(MessageTypes.ClosingPrice, listenClosingPrice);
    }
    return () => {
      if (props.socket) {
        props.socket.off(MessageTypes.Trade, listenTrade);
        props.socket.off(MessageTypes.ClosingPrice, listenClosingPrice);
      }
    };
  }, [props.socket]);

  const listenTrade = (trade) => {
    if (trade && trade.InstrumentId === props.instrumentId) {
      setPercentage(trade.PriceVariationPercentage);
      setVariation(trade.PriceVariation);
      setLast(trade.LastTradePrice);
    }
  };

  const listenClosingPrice = (closingPrice) => {
    if (closingPrice && closingPrice.InstrumentId === props.instrumentId) {
      setPercentage(closingPrice.ClosingPriceVariationPercentage);
      setVariation(closingPrice.ClosingPriceVariation);
      setLast(closingPrice.ClosingPrice);
    }
  };

  return (
    <ChangeHighlight>
      <Grid container className={classes.root} spacing={4}>      
        <Grid item>{coloredPercent(percentage, theme, true, true)}</Grid>
        <Grid item>{coloredPercent(variation, theme, false, false)}</Grid>
        <Grid item ref={React.createRef()}>{comma(last)}</Grid>
      </Grid>
    </ChangeHighlight>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
  };
};

export default connect(mapStateToProps)(TradePrice);
