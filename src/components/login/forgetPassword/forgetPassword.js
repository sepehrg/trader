import React, { useState, useEffect, useReducer } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "../../UI/Link/Link";
import PasswordAdornment from "../../UI/passwordAdornment/passwordAdornment";
import clsx from "clsx";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Captcha from "../../UI/captcha/captcha";
import AccountService from "../../../services/accountService";
import PageTitle from "../pageTitle/pageTitle";
import ReloadIcon from "../../UI/icons/reload";
import { useForm } from "react-hook-form";
import PasswordStrengthBar from "react-password-strength-bar";
import useDevice from "../../../hooks/useDevice";
import FadeTransition from "../../UI/transition/fade";
import ArrowIcon from "../../UI/icons/arrow";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    height: "100%",
    position: "relative",
  },
  mainTitle: {
    height: 180,
    display: "flex",
    alignItems: "flex-end",
  },
  mainContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: "calc(100% - 180px)",
    justifyContent: "space-around",
    paddingTop: 40,
  },
  mainContentInner: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    maxWidth: 450,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 450,
  },
  textField: {
    marginTop: 26,
    width: "100%",
  },
  inputClassName: {
    height: 48,
  },
  adornment: {
    width: 23,
    marginLeft: 10,
    strokeWidth: "32",
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
  forgetPassword: {
    color: theme.palette.text.primary,
    fontSize: 11,
    textAlign: "left",
    cursor: "pointer",
    marginTop: 4,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  captcha: {
    width: "100%",
  },
  captchaImage: {
    borderRadius: 10,
    verticalAlign: "middle",
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#03B448",
    color: "#fff",
    boxShadow: "none",
    height: 42,
    marginTop: 30,
    "&:hover": {
      backgroundColor: "#00a03e",
      boxShadow: "none",
    },
  },
  containedBtn: {
    "&$disabledBtn": {
      backgroundColor: "#00a03e",
      color: "#8dd0a7",
    },
  },
  disabledBtn: {},
  mainTitleMobile: {
    width: "100%",
  },
  mainContentMobile: {
    paddingTop: 0,
  },
  textFieldMobile: {
    marginTop: 10,
    flexWrap: "nowrap",
  },
  adornmentMobile: {
    width: 48,
    fill: "#FFF",
  },
  adornmentMainMobile: {
    backgroundColor: `${theme.palette.icon.primary}77`,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    marginRight: 7,
    height: 48,
  },
  adornmentRootMobile: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "flex-end",
  },
  submitBtnMobile: {
    marginTop: 20,
    height: 48,
    fontSize: 16,
  },
  captchaImageMobile: {
    height: 40,
    borderRadius: 6,
    marginLeft: 4,
    minWidth: 150,
  },
  returnMobile: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    margin: "10px 0",
    color: theme.palette.text.secondary,
  },
  arrowIcon: {
    transform: "rotate(180deg)",
    width: 18,
    height: 18,
    marginLeft: 5,
  },
  loginFormMobile: {
    display: "flex",
    justifyContent: "center",
  },
  caution: {
    fontSize: 11,
    color: theme.palette.color.yellow,
  },
}));

