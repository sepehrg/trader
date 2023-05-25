import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Captcha from "../../components/UI/captcha/captcha";
import stepLevel, { getUrlbyStepId } from "../../enums/step";
import sejamStatus from "../../enums/sejamStatus";
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

import ArrowIcon from "../../../src/components/UI/icons/arrow";
import clsx from "clsx";
import Button from "@material-ui/core/Button";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import * as action from "../../store/actions/index";
const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: 5,
    width: "100%",
  },
  button: {
    color: theme.palette.color.blue,
    border: `1px solid ${theme.palette.color.blue}`,
    fontSize: 12,
    "&:hover $nextIcon": {
      transform: "translateX(-4px)",
    },
  },
  header: {
    width: "100%",
    margin: 20,
    fontSize: 14,
  },
  captcha: {
    width: "100%",
    display: "flex",
  },
  captchaImage: {
    borderRadius: 10,
    verticalAlign: "middle",
  },
  captchaCode: {
    display: "flex",
    alignItems: "flex-end",
    marginRight: 10,
  },
  textField: {
    // backgroundColor: "#fff",
    marginTop: theme.spacing(13),
    width: "100%",
  },
  inputClassName: {
    height: 46,
  },
  submit: {
    justifyContent: "flex-end",
    backgroundColor: theme.palette.background.paper,
    padding: "20px 30px",
  },
  endIcon: {
    margin: 0,
    marginRight: 10,
  },
  captchaInput: {
    flex: 1,
  },
  form: {
    padding: 30,
  },
  input: {
    position: "relative",
  },
  error: {
    fontSize: 10,
    position: "absolute",
    backgroundColor: theme.palette.color.red,
    borderRadius: 4,
    padding: "0px 5px",
    right: 20,
    bottom: 0,
  },
  icon: {
    width: 16,
    height: 16,
  },
  nextIcon: {
    fill: theme.palette.primary.main,
  },
}));

