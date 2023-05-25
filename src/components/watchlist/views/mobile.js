import React from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import WatchlistItem from "../watchlistItem/watchlistItem";
import style from "../../../shared/style";
import Skeleton from "@material-ui/lab/Skeleton";
import OpenFolderIcon from "../../UI/icons/openFolder";
import WatchListIcon from "../../UI/icons/watchList";
import Link from "../../UI/Link/Link";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
  },
  main: {
    flexDirection: "column",
    padding: 10,
    direction: "ltr",
    height: "100%",
    overflow: "hidden scroll",
  },
  top: {
    padding: "30px 13px",
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  watchlistContainer: {
    height: "100%",
    flexFlow: "column nowrap",
    direction: "rtl",
  },
  emptyWatchList: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: 14,
  },
  openFolderIcon: {
    height: 42,
    width: 42,
  },
  headerMobile: {
    height: 42,
  },
  headerContainerMobile: {
    backgroundColor: theme.palette.background.box,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    padding: "0px 10px",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hotListBtnMobile: {
    alignItems: "center",
    display: "flex",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
    fontSize: 12,
  },
}));

const MobileWatchlist = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.headerMobile}>
        <Grid container className={classes.headerContainerMobile} spacing={6}>
          <Grid item className={classes.hotListBtnMobile}>
            <Link onClick={() => props.setHotListOpen(true)}>
              <Grid container className={classes.hotListBtnMobile} spacing={2}>
                <Grid item>
                  <WatchListIcon />
                </Grid>
                <Grid item className={classes.hotListBtnMobile}>
                  لیست
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={() => props.setHotListOpen(true)}>
              {props.title}
            </Link>
          </Grid>
          <Grid item></Grid>
          <Grid item></Grid>
        </Grid>
      </Grid>
      <Grid item className={clsx(classes.scrollbarY, classes.main)}>
        <Grid container className={classes.watchlistContainer}>
          {props.instruments ? (
            props.instruments.length !== 0 ? (
              props.instruments.map((ins) => {
                return (
                  <WatchlistItem
                    key={ins.InstrumentId}
                    instrument={ins}
                    onClick={() => props.onClick(ins)}
                    onDelete={() => props.onDelete(ins.Id)}
                  ></WatchlistItem>
                );
              })
            ) : (
              <div className={classes.emptyWatchList}>
                <OpenFolderIcon className={classes.openFolderIcon} />
                <div>لیست خالی می‌باشد</div>
              </div>
            )
          ) : (
            [...Array(10).keys()].map((i) => (
              <Skeleton key={i} animation="wave" variant="text" height={100} />
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MobileWatchlist;
