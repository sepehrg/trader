import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  finalPrice: {
    margin: "auto",
    fontSize: 11,
    color: theme.palette.text.primary,
    justifyContent: "space-between",
    minWidth: 180,
    textAlign: "center",
    flexDirection: "row",
    borderBottom: `1px solid ${theme.palette.border.bar}`,
    height: 28,
    alignItems: "center",
    padding: "0 5px",
  },
  finalPriceText: {
    marginBottom: theme.spacing(2),
    textAlign: "right",
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  fP: {
    justifyContent: "center",
  },
  fPNum: {
    color: theme.palette.text.primary,
    fontSize: 12,
    margin: "auto 7px",
  },
  fPPercent: {
    fontSize: 12,
    margin: "auto 2px",
  },
  fPDifference: {
    margin: "auto 2px",
    fontSize: 14,
    fontWeight: 100,
  },
}));

const MobileClosingPriceInfo = React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.finalPrice}>
      <Grid item className={classes.finalPriceText}>
        قیمت پایانی
      </Grid>
      <Grid item>
        <Grid container className={classes.fP}>
          {props.instrument ? (
            <>
              <Grid item className={classes.fPPercent}>
                <div ref={ref.priceVariationPercentageRef}></div>
              </Grid>
              <Grid item className={classes.fPNum}>
                <div ref={ref.priceVariationRef}></div>
              </Grid>
              <Grid item className={classes.fPDifference}>
                <div ref={ref.priceRef}></div>
              </Grid>
            </>
          ) : (
            <Skeleton animation="wave" variant="text" height={25} width={120} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
});

export default MobileClosingPriceInfo;
