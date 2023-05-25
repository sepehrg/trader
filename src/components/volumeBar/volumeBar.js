import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { shortenNumber, comma } from "../../shared/utility";
import Tooltip from "../UI/Tooltip/Tooltip";
import MessageTypes from "../../enums/messageTypes";
import { connect } from "react-redux";
import ChangeHighlight from "../UI/changeHighlight/changeHighlight";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
  },
  bar: {
    height: 3,
    width: "100%",
    backgroundColor: theme.palette.border.bar,
    display: "flex",
  },
  numbers: {
    justifyContent: "space-between",
    direction: "ltr",
  },
  buy: {
    backgroundColor: theme.palette.color.blue,
    width: (props) => `${props.buyWidth}%`,
    height: "100%",
  },
  sell: {
    backgroundColor: theme.palette.color.red,
    width: (props) => `${props.sellWidth}%`,
    height: "100%",
  },
}));

const Volume = (props) => {
  const theme = useTheme();

  const [buy, setBuy] = useState(props.buy);
  const [sell, setSell] = useState(props.sell);
  const [buyWidth, setBuyWidth] = useState();
  const [sellWidth, setSellWidth] = useState();

  useEffect(() => {
    setBuyWidth(Math.round((buy / (buy + sell)) * 100));
    setSellWidth(Math.round((sell / (buy + sell)) * 100));
  }, [buy, sell]);

  useEffect(() => {
    if (props.socket)
      props.socket.on(MessageTypes.ClientTrade, listenClientTrade);
    return () => {
      if (props.socket)
        props.socket.off(MessageTypes.ClientTrade, listenClientTrade);
    };
  }, [props.socket]);

  const listenClientTrade = (clientTrade) => {
    if (clientTrade && clientTrade.InstrumentId === props.instrumentId) {
      setBuy(clientTrade[`Buy${props.type}Volume`]);
      setSell(clientTrade[`Sel${props.type}Volume`]);
    }
  };

  const classes = useStyles({
    buyWidth,
    sellWidth,
  });

  return (
    <ChangeHighlight>
    <Grid container>
      <Grid item className={classes.main}>
        <Grid container className={classes.numbers}>
          <Grid item ref={React.createRef()}>{shortenNumber(sell)}</Grid>
          <Grid item ref={React.createRef()}>{shortenNumber(buy)}</Grid>
        </Grid>
        <div className={classes.bar}>
          <Tooltip placement="top" title={buyWidth + "%"}>
            <div className={classes.buy}></div>
          </Tooltip>
          <Tooltip
            placement="top"
            title={sellWidth + "%"}
            color={theme.palette.color.red}
          >
            <div className={classes.sell}></div>
          </Tooltip>
        </div>
      </Grid>
    </Grid>
    </ChangeHighlight>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
  };
};

export default connect(mapStateToProps)(Volume);
