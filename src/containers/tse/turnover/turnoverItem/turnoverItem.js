import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { toJalaliDate, coloredPercent } from "../../../../shared/utility";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    paddingBottom: 10,
  },
  main: {
    flexDirection: "column",
  },
  boxMobile: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.box,
    borderRadius: 8,
    padding: "3px 9px",
    width: "100%",
  },
  states: {
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    minHeight: 38,
    alignItems: "center",
    flexWrap: "nowrap",
  },
  statesRight: {
    alignItems: "center",
    flexWrap: "nowrap",
  },
  statesLeft: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  side: {
    backgroundColor: theme.palette.text.secondary,
    color: "#FFF",
    fontSize: 11,
    borderRadius: "10px 0 0 10px",
    padding: "1px 4px",
    marginRight: -13,
  },
  persianCode: {
    fontSize: 14,
    marginRight: 6,
  },
  orderStatus: {
    fontSize: 11,
    padding: "1px 7px",
    borderRadius: 15,
    marginRight: 6,
  },
  date: {
    color: theme.palette.text.secondary,
    fontSize: 11,
    direction: "ltr",
  },
  prices: {
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 42,
  },
  pricesItem: {
    alignItems: "Center",
    flexWrap: "nowrap",
  },
  digit: {
    fontSize: 16,
    color: theme.palette.text.primary,
  },
  digitTitle: {
    fontSize: 11,
    color: theme.palette.text.secondary,
  },
  moreBtn: {
    display: "flex",
    justifyContent: "Center",
    alignItems: "Center",
    height: 22,
    fontSize: 11,
    color: theme.palette.text.secondary,
  },
  moreIcon: {
    transform: "rotate(-90deg)",
    height: 14,
    width: 14,
    marginRight: 6,
    strokeWidth: 1,
    stroke: theme.palette.icon.primary,
  },
  info: {
    borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  infoInner: {
    padding: "10px 0px",
    flexDirection: "column",
  },
  infoItem: {
    justifyContent: "space-between",
    backgroundColor: `${theme.palette.border.secondary}99`,
    borderRadius: 20,
    padding: "1px 10px",
    minHeight: 24,
    alignItems: "center",
    fontSize: 12,
  },
  infoItemTitle: {
    color: theme.palette.text.secondary,
    fontSize: 11,
  },
  title: {
    fontSize: 12,
    padding: 10,
    textAlign: "right",
  },
}));

const TurnoverItem = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item>
        <Grid container>
          <Grid item className={classes.boxMobile}>
            <Grid container className={classes.main}>
              <Grid item xs={12} className={classes.title}>
                <Grid container>
                  <Grid item>{props.data.Description}</Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.info}>
                <Grid container spacing={2} className={classes.infoInner}>
                  <Grid item>
                    <Grid container className={classes.infoItem}>
                      <Grid item className={classes.infoItemTitle}>
                        بستانکار
                      </Grid>
                      <Grid item>
                        {coloredPercent(props.data.Creditor, theme)}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container className={classes.infoItem}>
                      <Grid item className={classes.infoItemTitle}>
                        بدهکار
                      </Grid>
                      <Grid item>
                        {coloredPercent(props.data.Debtor, theme)}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container className={classes.infoItem}>
                      <Grid item className={classes.infoItemTitle}>
                        مانده
                      </Grid>
                      <Grid item>
                        {coloredPercent(props.data.AccountRemaining, theme)}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>{toJalaliDate(props.data.EntryDate)}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TurnoverItem;
