import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Search from "../../search/search";
import Watchlist from "../../watchlist/watchlist";
import HotList from "../../hotList/hotList";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import LineIcon from "../../UI/icons/line";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: theme.palette.background.box,
    borderLeft: `2px solid ${theme.palette.border.primary}`,
    flexDirection: "column",
    position: "relative",
    transition: "max-width 1.5s, min-width 1.5s",
  },
  main: {
    height: "100%",
  },
  collapseBtn: {
    position: "absolute",
    bottom: "7%",
    backgroundColor: theme.palette.background.box,
    border: `2px solid ${theme.palette.border.primary}`,
    zIndex: "100",
    borderRadius: 6,
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover $icon": {
      stroke: theme.palette.primary.main,
    },
  },
  collapseWatchListBtn: {
    left: -6,
  },
  collapseBorder: {
    position: "absolute",
    bottom: 0,
    cursor: "grab",
    height: "100%",
    width: 8,
    transition: "0.3s",
  },
  collapseBorderWatchList: {
    left: 0,
    "&:hover": {
      boxShadow: `inset 3px 0px 6px -3px ${theme.palette.primary.main}`,
    },
  },
  icon: {
    width: 9,
    height: 30,
    stroke: theme.palette.text.primary,
    strokeWidth: 15,
    paddingLeft: 4,
    verticalAlign: "middle",
    padding: `${theme.spacing(3)}px 0px`,
    fill: "none",
  },
  collapsedWatchList: {
    maxWidth: 25,
    minWidth: 25,
  },
  expandedWatchList: {
    maxWidth: "15%",
    minWidth: 220,
  },
  expandedWatchListContent: {
    opacity: "1",
    transition: "0.3s",
    transitionDelay: "1s",
  },
  collapsedWatchListContent: {
    opacity: "0",
    transition: "0.3s",
    transitionDelay: "0.0s",
    visibility: "hidden",
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      position: "absolute",
      right: 120,
      zIndex: 2,
    },
  },
}));

const DefaultWatchlistPane = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={clsx(
        classes.root,
        props.expand ? classes.expandedWatchList : classes.collapsedWatchList
      )}
    >
      <Grid
        item
        className={clsx(
          classes.main,
          props.expand
            ? classes.expandedWatchListContent
            : classes.collapsedWatchListContent
        )}
      >
        <Watchlist
          title={props.title}
          setSearchOpen={props.setSearchOpen}
          setHotListOpen={props.setHotListOpen}
        ></Watchlist>
        <Search
          label="جستجوی نماد"
          searchOpen={props.searchOpen}
          setSearchOpen={props.setSearchOpen}
        ></Search>
        <HotList
          hotListOpen={props.hotListOpen}
          setHotListOpen={props.setHotListOpen}
        ></HotList>
      </Grid>
      <Grid
        item
        className={clsx(
          classes.collapseBorder,
          classes.collapseBorderWatchList
        )}
        onClick={props.toggleCollapse}
      ></Grid>
      <Grid
        item
        className={clsx(classes.collapseBtn, classes.collapseWatchListBtn)}
        onClick={props.toggleCollapse}
      >
        <LineIcon className={classes.icon}></LineIcon>
      </Grid>
    </Grid>
  );
};

export default DefaultWatchlistPane;
