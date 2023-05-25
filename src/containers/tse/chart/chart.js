import React from "react";
import TradingView from "../../../components/tradingView/tradingView";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  chart: {
    flexGrow: 1,
    height: "100%",
  },
  tradingView: {
    height: "100%",
    paddingTop: 5,
  },
}));

const Chart = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.chart}>
        {props.instrument && (
          <TradingView
            className={classes.tradingView}
            symbol={props.instrument.Isin}
          />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
  };
};

export default connect(mapStateToProps)(Chart);
