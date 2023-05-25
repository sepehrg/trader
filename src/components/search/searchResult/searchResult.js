import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "../../UI/Link/Link";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "11px 0",
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
  result: {
    flexWrap: "nowrap",
  },
  instrument: {},
  title: {},
  subtitle: {
    fontSize: 11,
    color: theme.palette.text.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginRight: 10,
  },
  resultMobile: {
    height: 38,
    alignItems: "center",
    fontSize: 16,
  },
  subtitleMobile: {
    fontSize: 12,
  },
}));

const WatchlistItem = (props) => {
  const classes = useStyles();
  const device = useDevice();

  return (
    <Link onClick={props.onClick}>
      <Grid item className={classes.root}>
        <Grid
          container
          className={clsx(
            classes.result,
            device.isMobile && classes.resultMobile
          )}
        >
          <Grid item className={classes.instrument}>
            {props.persianCode}
          </Grid>
          <Grid item className={classes.title}>
            <Typography
              variant="subtitle2"
              className={clsx(
                classes.subtitle,
                device.isMobile && classes.subtitleMobile
              )}
            >
              {props.title}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
};

export default WatchlistItem;
