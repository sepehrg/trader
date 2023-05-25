import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ClientTradeItem from "./clientTradeItem/clientTradeItem";
import * as actions from "../../store/actions/index";
import MessageTypes from "../../enums/messageTypes";
import Components from "../../enums/components";
import useDevice from "../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: "5px",
    justifyContent: "space-around",
    height: "100%",
    flexDirection: "column",
    padding: `${theme.spacing(3)}px`,
  },
  rootMobile: {
    padding: "20px 16px",
  },
  rootWidget: {
    height: "100%",
  },
}));

const ClientTrade = (props) => {
  const classes = useStyles();
  const device = useDevice();

  useEffect(() => {
    if (props.instrument)
      props.subscribe(
        MessageTypes.ClientTrade,
        props.instrument.InstrumentId,
        Components.ClientTrade
      );
    return () => {
      if (props.instrument)
        props.unsubscribe(
          MessageTypes.ClientTrade,
          props.instrument.InstrumentId,
          Components.ClientTrade
        );
    };
  }, [props.instrument]);

  return (
    <Grid
      container
      className={clsx(
        device.isNotMobile ? !props.widget && classes.root : classes.rootMobile,
        props.widget && classes.rootWidget
      )}
    >
      <ClientTradeItem name="حقیقی" type="Individual"></ClientTradeItem>
      <ClientTradeItem name="حقوقی" type="Firm"></ClientTradeItem>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientTrade);
