import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {},
  gridItems: {
    padding: "0 5px",
  },
  gridItem: {
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    // margin: "0 8px",
    display: "flex",
    minHeight: 36,
  },
  gridTh: {
    flexDirection: "column",
    textAlign: "right",
    width: "40%",
    margin: "auto 0",
    color: theme.palette.text.secondary,
  },
  gridTd: {
    flexDirection: "column",
    textAlign: "right",
    margin: "auto 0",
  },
}));
const HorizontalTable = (props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      {props.schema.columns.map((col) => (
        <Grid item className={classes.gridItems} sm={6}>
          <Grid container className={classes.gridItem}>
            <Grid item className={classes.gridTh}>
              {col.title}
            </Grid>
            <Grid item className={classes.gridTd}>
              {col.title}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default HorizontalTable;
