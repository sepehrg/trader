import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import style from "../../shared/style";
import clsx from "clsx";
import LineIcon from "../UI/icons/line";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import PropertyAmount from "../propertyAmount/propertyAmount";
import ObserverMessage from "../observerMessage/observerMessage";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  collapsedSide: {
    maxWidth: 25,
    minWidth: 25,
  },
  expandedSide: {
    maxWidth: (props) => (!props.widget ? "20%" : "100%"),
    minWidth: 210,
  },
  expandedSideContent: {
    opacity: "1",
    // transition: "0.3s",
    transitionDelay: "1s",
  },
  collapsedSideContent: {
    opacity: "0",
    // transition: "0.3s",
    transitionDelay: "0.0s",
  },
  side: {
    height: "100%",
    borderRight: (props) =>
      !props.widget ? `2px solid ${theme.palette.border.primary}` : "none",
    position: "relative",
    transition: "max-width 1.5s, min-width 1.5s",
    backgroundColor: (props) =>
      !props.widget ? theme.palette.background.default : "none",
  },
  sideInner: {
    height: "100%",
    // padding: (props) => (!props.widget ? theme.spacing(4) : 0),
    justifyContent: "space-between",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  observerMessage: {
    height: "100%",
    overflowY: "auto",
    padding: 5,
  },
  collapseSideBtn: {
    right: -7,
  },
  collapseBorder: {
    position: "absolute",
    bottom: 0,
    cursor: "grab",
    height: "100%",
    width: 8,
    transition: "0.3s",
  },
  collapseBorderSide: {
    right: -1,
    "&:hover": {
      boxShadow: `inset -3px 0px 6px -3px ${theme.palette.primary.main}`,
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
  [theme.breakpoints.down("md")]: {
    side: {
      position: "absolute",
      left: 0,
      zIndex: 3,
    },
  },
}));

const SideBar = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();

  const [expand, setExpand] = useState(
    window.innerWidth < theme.breakpoints.values.lg ? false : true
  );

  const toggleCollapse = () => {
    setExpand(!expand);
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  };

  useEffect(() => {
    setExpand(isWidthUp("lg", props.width));
  }, [props.width]);

  return (
    <Grid
      item
      className={clsx(
        expand ? classes.expandedSide : classes.collapsedSide,
        classes.side
      )}
    >
      <Grid container className={classes.sideInner}>
        {!props.widget && (
          <Grid
            item
            className={clsx(
              expand
                ? classes.expandedSideContent
                : classes.collapsedSideContent
            )}
            data-tour="propertyAmount"
          >
            <PropertyAmount
              className={clsx(
                expand
                  ? classes.expandedSideContent
                  : classes.collapsedSideContent
              )}
            />
          </Grid>
        )}
        <Grid
          item
          className={clsx(
            expand ? classes.expandedSideContent : classes.collapsedSideContent,
            classes.observerMessage
          )}
          data-tour="observerMessage"
        >
          <ObserverMessage />
        </Grid>
      </Grid>
      <Grid
        item
        className={clsx(classes.collapseBorder, classes.collapseBorderSide)}
        onClick={toggleCollapse}
      ></Grid>
      <Grid
        item
        className={clsx(classes.collapseBtn, classes.collapseSideBtn)}
        onClick={toggleCollapse}
      >
        <LineIcon className={classes.icon}></LineIcon>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    observerMessage: state.app.observerMessage,
  };
};

export default connect(mapStateToProps, null)(withWidth()(SideBar));
