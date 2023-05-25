import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import InstrumentStateIcon from "../../../instrumentStateIcon/instrumentStateIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    position: "relative",
    padding: "5px 5px 0 0",
    flexWrap: "nowrap",
    "&:after": {
      content: '""',
      position: "absolute",
      top: 3,
      right: "-100%",
      bottom: 0,
      zIndex: 1,
      transform: "perspective(10px) rotateX(2deg) scaleX(-1)",
      transformOrigin: "left center 0",
      borderRadius: "8px 10px 0 0",
      backgroundColor: theme.palette.background.box,
      border: `1px solid ${theme.palette.border.secondary}`,
      borderBottom: "none",
      width: "100%",
      height: 37,
    },
  },
  avatar: {
    width: 40,
    height: 40,
  },
  title: {
    flexDirection: "column",
  },
  persianCode: {
    fontSize: "16px",
  },
  companyTitle: {
    fontSize: "11px",
    color: theme.palette.text.secondary,
  },
  priceItem: {
    display: "flex",
    zIndex: 2,
  },
  priceContainer: {
    alignItems: "center",
    flexWrap: "nowrap",
    marginLeft: 20,
  },
  percent: {
    fontSize: "13px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  avatarItem: {
    zIndex: 2,
  },
  titleItem: {
    zIndex: 2,
    display: "flex",
    alignItems: "center",
  },
}));

const DefaultPriceInfo = React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item className={classes.avatarItem}>
        {props.instrument ? (
          <Avatar
            src={"data:image/png;base64, " + props.instrument.Picture}
            className={classes.avatar}
          />
        ) : (
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        )}
      </Grid>
      <Grid item className={classes.titleItem}>
        <Grid container className={classes.title} spacing={2}>
          <Grid item>
            <Grid container>
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
                {props.instrument && (
                  <InstrumentStateIcon
                    instrument={props.instrument}
                  ></InstrumentStateIcon>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.priceItem}>
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
          <Skeleton animation="wave" variant="text" height={25} width={120} />
        )}
      </Grid>
    </Grid>
  );
});

export default DefaultPriceInfo;
