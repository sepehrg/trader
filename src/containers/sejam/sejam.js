import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import stepLevel from "../../enums/step";

import AppContext from "../../services/appContext";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "../../../src/components/UI/Link/Link";

import SubmitBoxWizard from "./submitBoxWizard/submitBoxWizard";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import WarningIcon from "../../../src/components/UI/icons/warning";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
  },
  header: {
    width: "100%",
  },
  sejamSection: {
    // textAlign: "center",
    // backgroundColor: "#FFF7EB",
    // padding: "30px 0",
    // borderRadius: "15px",
    // margin: "0 150px",
    // border: " 1px solid #F9E1BC",
  },
  paySejam: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "20px",
    textDecoration: "none",
    color: "#fff",
    borderRadius: " 10px",
    backgroundColor: "#596739",
    padding: "8px 75px",
    transition: "0.3s",
    width: "40%",
    "&:hover $a": {
      backgroundColor: "#4a5433",
    },
  },
  h: {
    color: " #f92323",
    textAlign: "center",
  },
  aPaySejam: {
    marginTop: theme.spacing(20),
    textAlign: "center",
  },
  p: {
    marginTop: theme.spacing(8),
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
  main: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: 5,
    width: "100%",
  },
  header: {
    width: "100%",
    margin: 20,
    fontSize: 14,
  },
  form: {
    padding: "20px 30px",
  },
  notice: {
    flexDirection: "column",
    alignItems: "center",
  },
  noticeIcon: {
    height: 56,
    width: 56,
  },
  noticeText: {
    fontSize: 16,
  },
  pay: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    borderRadius: 4,
    backgroundColor: theme.palette.color.blue,
    width: 162,
    height: 38,
    alignItems: "center",
    padding: 5,
    fontSize: 14,
    display: "flex",
    justifyContent: "center",
  },
  buttonTag: {
    color: "#FFFFFF",
    textDecoration: "none",
  },
  submit: {
    justifyContent: "flex-end",
    backgroundColor: theme.palette.background.paper,
    padding: "20px 30px",
  },
}));

const Sejam = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const nextWizard = () => {
    window.location.pathname = stepLevel.finalReview.url;
  };
  useEffect(() => {
    dispatch({
      type: "stepWizard",
      payload: stepLevel.sejam.id,
    });
  }, []);

  return (
    <Grid container>
      <Grid item className={classes.header}>
        سجام
      </Grid>
      <Grid item className={classes.main}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              {/* <Card className={classes.root}>
              <CardContent> */}
              <Grid container className={classes.form} spacing={10}>
                <Grid item xs={12}>
                  <Grid container className={classes.notice} spacing={6}>
                    <Grid item>
                      <WarningIcon className={classes.noticeIcon} />
                    </Grid>
                    <Grid item className={classes.noticeText}>
                      هزینه ثبت نام در سجام مبلغ 100،000 ریال می باشد
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container className={classes.pay} spacing={6}>
                    <Grid item>
                      <Link onClick={() => {}} className={classes.button}>
                        <a
                          href="#"
                          target="_blank"
                          className={classes.buttonTag}
                        >
                          پرداخت
                        </a>
                      </Link>
                    </Grid>
                    <Grid item>
                      برای ثبت نام در سجام باید به مرحله بعدی بروید
                    </Grid>
                  </Grid>
                  {/* <div className={classes.aPaySejam}>
                    <a href="#" className={classes.paySejam}>
                      پرداخت
                    </a>
                  </div> */}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <SubmitBoxWizard
                previousWizard="/main/sejam/financial"
                nextWizard={nextWizard}
              />
            </Grid>
            {/* </CardContent>
            </Card> */}
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Sejam;
