import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TradeDialog from "../tradeDialog/tradeDialog";
import Button from "../UI/Button/Button";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  orderButtons: {},
  buttons: {
    height: 48,
    borderRadius: 10,
    color: "#FFF",
    fontSize: 16,
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
  },
  buy: {
    backgroundColor: theme.palette.color.blue,
    "&:hover": {
      backgroundColor: theme.palette.color.blue,
    },
  },
  sell: {
    backgroundColor: theme.palette.color.red,
    "&:hover": {
      backgroundColor: theme.palette.color.red,
    },
  },
}));

const Instrument = (props) => {
  const classes = useStyles();

  const openTradeModalBuy = useCallback(() => {
    if (props.instrument) props.openTradeModal(props.instrument.Isin, 0);
  }, [props.instrument]);

  const openTradeModalSell = useCallback(() => {
    if (props.instrument) props.openTradeModal(props.instrument.Isin, 1);
  }, [props.instrument]);

  return (
    <>
      {props.openedModals.map((m) => (
        <TradeDialog
          key={m.key}
          id={m.key}
          open={true}
          instrument={m.instrument}
          instrumentId={m.instrument.InstrumentId}
          side={m.side}
          onClose={props.closeTradeModal}
          order={m.order}
          isDraftEdit={m.isDraftEdit}
        ></TradeDialog>
      ))}
      <Grid container className={classes.orderButtons} spacing={6}>
        <Grid item xs={6}>
          <Button
            onClick={openTradeModalBuy}
            className={clsx(classes.buttons, classes.buy)}
            fullWidth
          >
            سفارش خرید
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={openTradeModalSell}
            className={clsx(classes.buttons, classes.sell)}
            fullWidth
          >
            سفارش فروش
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
    openedModals: state.app.openedModals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openTradeModal: (isin, side) =>
      dispatch(actions.openTradeModal(isin, side)),
    closeTradeModal: (key) => dispatch(actions.closeTradeModal(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Instrument);
