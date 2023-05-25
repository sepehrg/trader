import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PriceInfo from "../priceInfo/priceInfo";
import ClosingPriceInfo from "../closingPriceInfo/closingPriceInfo";
import TradeInfo from "../tradeInfo/tradeInfo";

const useStyles = makeStyles((theme) => ({
  tradesMobile: {
    backgroundColor: theme.palette.background.box,
    padding: 10,
    height: "100%",
    alignContent: "start",
  },
  boxMobile: {
    padding: "3px 0px",
  },
}));

const WidgetInstrument = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.tradesMobile}>
      <Grid item xs={12}>
        <PriceInfo
          widget
          onTradeModalBuyOpen={props.onTradeModalBuyOpen}
          onTradeModalSellOpen={props.onTradeModalSellOpen}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} className={classes.boxMobile}>
            <ClosingPriceInfo
              instrument={props.instrument}
              widget
            ></ClosingPriceInfo>
            <TradeInfo instrument={props.instrument} widget></TradeInfo>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WidgetInstrument;
