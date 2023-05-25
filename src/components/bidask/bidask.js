import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import BidaskTable from "./bidaskTable/bidaskTable";
import MessageTypes from "../../enums/messageTypes";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: (props) =>
      props.border ? `1px solid ${theme.palette.border.secondary}` : "none",
    flexDirection: "column",
    height: "100%",
    padding: ` 0 ${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(
      4
    )}px`,
    fontSize: 11,
  },
  fullHeight: {
    height: "100%",
  },
}));

const Bidask = (props) => {
  const classes = useStyles(props);

  const [instrument, setInstrument] = useState(props.instrument);
  const [socketBidAsk, setSocketBidAsk] = useState(null);

  useEffect(() => {
    if (instrument) {
      props.subscribe(
        MessageTypes.BidAsk,
        instrument.InstrumentId,
        props.component
      );
      props.socket.on(MessageTypes.BidAsk, listenBidAsk);
    }
    return () => {
      if (instrument) {
        props.unsubscribe(
          MessageTypes.BidAsk,
          instrument.InstrumentId,
          props.component
        );
        props.socket.off(MessageTypes.BidAsk, listenBidAsk);
      }
    };
  }, [instrument]);

  useEffect(() => {
    setInstrument(props.instrument);
  }, [props.instrument]);

  const listenBidAsk = (bidAsk) => {
    if (bidAsk.InstrumentId === instrument?.InstrumentId)
      setSocketBidAsk(bidAsk);
  };

  useEffect(() => {
    if (props.widget) setInstrument(props.globalInstrument);
  }, [props.globalInstrument]);

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.fullHeight}>
        <BidaskTable
          bidAsk={socketBidAsk}
          instrument={instrument}
        ></BidaskTable>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
    globalInstrument: state.app.instrument,
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

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Bidask));
