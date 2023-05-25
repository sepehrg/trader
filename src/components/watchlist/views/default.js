import React, { useState } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import WatchlistItem from "../watchlistItem/watchlistItem";
import SearchIcon from "../../UI/icons/search";
import Link from "../../UI/Link/Link";
import style from "../../../shared/style";
import Skeleton from "@material-ui/lab/Skeleton";
import OpenFolderIcon from "../../UI/icons/openFolder";
import GridViewIcon from "../../UI/icons/gridView";
import MoreIcon from "../../UI/icons/more";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    height: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  top: {
    padding: "22px 13px 15px 13px",
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  link: {
    padding: "0 2px",
    "&:hover $icon": {
      fill: theme.palette.primary.main,
    },
  },
  icon: {},
  moreIcon: {
    transform: "rotate(-90deg)",
    width: 16,
    height: 16,
  },
  main: {
    flexDirection: "column",
    overflowX: "hidden",
    padding: 10,
    direction: "ltr",
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

  watchListBtn: {
    display: "flex",
    alignItems: "center",
  },
  actions: {
    flexWrap: "nowrap",
  },
}));

const DefaultWatchlist = (props) => {
  const classes = useStyles();

  const [listView, setListView] = useState(false);

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.top}>
        <Grid container className={classes.title}>
          <Grid item className={classes.watchListBtn} data-tour="hotList">
            <Link
              tooltipPlacement="bottom"
              title="دیده بان ها"
              onClick={() => props.setHotListOpen(true)}
              className={classes.link}
            >
              <MoreIcon className={clsx(classes.icon, classes.moreIcon)} />
              {props.title ? (
                props.title
              ) : (
                <Skeleton
                  animation="wave"
                  variant="text"
                  height={25}
                  width={50}
                />
              )}
            </Link>
          </Grid>
          <Grid item>
            <Grid container className={classes.actions}>
              <Grid item data-tour="listView">
                <Link
                  tooltipPlacement="bottom"
                  title="تغییر حالت"
                  onClick={() => setListView(!listView)}
                  className={classes.link}
                  component={<GridViewIcon className={classes.icon} />}
                ></Link>
              </Grid>
              <Grid item data-tour="searchButton">
                <Link
                  tooltipPlacement="bottom"
                  title="جستجوی نماد"
                  onClick={() => props.setSearchOpen(true)}
                  className={classes.link}
                  component={<SearchIcon className={classes.icon} />}
                ></Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={clsx(classes.main, classes.scrollbarY)}>
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
                    listView={listView}
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

export default DefaultWatchlist;
