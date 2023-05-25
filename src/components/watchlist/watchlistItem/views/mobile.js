import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "../../../UI/Link/Link";
import InstrumentStateIcon from "../../../instrumentStateIcon/instrumentStateIcon";
import DeleteIcon from "../../../UI/icons/delete";

const useStyles = makeStyles((theme) => ({
  stateIcon: {
    margin: `0px ${theme.spacing(2)}px`,
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
  containerMobile: {
    flexWrap: "nowrap",
    alignItems: "center",
    marginBottom: 10,
  },
  boxMobile: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.box,
    borderRadius: 12,
    padding: "3px 12px",
    justifyContent: "space-between",
    minHeight: 52,
    alignItems: "center",
  },
  titleMobile: {
    fontSize: 14,
  },
  pricePercentageMobile: {
    fontSize: 13,
    marginRight: 8,
  },
  priceVariationMobile: {
    fontSize: 13,
    marginRight: 8,
  },
  lastTradePriceMobile: {
    fontSize: 14,
    marginRight: 12,
    order: 2,
  },
  subPriceMobile: {
    order: 1,
  },
  fullWidth: {
    width: "100%",
  },
  removeFavoriteMobile: {
    marginRight: 5,
  },
  deleteIcon: {
    width: 26,
    height: 26,
  },
}));

const MobileWatchlistItem = React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <Link onClick={props.onClick}>
      <Grid container className={classes.containerMobile}>
        <Grid item className={classes.fullWidth}>
          <Grid container className={classes.boxMobile}>
            <Grid item>
              <Grid container>
                <Grid item className={classes.titleMobile}>
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
            <Grid item>
              <Grid container>
                <Grid item className={classes.lastTradePriceMobile}>
                  <div ref={ref.lastTradePrice}></div>
                </Grid>
                <Grid item className={classes.subPriceMobile}>
                  <Grid container>
                    <Grid item className={classes.pricePercentageMobile}>
                      <div ref={ref.priceVariationPercentage}></div>
                    </Grid>
                    <Grid item className={classes.priceVariationMobile}>
                      <div ref={ref.priceVariation}></div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {props.userDefinedWatchlist && (
            <Grid item className={classes.removeFavoriteMobile}>
              <Link onClick={props.onDelete}>
                <DeleteIcon className={classes.deleteIcon} />
              </Link>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Link>
  );
});

export default MobileWatchlistItem;
