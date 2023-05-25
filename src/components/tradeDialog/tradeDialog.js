import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TradeForm from "../tradeForm/tradeForm";
import Bidask from "../bidask/bidask";
import { coloredPercent, comma } from "../../shared/utility";
import Components from "../../enums/components";
import MessageTypes from "../../enums/messageTypes";
import Dialog from "../UI/dialog/dialog";
import Drawer from "../UI/drawer/drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "scroll",
  },
  instrument: {
    padding: 8,
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 2,
  },
  lastTradePrice: {
    justifyContent: "space-between",
    padding: "6px 6px",
  },
  company: {
    alignItems: "center",
    flexWrap: "nowrap",
  },
  persianCode: {
    fontSize: 16,
  },
  companyTitle: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
  },
  lastTradePriceInfo: {
    flexWrap: "nowrap",
    alignItems: "center",
  },
  priceVariation: {
    fontSize: 12,
  },
  priceVariationPercentage: {
    fontSize: 12,
  },
  bidask: {
    padding: "8px 8px 8px 8px",
  },
  bidaskInner: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.box,
    borderRadius: 8,
    padding: "3px 6px",
  },
  tradeForm: {
    backgroundColor: theme.palette.background.box,
    padding: "0px 8px 8px 8px",
  },
  paperAnchorBottom: {
    overflow: "hidden",
  },
}));

const TradeDialog = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [lastTradePrice, setLastTradePrice] = useState();
  const [priceVariation, setPriceVariation] = useState();
  const [priceVariationPercentage, setPriceVariationPercentage] = useState();

  useEffect(() => {
    if (props.instrument) {
      props.socket.on(MessageTypes.Trade, listenTrade);

      setLastTradePrice(comma(props.instrument.LastTradePrice));
      setPriceVariation(coloredPercent(props.instrument.PriceVariation, theme));
      setPriceVariationPercentage(
        coloredPercent(
          props.instrument.PriceVariationPercentage,
          theme,
          true,
          true
        )
      );
    }
  }, [props.instrument]);

  const listenTrade = (trade) => {
    if (trade.InstrumentId === props.instrument?.InstrumentId) {
      setLastTradePrice(comma(trade.LastTradePrice));
      setPriceVariation(coloredPercent(trade.PriceVariation, theme));
      setPriceVariationPercentage(
        coloredPercent(trade.PriceVariationPercentage, theme, true, true)
      );
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={props.open}
      onClose={() => props.onClose(props.id)}
      onOpen={() => props.onClose(props.id)}
      showClose
      bottomClassName={classes.paperAnchorBottom}
    >
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.instrument}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container className={classes.lastTradePrice}>
                <Grid item>
                  <Grid container className={classes.company} spacing={3}>
                    <Grid item className={classes.persianCode}>
                      {props.instrument.PersianCode}
                    </Grid>
                    <Grid item className={classes.companyTitle}>
                      {props.instrument.CompanyTitle}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    spacing={3}
                    className={classes.lastTradePriceInfo}
                  >
                    <Grid item className={classes.priceVariationPercentage}>
                      {priceVariationPercentage}
                    </Grid>
                    <Grid item className={classes.priceVariation}>
                      {priceVariation}
                    </Grid>
                    <Grid item>{lastTradePrice}</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.bidask}>
          <Grid container>
            <Grid item xs={12} className={classes.bidaskInner}>
              <Bidask
                border={false}
                instrument={props.instrument}
                component={Components.TradeModal}
              ></Bidask>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.tradeForm}>
          <TradeForm
            side={props.side === 0 ? "buy" : "sell"}
            instrument={props.instrument}
            expandable={true}
            order={props.order}
            isDraftEdit={props.isDraftEdit}
            onClose={() => props.onClose(props.id)}
          ></TradeForm>
        </Grid>
      </Grid>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
  };
};

export default connect(mapStateToProps)(TradeDialog);
