import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CmdTseService from "../../services/cmdTseService";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: "5px",
    padding: 10,
    flexDirection: "column",

    height: "100%",
  },
  title: {
    color: theme.palette.text.secondary,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: 12,
    margin: 10,
  },
  items: {
    width: "100%",
    flex: 1,
    height: 200,
  },
  gridRow: {
    width: "100%",
  },
  gridItem: {
    justifyContent: "space-between",
    backgroundColor: `${theme.palette.border.bar}99`,
    height: 24,
    alignItems: "center",
    padding: "0 5px",
  },
  gridbar: {
    width: "100%",
  },
  barItem: {
    backgroundColor: `${theme.palette.border.bar}99`,
    height: 24,
    alignItems: "center",
  },
  bar: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  barRight: {
    height: "100%",
  },
  barLeft: {
    height: "100%",
  },
  zeroAndTwo: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    height: "100%",
    width: "20%",
    backgroundColor: `${theme.palette.text.primary}66`,
  },
  moreThanTwo: {
    position: "absolute",
    left: 0,
    height: "100%",
    width: "60%",
    backgroundColor: `${theme.palette.color.green}`,
  },
  zeroAndMinesTwo: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: "50%",
    backgroundColor: `${theme.palette.text.primary}66`,
  },
  LessThanMinesTwo: {
    position: "absolute",
    height: "100%",
    width: "80%",
    backgroundColor: `${theme.palette.color.red}`,
  },
}));

const IndustrieSummary = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const [sectors, setSectors] = useState([]);

  let isSubscribed = true;

  useEffect(() => {
    getSectorsSummary();
    return () => (isSubscribed = false);
  }, []);

  const getSectorsSummary = () => {
    CmdTseService.getSectorsSummary((status, data) => {
      if (data.Result && isSubscribed) {
        setSectors(data.Result);
      }
    });
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.title}>
        خلاصه صنایع
      </Grid>
      <Grid item className={classes.items}>
        <Grid container spacing={1}>
          <Grid item sm={5}>
            <Grid container spacing={2}>
              {sectors.map((data, i) => (
                <Grid item className={classes.gridRow} key={i}>
                  <Grid container className={classes.gridItem}>
                    <Grid item>{data.SectorTitle}</Grid>
                    <Grid item>{data.TotalTradeValue}</Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item sm={7}>
            <Grid container spacing={2}>
              {[...Array(6).keys()].map((i) => (
                <Grid item className={classes.gridbar}>
                  <Grid container className={classes.barItem}>
                    <Grid
                      item
                      sm={6}
                      className={clsx(classes.bar, classes.barRight)}
                    >
                      <div className={classes.zeroAndTwo} />
                      <div className={classes.moreThanTwo} />
                    </Grid>
                    <Grid
                      item
                      sm={6}
                      className={clsx(classes.bar, classes.barLeft)}
                    >
                      <div className={classes.zeroAndMinesTwo} />
                      <div className={classes.LessThanMinesTwo} />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(IndustrieSummary);
