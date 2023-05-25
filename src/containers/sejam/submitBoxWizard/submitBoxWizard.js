import React, { useContext } from "react";
import AppContext from "../../../services/appContext";

import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowIcon from "../../../../src/components/UI/icons/arrow";
import clsx from "clsx";

import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.paper,
    padding: "20px 30px",
  },
  header: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    color: theme.palette.color.blue,
    border: `1px solid ${theme.palette.color.blue}`,
    fontSize: 12,
    "&:hover $previousIcon": {
      transform: "translateX(-4px)",
    },
    "&:hover $nextIcon": {
      transform: "translateX(-4px)",
    },
  },
  icon: {
    width: 16,
    height: 16,
  },
  previousIcon: {
    fill: theme.palette.text.secondary,
  },
  nextIcon: {
    fill: theme.palette.primary.main,
  },
  endIcon: {
    margin: 0,
    marginRight: 10,
  },
  startIcon: {
    margin: 0,
    marginLeft: 10,
    transform: "rotate(180deg)",
  },
  previousButton: {
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.text.secondary}`,
  },
}));

const SubmitBoxWizard = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Button
          variant="submit"
          color="primary"
          href={props.previousWizard}
          className={clsx(classes.button, classes.previousButton)}
          classes={{ startIcon: classes.startIcon }}
          startIcon={
            <ArrowIcon className={clsx(classes.icon, classes.previousIcon)} />
          }
        >
          مرحله قبل
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="submit"
          color="primary"
          className={classes.button}
          classes={{ endIcon: classes.endIcon }}
          endIcon={
            <ArrowIcon className={clsx(classes.icon, classes.nextIcon)} />
          }
          onClick={props.nextWizard}
        >
          مرحله بعد
        </Button>
      </Grid>
    </Grid>
  );
};
export default SubmitBoxWizard;
