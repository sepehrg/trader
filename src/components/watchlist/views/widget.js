import React, { useState } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import WatchlistItem from "../watchlistItem/watchlistItem";
import style from "../../../shared/style";
import Skeleton from "@material-ui/lab/Skeleton";
import OpenFolderIcon from "../../UI/icons/openFolder";
import WatchListIcon from "../../UI/icons/watchList";
import Link from "../../UI/Link/Link";
import GridViewIcon from "../../UI/icons/gridView";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: theme.palette.background.box,
  },
  main: {
    flexDirection: "column",
    padding: "0 5px",
    direction: "ltr",
    height: "100%",
    overflow: "hidden scroll",
  },
  top: {
    padding: "5px 5px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: theme.palette.background.box,
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    padding: "0px 5px 5px 5px",
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

const WidgetWatchlist = (props) => {
  const classes = useStyles();

  const [listView, setListView] = useState(true);

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.top}>
        <Grid container className={classes.title}>
          <Grid item className={classes.watchListBtn}>
            <Link
              onClick={() => props.setHotListOpen(true)}
              className={classes.link}
            >
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
              <Link
                tooltipPlacement="bottom"
                title="تغییر حالت"
                onClick={() => setListView(!listView)}
                className={classes.link}
                component={<GridViewIcon className={classes.icon} />}
              ></Link>
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

export default WidgetWatchlist;
