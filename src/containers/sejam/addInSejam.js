import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Captcha from "../../components/UI/captcha/captcha";
import stepLevel, { getUrlbyStepId } from "../../enums/step";

import AppContext from "../../services/appContext";
import SejamService from "../../services/sejamService";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../store/actions/account";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import * as action from "../../store/actions/index";
const useStyles = makeStyles((theme) => ({
  root: {},

  button: {
    margin: theme.spacing(1),
    width: "-1%",
    backgroundColor: "#1e3746",
    color: "#fff",
    boxShadow: "none",
    height: 42,
    "&:hover": {
      backgroundColor: "#1e3746",
      boxShadow: "none",
    },
  },
  header: {
    width: "100%",
  },
  captcha: {
    width: "100%",
  },
  captchaImage: {
    borderRadius: 10,
    verticalAlign: "middle",
  },
  captchaCode: {
    // justifyContent: "center",
    margin: `${theme.spacing(5)}px 25px`,
    minHeight: 60,
  },
  textField: {
    // backgroundColor: "#fff",
    marginTop: theme.spacing(13),
    width: "100%",
  },
  inputClassName: {
    height: 46,
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
  submit: {
    justifyContent: "flex-end",
    backgroundColor: theme.palette.background.paper,
    padding: "20px 30px",
  },
  button: {
    color: theme.palette.color.blue,
    border: `1px solid ${theme.palette.color.blue}`,
    fontSize: 12,
    "&:hover $nextIcon": {
      transform: "translateX(-4px)",
    },
  },
  form: {
    padding: "20px 30px",
  },
}));

const Sejam = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const [showError, setShowError] = useState("");
  const [verificationOtp, setVerificationOtp] = useState("");
  const [captcha, setCaptcha] = useState(null);
  const unknownError = "خطایی رخ داده است";
  // console.log("state@", state);
  useEffect(() => {
    props.setClientId();
    dispatch({
      type: "stepWizard",
      payload: stepLevel.addInSejam.id,
    });
  }, []);
  const addPersonInfoInSejam = async (e) => {
    e.preventDefault();

    dispatch({
      type: "isLoding",
      payload: true,
    });

    if (!verificationOtp) {
      setShowError(true);
      return;
    }
    await SejamService.sendPersonalInformationToSejam(
      {
        verificationCode: verificationOtp,
        clientId: props.clientId,
        captcha: captcha,
      },
      (success, result) => {
        if (result && result.Success) {
          nextWizard();
        } else {
          props.handleError(
            result && result.Result.ErrorMessage
              ? result.Result.ErrorMessage
              : unknownError
          );
        }
      }
    );

    dispatch({
      type: "isLoding",
      payload: false,
    });
  };

  const nextWizard = () => {
    window.location.pathname = stepLevel.finalRegister.url;
  };
  // console.log("state", state.stepWizard);
  return (
    <Grid container>
      <Grid item className={classes.header}>
        {" "}
        ثبت در سجام
      </Grid>
      <Grid item className={classes.main}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              {/* <Card className={classes.root}>
              <CardContent> */}
              <Grid container spacing={10} className={classes.form}>
                <Grid item xs={4}>
                  <Input
                    name="username"
                    label="کد تایید"
                    className={classes.textField}
                    onChange={(e) => setVerificationOtp(e.target.value)}
                    inputClassName={classes.inputClassName}
                    loginAdornment={classes.loginAdornment}
                    placeholder="کد تایید پیامک شده را وارد نمایید "
                  ></Input>
                </Grid>
                <Grid item className={classes.captcha} xs={4}>
                  <Input
                    name="captcha"
                    label="کد امنیتی"
                    className={classes.textField}
                    onChange={(e) => setCaptcha(e.target.value)}
                    error={captcha === ""}
                    inputClassName={classes.inputClassName}
                  ></Input>
                </Grid>
                <Grid item className={classes.captcha} xs={4}>
                  <Grid container className={classes.captchaCode}>
                    {props.clientId && (
                      <Grid item>
                        {props.clientId && (
                          <Captcha
                            clientId={props.clientId}
                            onReload={props.setClientId}
                            className={classes.captchaImage}
                          ></Captcha>
                        )}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* </CardContent>
            <CardActions> */}
            <Grid item xs={12}>
              <Grid container className={classes.submit}>
                <Grid item>
                  <Button
                    variant="submit"
                    color="primary"
                    className={classes.button}
                    onClick={addPersonInfoInSejam}
                  >
                    ارسال کد تایید
                  </Button>
                  {/* </CardActions>
            </Card> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    clientId: state.account.clientId,
    handleError: (message) => action.notifyError(message),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setClientId: () => dispatch(actions.setClientId()),
    handleError: (message) => dispatch(action.notifyError(message)),
  };
};

export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(Sejam));
