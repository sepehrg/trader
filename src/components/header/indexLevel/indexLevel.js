import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StockIcon from "../../UI/icons/stock";
import DecendingIcon from "../../UI/icons/decending";
import AscendingIcon from "../../UI/icons/ascending";
import NeutralIcon from "../../UI/icons/neutral";
import { connect } from "react-redux";
import { coloredPercent, comma } from "../../../shared/utility";
import Skeleton from "@material-ui/lab/Skeleton";
import * as actions from "../../../store/actions/index";
import clsx from "clsx";
import MessageTypes from "../../../enums/messageTypes";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  decendingMarket: {
    fill: theme.palette.color.red,
  },
  ascendingMarket: {
    fill: theme.palette.color.green,
  },
  indexIcon: {
    height: 23,
    width: 23,
    margin: "0 3px",
  },
  totalMarket: {
    fontSize: "12px",
    color: theme.palette.text.secondary,
    textAlign: "right",
    paddingBottom: theme.spacing(1),
  },
  totalMarketPrice: {
    fontSize: "11px",
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(2),
  },
  totalMarketPercent: {
    fontSize: "11px",
    paddingTop: theme.spacing(2),
  },
  stock: {
    alignItems: "center",
  },
  stockTitle: {
    alignItems: "bottom",
  },
  stockNum: {
    alignItems: "bottom",
  },
}));

const IndexLevel = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();

  const [marketActivity, setMarketActivity] = useState(null);

  useEffect(() => {
    props.subscribe(MessageTypes.MarketActivity);
    props.setMarketActivity();
  }, []);

  useEffect(() => {
    setMarketActivity(props.marketActivity?.find((m) => m.Flow === 1));
  }, [props.marketActivity]);

  return (
    <>
      {device.isNotMobile && (
        <Grid container className={classes.stock}>
          <Grid item>
            <StockIcon></StockIcon>
          </Grid>
          <Grid item>
            <Grid container className={classes.stockTitle}>
              <Typography variant="subtitle2" className={classes.totalMarket}>
                شاخص کل
              </Typography>
            </Grid>
            {marketActivity ? (
              <Grid container className={classes.stockNum}>
                <Typography
                  variant="subtitle1"
                  className={classes.totalMarketPrice}
                >
                  {comma(parseInt(marketActivity.LastIndexLevel))}
                </Typography>
                {marketActivity.LastIndexLevelVariationPercentage < 0 ? (
                  <DecendingIcon
                    className={clsx(classes.decendingMarket, classes.indexIcon)}
                  ></DecendingIcon>
                ) : marketActivity.LastIndexLevelVariationPercentage > 0 ? (
                  <AscendingIcon
                    className={clsx(classes.ascendingMarket, classes.indexIcon)}
                  ></AscendingIcon>
                ) : (
                  <NeutralIcon className={classes.indexIcon}></NeutralIcon>
                )}
                <Typography
                  variant="subtitle1"
                  className={classes.totalMarketPercent}
                >
                  {coloredPercent(
                    parseFloat(
                      marketActivity.LastIndexLevelVariationPercentage
                    ).toFixed(2),
                    theme,
                    true,
                    true
                  )}{" "}
                  {comma(
                    coloredPercent(
                      parseInt(marketActivity.LastIndexLevelVariation),
                      theme,
                      false,
                      false
                    )
                  )}
                </Typography>
              </Grid>
            ) : (
              <Skeleton
                animation="wave"
                variant="text"
                height={25}
                width={120}
              />
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    marketActivity: state.app.marketActivity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMarketActivity: () => dispatch(actions.setMarketActivity()),
    subscribe: (message) => dispatch(actions.subscribe(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexLevel);
