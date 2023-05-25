import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "../../../UI/Link/Link";
import clsx from "clsx";
import InstrumentStateIcon from "../../../instrumentStateIcon/instrumentStateIcon";
import CloseIcon from "../../../UI/icons/close";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 58,
    padding: "2px 15px",
    borderRadius: "5px 15px 15px 5px",
    border: `1px solid ${theme.palette.border.bar}`,
    borderRight: `7px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.paper,
    justifyContent: "space-between",
    alignItems: "center",
    transition: "border-width 0.3s",
    marginBottom: "10px",
    position: "relative",
    "&:hover": {
      borderRight: `9px solid ${theme.palette.primary.main}`,
      "& $removeFavorite": {
        display: "block",
      },
    },
  },
  instrument: {
    fontSize: 13,
    alignItems: "center",
  },
  prices: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  pricePercentage: {
    fontSize: 11,
  },
  subPrice: {
    alignItems: "baseline",
    padding: 2,
    fontSize: 11,
  },
  priceVariation: {
    fontSize: 11,
    flexWrap: "nowrap",
    marginRight: 4,
  },
  stateIcon: {
    margin: `0px ${theme.spacing(2)}px`,
  },
  lastTradePrice: {
    fontSize: 12,
    padding: 2,
  },
  active: {
    borderRight: `7px solid ${theme.palette.primary.main}`,
    borderColor: theme.palette.primary.main,
  },
  removeFavorite: {
    display: "none",
    position: "absolute",
    top: 3,
    right: 4,
    padding: 1,
    "&:hover $close": {
      fill: theme.palette.color.red,
    },
  },
  close: {
    width: 13,
    height: 13,
  },

  rootList: {
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    height: 44,
    padding: "0 10px",
    position: "relative",
    "&:hover": {
      "& $removeFavorite": {
        display: "block",
      },
    },
  },
  persianCodeList: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
  },
  titleList: {
    display: "flex",
    alignItems: "center",
  },
  containerPriceList: {
    display: "flex",
    alignItems: "center",
  },
  pricesList: {
    flexDirection: "row",
  },
  tableRowlist: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `3px solid ${theme.palette.background.box}`,
    transition: "backgroundColor 0.3s",
    height: 39,
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  activeList: {
    backgroundColor: `${theme.palette.primary.main}22`,
  },
  lastTradePriceList: {
    order: 2,
  },
}));

const DefaultWatchlistItem = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Link onClick={props.onClick}>
      <Grid item>
        <Grid
          container
          className={clsx(
            props.listView ? classes.rootList : classes.root,
            props.listView && classes.tableRowlist,
            [
              props.instrument &&
                props.instrument.InstrumentId ===
                  props.selectedInstrument?.InstrumentId &&
                (props.listView ? classes.activeList : classes.active),
            ]
          )}
        >
          {props.userDefinedWatchlist && (
            <Grid item className={classes.removeFavorite}>
              <Link
                tooltipPlacement="right"
                title="حذف از دیده‌بان"
                onClick={props.onDelete}
                tooltipColor={theme.palette.color.red}
              >
                <CloseIcon className={classes.close} />
              </Link>
            </Grid>
          )}
          <Grid
            item
            className={clsx(props.listView && classes.persianCodeList)}
          >
            <Grid container>
              <Grid
                item
                className={clsx(!props.listView && classes.instrument)}
                data-tour="watchlistItemTitle"
              >
                {props.instrument?.PersianCode}
              </Grid>
              <Grid item>
                <InstrumentStateIcon
                  instrument={props.instrument}
                  className={classes.stateIcon}
                ></InstrumentStateIcon>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={clsx(props.listView && classes.containerPriceList)}
          >
            <Grid
              container
              className={clsx(
                classes.prices,
                props.listView && classes.pricesList
              )}
            >
              <Grid
                item
                className={clsx(
                  classes.lastTradePrice,
                  props.listView && classes.lastTradePriceList
                )}
                data-tour="watchlistItemLastTradePrice"
              >
                <div ref={ref.lastTradePrice}></div>
              </Grid>
              <Grid item data-tour="watchlistItemPriceVariation">
                <Grid container className={classes.subPrice}>
                  <Grid item className={classes.pricePercentage}>
                    <div ref={ref.priceVariationPercentage}></div>
                  </Grid>
                  <Grid item className={classes.priceVariation}>
                    <div ref={ref.priceVariation}></div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
});

export default DefaultWatchlistItem;
