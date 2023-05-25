import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import stepLevel from "../../../../enums/step";
import CheckInfo from "../../../../containers/sejam/checkInfo";
import ProfileInfo from "../../../sejam/profileInfo";
import StepWizard from "../../stepWizard/stepWizard";
import AddressInfo from "../../../sejam/addressInfo";
import JobInfo from "../../../sejam/jobInfo";
import BankInfo from "../../../sejam/bankInfo";
import FinancialInfo from "../../../sejam/financialInfo";
import Sejam from "../../../sejam/sejam";
import FinalReview from "../../../sejam/finalReview";
import AddInSejam from "../../../sejam/addInSejam";
import FinalRegister from "../../../sejam/finalRegister";
import SejamIcon from "../../../../../src/components/UI/icons/sejam";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10%",
  },
  header: {
    width: "100%",
    // textAlign: "center"
  },
  fullHeight: {
    height: "100%",
  },
  main: {
    height: "calc(100% - 40px)",
  },
}));

const Main = () => {
  const classes = useStyles();

  return (
    <Grid container className={clsx(classes.root, classes.fullHeight)}>
      <Grid item className={clsx(classes.header, classes.fullHeight)}>
        <div className={classes.fullHeight}>
          <div className={classes.fullHeight}>
            <h2 className="title">
              <SejamIcon />
              ثبت نام در سامانه سجام و کارگزاری
            </h2>
            <div className={classes.main}>
              <StepWizard />
              <Switch>
                {/* <Redirect exact from="/main" to="/main/sejam/checkInfo" /> */}
                <Route
                  exact
                  path={stepLevel.checkInfo.url}
                  component={CheckInfo}
                />
                <Route
                  exact
                  path={stepLevel.profile.url}
                  component={ProfileInfo}
                />
                <Route
                  exact
                  path={stepLevel.address.url}
                  component={AddressInfo}
                />
                <Route exact path={stepLevel.job.url} component={JobInfo} />
                <Route exact path={stepLevel.bank.url} component={BankInfo} />
                <Route
                  exact
                  path={stepLevel.financial.url}
                  component={FinancialInfo}
                />
                <Route exact path={stepLevel.sejam.url} component={Sejam} />
                <Route
                  exact
                  path={stepLevel.finalReview.url}
                  component={FinalReview}
                />
                <Route
                  exact
                  path={stepLevel.addInSejam.url}
                  component={AddInSejam}
                />
                <Route
                  exact
                  path={stepLevel.finalRegister.url}
                  component={FinalRegister}
                />
                {/*  <Route
              exact
              path="/main/representative"
              component={RepresentativeInfo}
            />
            <Route exact path="/main/sejam" component={Sejam} /> */}
              </Switch>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Main;