const ForgetPassword = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();
  const { register, handleSubmit, errors, watch, reset } = useForm();

  const [alternateToken, setAlternateToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  // const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const delay = 1000;

  const initialState = {};
  const reducer = (state, action) => {
    return { ...state, [action.field]: action.visible };
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    props.setClientId();
  }, []);

  const sendOtp = (formData) => {
    setLoading(true);
    AccountService.addResetPasswordToken(
      { ...formData, clientId: props.clientId },
      (status, result) => {
        if (result.Success) {
          setAlternateToken(result.Result);
          setShowChangePassword(true);
          props.setClientId();
          reset();
        } else {
          props.notifyError(result.Message);
          props.setClientId();
        }
        setLoading(false);
      }
    );
  };

  const changePassword = (formData) => {
    setLoading(true);
    AccountService.resetPassword(
      { ...formData, alternateToken, clientId: props.clientId },
      (status, result) => {
        if (result.Success) {
          props.notifySuccess("رمز عبور با موفقیت تغییر یافت");
          props.setPage(0);
        } else {
          props.notifyError(result.Message);
          props.setClientId();
        }
        setLoading(false);
      }
    );
  };

  const barColors = [
    theme.palette.border.bar,
    theme.palette.color.red,
    theme.palette.color.yellow,
    theme.palette.color.blue,
    theme.palette.color.green,
  ];

  const captchaField = (
    <Input
      name="captcha"
      ref={register({ required: true })}
      label={device.isNotMobile ? "کد امنیتی" : ""}
      placeholder={device.isMobile ? "کد امنیتی" : ""}
      inputClassName={classes.inputClassName}
      endAdornment={
        props.clientId && (
          <Captcha
            clientId={props.clientId}
            onReload={props.setClientId}
            className={
              device.isNotMobile
                ? classes.captchaImage
                : classes.captchaImageMobile
            }
          ></Captcha>
        )
      }
    />
  );

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        className={
          device.isNotMobile ? classes.mainTitle : classes.mainTitleMobile
        }
      >
        <PageTitle title="دانایان تریدر" subtitle="بازیابی رمز عبور" />
      </Grid>
      <Grid
        item
        className={clsx(
          classes.mainContent,
          device.isMobile && classes.mainContentMobile
        )}
      >
        <Grid container className={classes.mainContentInner}>
          <Grid
            item
            className={clsx(
              device.isNotMobile ? classes.loginForm : classes.loginFormMobile
            )}
          >
            {!showChangePassword ? (
              <form onSubmit={handleSubmit(sendOtp)} className={classes.form}>
                <FadeTransition in timeout={1200} delay={delay + 1200}>
                  <Input
                    ref={register({ required: true })}
                    name="nationalCode"
                    label={device.isNotMobile ? "کد ملی" : ""}
                    placeholder={device.isMobile ? "کد ملی" : ""}
                    className={clsx(
                      classes.textField,
                      device.isMobile && classes.textFieldMobile
                    )}
                    error={!!errors.nationalCode}
                    helperText="کد ملی الزامی است"
                    inputClassName={classes.inputClassName}
                  />
                </FadeTransition>
                <FadeTransition in timeout={1200} delay={delay + 1400}>
                  <Input
                    ref={register({ required: true })}
                    name="cellPhoneNumber"
                    label={device.isNotMobile ? "شماره همراه" : ""}
                    placeholder={device.isMobile ? "شماره همراه" : ""}
                    className={clsx(
                      classes.textField,
                      device.isMobile && classes.textFieldMobile
                    )}
                    error={!!errors.nationalCode}
                    helperText="شماره همراه الزامی است"
                    inputClassName={classes.inputClassName}
                  />
                </FadeTransition>
                <FadeTransition in timeout={1200} delay={delay + 1600}>
                  <Grid
                    container
                    className={clsx(
                      classes.textField,
                      device.isMobile && classes.textFieldMobile
                    )}
                  >
                    <Grid item className={classes.captcha}>
                      {captchaField}
                    </Grid>
                    {device.isMobile && (
                      <Grid item className={classes.adornmentRootMobile}>
                        <Link
                          className={classes.adornmentMainMobile}
                          onClick={props.setClientId}
                        >
                          <ReloadIcon
                            className={clsx(
                              classes.keyboard,
                              classes.adornmentMobile
                            )}
                          ></ReloadIcon>
                        </Link>
                      </Grid>
                    )}
                  </Grid>
                </FadeTransition>
                <FadeTransition in timeout={1200} delay={delay + 1800}>
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      className={clsx(
                        classes.submitBtn,
                        device.isMobile && classes.submitBtnMobile
                      )}
                      disabled={loading}
                      containedBtn={classes.containedBtn}
                      disabledBtn={classes.disabledBtn}
                    >
                      {loading ? "درحال بررسی..." : "بازیابی"}
                    </Button>
                  </div>
                </FadeTransition>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit(changePassword)}
                className={classes.form}
              >
                <FadeTransition in timeout={1200} delay={delay + 1000}>
                  <Grid container>
                    <Grid item className={classes.caution}>
                      در صورت عدم دریافت کد تأیید با پشتیبانی تماس بگیرید.
                    </Grid>
                  </Grid>
                </FadeTransition>
                <FadeTransition in timeout={1200} delay={delay + 1200}>
                  <Input
                    ref={register({ required: true })}
                    name="otp"
                    label="کد تایید"
                    className={clsx(
                      classes.textField,
                      device.isMobile && classes.textFieldMobile
                    )}
                    inputClassName={classes.inputClassName}
                    error={!!errors.otp}
                    helperText="کد تایید الزامی است"
                  />
                </FadeTransition>
                <FadeTransition in timeout={1200} delay={delay + 1400}>
                  <>
                    <Input
                      name="newPassword"
                      label="کلمه عبور جدید"
                      type={state.new ? "text" : "password"}
                      className={clsx(
                        classes.textField,
                        device.isMobile && classes.textFieldMobile
                      )}
                      inputClassName={classes.inputClassName}
                      // inputProps={{ autoComplete: "newPassword" }}
                      ref={register({ required: true })}
                      error={!!errors.newPassword}
                      helperText="کلمه عبور جدید الزامی است"
                      endAdornment={
                        <PasswordAdornment
                          onClick={(visible) =>
                            dispatch({ field: "new", visible })
                          }
                        />
                      }
                    ></Input>
                    <PasswordStrengthBar
                      password={watch("newPassword")}
                      minLength={6}
                      scoreWords={[
                        "بسیار ضعیف",
                        "ضعیف",
                        "خوب",
                        "قوی",
                        "مستحکم",
                      ]}
                      shortScoreWord={
                        !watch("newPassword") ? "" : "بسیار کوتاه"
                      }
                      barColors={barColors}
                      scoreWordClassName={classes.scoreWordClassName}
                    />
                  </>
                </FadeTransition>
                <FadeTransition in timeout={1200} delay={delay + 1400}>
                  <Input
                    name="confirmPassword"
                    label="تکرار کلمه عبور جدید"
                    type={state.confirm ? "text" : "password"}
                    className={clsx(
                      classes.textField,
                      device.isMobile && classes.textFieldMobile
                    )}
                    inputClassName={classes.inputClassName}
                    error={
                      errors.confirmPassword?.type === "required" ||
                      (errors.confirmPassword?.type !== "required" &&
                        errors.confirmPassword?.type === "validate")
                    }
                    // helperText={confirmPasswordError}
                    ref={register({
                      required: true,
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "کلمه عبور و تکرار آن یکسان نیست",
                    })}
                    endAdornment={
                      <PasswordAdornment
                        onClick={(visible) =>
                          dispatch({ field: "confirm", visible })
                        }
                      />
                    }
                  ></Input>
                </FadeTransition>
                <FadeTransition in timeout={1200} delay={delay + 1600}>
                  <Grid
                    container
                    className={clsx(
                      classes.textField,
                      device.isMobile && classes.textFieldMobile
                    )}
                  >
                    <Grid item className={classes.captcha}>
                      {captchaField}
                    </Grid>
                  </Grid>
                </FadeTransition>
                <FadeTransition in timeout={1200} delay={delay + 1800}>
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      className={clsx(
                        classes.submitBtn,
                        device.isMobile && classes.submitBtnMobile
                      )}
                      disabled={loading}
                      containedBtn={classes.containedBtn}
                      disabledBtn={classes.disabledBtn}
                    >
                      {loading ? "درحال بررسی..." : "تایید"}
                    </Button>
                  </div>
                </FadeTransition>
              </form>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Link onClick={() => props.setPage(0)}>
          <Grid container className={classes.returnMobile}>
            <Grid item>
              <ArrowIcon className={classes.arrowIcon} />
            </Grid>
            <Grid item>بازگشت به صفحه ورود</Grid>
          </Grid>
        </Link>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    clientId: state.account.clientId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setClientId: () => dispatch(actions.setClientId()),
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
