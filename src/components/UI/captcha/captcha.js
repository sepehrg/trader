import React from "react";
import ReloadIcon from "../../UI/icons/reload";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "../../UI/Link/Link";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
  },
  main: {
    display: "flex",
  },
  captchaReload: {
    width: 20,
    fill: "#999",
    marginRight: theme.spacing(5),
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
  reload: {
    margin: "auto 0px",
  },
}));

const Captcha = (props) => {
  const classes = useStyles();
  const device = useDevice();

  return (
    <Grid container className={classes.root}>
      {device.isNotMobile && (
        <Grid item className={classes.reload}>
          <Link onClick={props.onReload}>
            <ReloadIcon className={classes.captchaReload}></ReloadIcon>
          </Link>
        </Grid>
      )}
      <Grid item className={classes.main}>
        <img
          className={props.className}
          src={
            process.env.REACT_APP_API_URL +
            "/Account/GetCaptcha?clientId=" +
            props.clientId
          }
          alt=""
        />
      </Grid>
    </Grid>
  );
};

export default Captcha;
