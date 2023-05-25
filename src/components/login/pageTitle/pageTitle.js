import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import SlideTransition from "../../UI/transition/slide";
import useDevice from "../../../hooks/useDevice";
import LogoDanayanTraderIcon from "../../UI/icons/logoDanayanTrader";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  title: {
    flexDirection: "column",
    textAlign: "right",
    marginLeft: "auto",
    marginRight: 7,
    position: "relative",
    marginBottom: 10,
  },
  titleListItemIcon: {
    width: 12,
    height: 42,
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    top: 0,
    right: -15,
    borderRadius: 4,
  },
  formTilte: {
    fontSize: 30,
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  formSubtitle: {
    fontSize: 13,
  },

  headerMobile: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
  },
  headerLogoMobile: {
    height: 78,
    width: 68,
    marginTop: -40,
    strokeWidth: 6,
  },
  headerTitleMobile: {
    color: theme.palette.primary.main,
    fontSize: 24,
    fontWeight: "600",
  },
  headerSubTitleMobile: {
    color: theme.palette.text.secondary,
    fontSize: 14,
  },
}));

const PageTitle = (props) => {
  const classes = useStyles();
  const device = useDevice();

  return (
    <SlideTransition direction="left" timeout={2000}>
      <Grid
        container
        className={clsx(device.isMobile ? classes.headerMobile : classes.title)}
      >
        {device.isMobile ? (
          <Grid item>
            <LogoDanayanTraderIcon className={classes.headerLogoMobile} />
          </Grid>
        ) : (
          <Grid item className={classes.titleListItemIcon}></Grid>
        )}
        <Grid
          item
          className={
            device.isNotMobile ? classes.formTilte : classes.headerTitleMobile
          }
        >
          {props.title}
        </Grid>
        <Grid
          item
          className={
            device.isNotMobile
              ? classes.formSubtitle
              : classes.headerSubTitleMobile
          }
        >
          {props.subtitle}
        </Grid>
      </Grid>
    </SlideTransition>
  );
};

export default withWidth()(PageTitle);
