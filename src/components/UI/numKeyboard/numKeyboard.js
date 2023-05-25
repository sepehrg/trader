import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../UI/Button/Button";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  btn: {
    height: 38,
    backgroundColor: theme.palette.border.bar,
    borderRadius: 8,
    boxShadow: "none",
    color: theme.palette.text.secondary,
    minWidth: "auto",
    "&:hover": {
      backgroundColor: theme.palette.border.bar,
      boxShadow: "none",
    },
  },
}));

const NumKeyboard = (props) => {
  const classes = useStyles();
  const buttons = "1 2 3 4 5 ⌫ 6 7 8 9 0 بستن";

  return (
    <Grid container spacing={2}>
      {[...Array(buttons.split(" ").length).keys()].map((i) => (
        <Grid item xs={2} key={i}>
          <Button
            fullWidth={true}
            onClick={() => {
              console.log(buttons.split(" ")[i]);
            }}
            className={clsx(classes.btn)}
          >
            {buttons.split(" ")[i]}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default NumKeyboard;
