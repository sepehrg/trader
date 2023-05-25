import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import Favorites from "../../favorites/favorites";
import HotList from "../../../hotList/hotList";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 55,
    height: 55,
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
  priceInfoMobile: {
    flexDirection: "column",
  },
  avatarRow: {
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px !important",
    color: theme.palette.text.secondary,
    position: "relative",
  },
  persianCodeRow: {
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.bar}`,
    padding: "5px 10px",
    borderRadius: 8,
    height: 45,
    alignItems: "center",
  },
  avatarItemMobile: {
    position: "absolute",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    top: 0,
    right: "43%",
  },
  avatarLeftMobile: {
    alignItems: "center",
    flexWrap: "nowrap",
  },
}));

const MobilePriceInfo = React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.priceInfoMobile}>
      <Grid item>
        <Grid container className={classes.avatarRow}>
          <Grid item>
            <Typography variant="subtitle2" className={classes.companyTitle}>
              {props.instrument ? (
                props.instrument.Title
              ) : (
                <Skeleton animation="wave" variant="text" width={50} />
              )}
            </Typography>
          </Grid>
          <Grid item className={classes.avatarItemMobile}>
            {props.instrument ? (
              <Avatar
                src={"data:image/png;base64, " + props.instrument.Picture}
                className={classes.avatar}
              />
            ) : (
              <Skeleton
                animation="wave"
                variant="circle"
                width={55}
                height={55}
              />
            )}
          </Grid>
          <Grid item>
            <Grid container className={classes.avatarLeftMobile} spacing={2}>
              <Grid item>{props.instrument?.ExchangeTitle}</Grid>
              <Grid item>
                <Favorites
                  isin={props.instrument?.Isin}
                  className={classes.contentBtn}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.persianCodeRow}>
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
            {props.instrument ? (
              <Grid container spacing={3} className={classes.priceContainer}>
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
          <HotList hotListOpen={false} setHotListOpen={() => {}} />
        </Grid>
      </Grid>
    </Grid>
  );
});

export default MobilePriceInfo;
