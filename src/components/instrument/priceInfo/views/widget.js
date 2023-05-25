import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import Favorites from "../../favorites/favorites";
import HotList from "../../../hotList/hotList";
import Link from "../../../UI/Link/Link";
import BuyIcon from "../../../UI/icons/buy";
import SellIcon from "../../../UI/icons/sell";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 50,
    alignItems: "center",
    marginBottom: 5,
  },
  instrument: {
    alignItems: "center",
  },
  avatar: {
    width: 35,
    height: 35,
  },
  persianCode: {
    fontSize: "16px",
  },
  companyTitle: {
    fontSize: "11px",
    color: theme.palette.text.secondary,
  },
  priceContainer: {
    alignItems: "center",
    flexWrap: "nowrap",
  },
  percent: {
    fontSize: "13px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
  },

  avatarRow: {
    alignItems: "center",
    fontSize: "12px !important",
    color: theme.palette.text.secondary,
    position: "relative",
  },
  btnBuySell: {
    display: "flex",
    marginRight: 10,
  },
}));

const WidgetPriceInfo = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Grid container spacing={4} className={classes.instrument}>
          <Grid item>
            {props.instrument ? (
              <Avatar
                src={"data:image/png;base64, " + props.instrument.Picture}
                className={classes.avatar}
              />
            ) : (
              <Skeleton
                animation="wave"
                variant="circle"
                width={35}
                height={35}
              />
            )}
          </Grid>
          <Grid item>
            <Typography variant="h4" className={classes.persianCode}>
              {props.instrument ? (
                props.instrument.PersianCode
              ) : (
                <Skeleton animation="wave" variant="text" width={40} />
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" className={classes.companyTitle}>
              {props.instrument ? (
                props.instrument.Title
              ) : (
                <Skeleton animation="wave" variant="text" width={50} />
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={3} className={classes.priceContainer}>
          {props.instrument ? (
            <>
              <Grid item>
                <Typography variant="subtitle2" className={classes.percent}>
                  <div ref={ref.priceVariationPercentage}></div>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" className={classes.percent}>
                  <div ref={ref.priceVariation}></div>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" className={classes.price}>
                  <div ref={ref.lastTradePrice}></div>
                </Typography>
              </Grid>
            </>
          ) : (
            <Skeleton animation="wave" variant="text" height={25} width={120} />
          )}
          <Grid item className={classes.btnBuySell}>
            <Link
              ref={ref.buyRef}
              tooltipPlacement="left"
              title="سفارش خرید"
              onClick={props.onTradeModalBuyOpen}
              tooltipColor={theme.palette.color.blue}
              className={classes.box}
            >
              <BuyIcon className={classes.buyBtn}></BuyIcon>
            </Link>
            <Link
              ref={ref.sellRef}
              tooltipPlacement="left"
              title="سفارش فروش"
              onClick={props.onTradeModalSellOpen}
              tooltipColor={theme.palette.color.red}
              className={classes.box}
            >
              <SellIcon className={classes.sellBtn}></SellIcon>
            </Link>
          </Grid>
          <Grid item>
            <Favorites
              isin={props.instrument?.Isin}
              className={classes.contentBtn}
            />
          </Grid>
        </Grid>

        <HotList hotListOpen={false} setHotListOpen={() => {}} />
      </Grid>
    </Grid>
  );
});

export default WidgetPriceInfo;