const CheckInfo = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const [stateInfo, setStateInfo] = useState(1);
  const [nationalCode, setNationalCode] = useState("");
  const [captcha, setCaptcha] = useState(null);
  const [errorNationalCode, setErrorNationalCode] = useState("");
  const [kycOtp, setkycOtp] = useState("");
  const [showErrorSetkycOtp, setShowErrorSetkycOtp] = useState(false);
  const [registrStatus, setRegistrStatus] = useState({});

  const unknownError = "خطایی رخ داده است";

  useEffect(() => {
    // personData();
    // result();
    props.setClientId();

    var personData = {};

    async function fetchData() {
      await SejamService.getNationalCode((status, data) => {
        personData = data.Result;
      });
      dispatch({
        type: "isLoding",
        payload: true,
      });

      dispatch({
        type: "isLoding",
        payload: false,
      });
    }

    fetchData().then(() => {
      if (personData) {
        dispatch({
          type: "userSavedStepData",
          payload: { ...state.userSavedStepData, Person: personData },
        });

        setNationalCode(personData);
      }
    });

    dispatch({
      type: "stepWizard",
      payload: stepLevel.checkInfo.id,
    });
  }, []);

  const getRegistrationStatus = () => {
    SejamService.getPersonRegistrationStatus((status, data) => {
      // console.log("data", data);
      if (data) {
        if (data && data.Success) {
          getUrlbyStepId(data.Result == 1 ? data.Result : data.Result + 1);
        } else {
          props.handleError(data && data.Message ? data.Message : unknownError);
        }
      } else {
        nextWizard();
      }
      setNationalCode(data.Result);
    });
  };

  const sendKycOtp = (e) => {
    SejamService.sendKycOtp(nationalCode, (success, result) => {
      if (result && result.Success) {
        setStateInfo(2);
      } else {
        props.handleError(
          result && result.Message ? result.Message : unknownError
        );
      }
    });
  };

  const checkAndSendOtp = async (e) => {
    e.preventDefault();
    // nextWizard();
    if (!nationalCode) {
      setErrorNationalCode("فیلد کد ملی الزامی است");
      return;
    }
    if (nationalCode.length != 10) {
      setErrorNationalCode("کد ملی را درست وارد نمایید");
      return;
    }

    dispatch({
      type: "isLoding",
      payload: true,
    });

    await SejamService.getRegistrationStatusInSejam(
      {
        nationalCode: nationalCode,
        clientId: props.clientId,
        captcha: captcha,
      },
      (status, result) => {
        // console.log("result", result);

        if (
          result.Result &&
          result.Result.SejamStatus == sejamStatus.Registered
        ) {
          sendKycOtp();
        } else if (
          window.location.pathname != "/login" &&
          result.Result != null
        ) {
          getRegistrationStatus();
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      }
    );

    // if (registrStatus && registrStatus.SejamStatus == sejamStatus.Registered ) {
    //   sendKycOtp();
    // }
    // else if (window.location.pathname != "/login" &&registrStatus != null || registrStatus.IsSuccessful != false) {
    //   getRegistrationStatus();
    // }

    dispatch({
      type: "isLoding",
      payload: false,
    });
  };

  const getKycInfo = async (e) => {
    e.preventDefault();

    dispatch({
      type: "isLoding",
      payload: true,
    });

    if (!kycOtp) {
      setShowErrorSetkycOtp(true);
      return;
    }

    dispatch({
      type: "isLoding",
      payload: false,
    });
    const result = (e) => {
      //    e.preventDefault();
      // setError("");

      SejamService.getKycInfo(
        {
          nationalCode: nationalCode,
          kycOtp: kycOtp,
          clientId: props.clientId,
          captcha: captcha,
        },
        (success, result) => {
          if (success) {
            dispatch({
              type: "stepWizard",
              payload: stepLevel.finalRegister.id,
            });
            dispatch({
              type: "kycUserInfo",
              payload: result,
            });
          } else {
            nextWizard();
          }
        }
      );
    };
  };

  const nextWizard = () => {
    window.location.pathname = stepLevel.profile.url;
  };
  // console.log("state.userSavedStepData", state);

  return (
    <Grid container>
      <Grid item className={classes.header}>
        بررسی اطلاعات
      </Grid>
      <Grid item className={classes.main}>
        {/* <Card className={classes.main}>
          <CardContent> */}
        <form>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Grid container spacing={10} className={classes.form}>
                <Grid item xs={4} className={classes.input}>
                  {stateInfo == 1 && (
                    <>
                      {Object.keys(state.userSavedStepData).length == 0 ? (
                        <Input
                          name="username"
                          label="کد ملی"
                          className={classes.textField}
                          onChange={(e) => setNationalCode(e.target.value)}
                          // error={nationalCode === ""}
                          inputClassName={classes.inputClassName}
                          adornment
                          loginAdornment={classes.loginAdornment}
                        ></Input>
                      ) : (
                        <Input
                          name="username"
                          label="کد ملی"
                          className={classes.textField}
                          // onChange={(e) => setNationalCode(e.target.value)}
                          //error={nationalCode === ""}
                          value={nationalCode}
                          inputClassName={classes.inputClassName}
                          adornment
                          loginAdornment={classes.loginAdornment}
                          disabled={true}
                        ></Input>
                      )}
                      {errorNationalCode && (
                        <span className={classes.error}>
                          {errorNationalCode}
                        </span>
                      )}
                      {/* <label htmlFor="">کد ملی</label> */}
                    </>
                  )}
                  {stateInfo == 2 && (
                    <div className="form_group_sejam">
                      <Input
                        label="کد تایید "
                        className={classes.textField}
                        id=""
                        name="Name"
                        autoComplete="off"
                        inputClassName={classes.inputClassName}
                        adornment
                        loginAdornment={classes.loginAdornment}
                        placeholder="کد تایید پیامک شده را وارد نمایید "
                        onChange={(e) => setkycOtp(e.target.value)}
                      />
                      {
                        (showErrorSetkycOtp && (
                          <span> فیلد کد تایید الزامی است. </span>
                        ),
                        (<span>{showErrorSetkycOtp}</span>))
                      }
                    </div>
                  )}
                </Grid>
                <Grid item className={classes.captcha} xs={4}>
                  <Grid container>
                    <Grid item className={classes.captchaInput}>
                      <Input
                        name="captcha"
                        label="کد امنیتی"
                        className={classes.textField}
                        onChange={(e) => setCaptcha(e.target.value)}
                        error={captcha === ""}
                        inputClassName={classes.inputClassName}
                      ></Input>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.captcha} xs={4}>
                  <Grid container>
                    <Grid item className={classes.captchaCode}>
                      <Grid container>
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
              </Grid>
            </Grid>
            {/* </CardContent> */}
            {/* <CardActions> */}
            <Grid item xs={12}>
              <Grid container className={classes.submit}>
                <Grid item>
                  <Button
                    type="submit"
                    variant="outlined"
                    className={classes.button}
                    classes={{ endIcon: classes.endIcon }}
                    endIcon={
                      <ArrowIcon
                        className={clsx(classes.icon, classes.nextIcon)}
                      />
                    }
                    onClick={stateInfo == 1 ? checkAndSendOtp : getKycInfo}
                  >
                    {stateInfo == 1 ? "ارسال کد تایید" : "بررسی اطلاعات"}
                  </Button>
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

export default withWidth()(
  connect(mapStateToProps, mapDispatchToProps)(CheckInfo)
);
