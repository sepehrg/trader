import React, { useState, useEffect, useRef } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Link from "../../UI/Link/Link";
import KeyboardIcon from "../../UI/icons/keyboard";
import EyeIcon from "../../UI/icons/eye";
import HideIcon from "../../UI/icons/hide";
import clsx from "clsx";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Captcha from "../../UI/captcha/captcha";
import AccountService from "../../../services/accountService";
import withWidth from "@material-ui/core/withWidth";
import ShieldBlockIcon from "../../UI/icons/shieldBlock";
import PageTitle from "../pageTitle/pageTitle";
import style from "../../../shared/style";
import "react-simple-keyboard/build/css/index.css";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import VirtualKeyboard from "../../UI/virtualKeyboard/virtualKeyboard";
import ReloadIcon from "../../UI/icons/reload";
import DropDownList from "../../UI/DropDownList/DropDownList";
import ArrowIcon from "../../UI/icons/arrow";
import useDevice from "../../../hooks/useDevice";
import FadeTransition from "../../UI/transition/fade";
import UserIcon from "../../UI/icons/user";
import KeyIcon from "../../UI/icons/key";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexDirection: "column",
    height: "100%",
  },
  mainTitle: {
    height: 180,
    display: "flex",
    alignItems: "flex-end",
  },
  mainContent: {
    flex: 1,
    height: "calc(100% - 180px)",
  },
  mainContentInner: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    width: 360,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginTop: 26,
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
  submitBtn: {
    width: "100%",
    backgroundColor: "#03B448",
    color: "#fff",
    boxShadow: "none",
    height: 42,
    marginTop: 26,
    "&:hover": {
      backgroundColor: "#00a03e",
      boxShadow: "none",
    },
  },
  register: {
    color: theme.palette.text.primary,
    fontSize: 10,
    cursor: "pointer",
    marginTop: 7,
    textAlign: "center",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  securityTips: {
    color: theme.palette.text.secondary,
    width: 340,
    textAlign: "right",
    marginTop: 30,
    overflow: "hidden",
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
  list: {
    padding: 0,
  },
  listItem: {
    paddingBottom: 0,
    fontSize: 11,
    textAlign: "justify",
  },
  securityListItemIcon: {
    height: 5,
    minWidth: 5,
    backgroundColor: theme.palette.icon.primary,
    borderRadius: 5,
    marginLeft: 7,
    marginBottom: "auto",
    marginTop: 4,
  },
  shieldIcon: {
    width: 18,
    strokeWidth: 38,
    marginLeft: 4,
  },
  "@keyframes pulse": {
    "0%": {
      boxShadow: `0 0 0 0 ${theme.palette.primary.main}bb`,
    },
    "70%": {
      boxShadow: `0 0 0 10px ${theme.palette.primary.main}00`,
    },
    "100%": {
      boxShadow: `0 0 0 10px ${theme.palette.primary.main}00`,
    },
  },
  containedBtn: {
    "&$disabledBtn": {
      backgroundColor: "#00a03e",
      color: "#8dd0a7",
    },
  },
  disabledBtn: {},
  captcha: {
    width: "100%",
  },
  captchaImage: {
    borderRadius: 4,
    verticalAlign: "middle",
    marginLeft: 4,
  },
  textFieldKeyboard: {
    position: "relative",
  },
  virtualKeyboard: {
    position: "absolute",
    zIndex: 2,
    direction: "ltr",
    right: -15,
    top: "110%",
    height: 230,
    overflow: "hidden",
    transition: "0.3s",
  },
  twoStepsAuthentication: {
    marginTop: 26,
  },
  selectMenu: {
    paddingTop: 17,
    paddingBottom: 10,
  },
  otp: {
    flexDirection: "column",
    height: "100%",
    position: "relative",
  },
  arrowIcon: {
    transform: "rotate(180deg)",
    width: 18,
    height: 18,
    marginLeft: 5,
  },
  back: {
    fontSize: 11,
  },
  mainTitle2: {
    textAlign: "center",
    paddingTop: 30,
  },
  explain: {
    textAlign: "center",
    fontSize: 11,
    marginTop: 20,
  },
  mainTitleMobile: {
    width: "100%",
  },
  adornmentMainMobile: {
    backgroundColor: `${theme.palette.icon.primary}77`,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    marginRight: 7,
    height: "100%",
  },
  adornmentMobile: {
    width: 48,
    fill: "#FFF",
  },
  textFieldMobile: {
    marginTop: 10,
    flexWrap: "nowrap",
  },
  adornmentRoot: {
    display: "flex",
  },
  adornmentRootMobile: {
    flexWrap: "nowrap",
  },
  captchaImageMobile: {
    height: 40,
    borderRadius: 6,
    marginLeft: 4,
    minWidth: 150,
  },
  submitBtnMobile: {
    height: 48,
    fontSize: 16,
  },
  registerMobile: {
    fontSize: 12,
    margin: "10px 0",
    color: theme.palette.text.secondary,
  },
  loginFormMobile: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  returnMobile: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    margin: "10px 0",
    color: theme.palette.text.secondary,
  },
  selectMenuMobile: {
    height: 48,
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [delay, setDelay] = useState(1000);
  const [virtualKeyboard, setVirtualKeyboard] = useState("");

  const [authenticateType, setAuthenticateType] = useState("OneFactor");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const successfulLoginRedirectUrl = "/tse";

  useEffect(() => {
    props.setClientId();
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (!username) {
      usernameRef.current.focus();
      props.notifyError("نام کاربری وارد نشده است");
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      props.notifyError("کلمه عبور وارد نشده است");
      return;
    }
    const data = {
      username,
      password,
      clientId: props.clientId,
      captcha,
      authenticateType,
    };
    setLoading(true);
    AccountService.login(data, (status, result) => {
      if (status === 200) {
        if (result.Success) {
          if (authenticateType === "OneFactor") {
            successfulLogin(result.Result);
          } else {
            setShowOtpForm(true);
            setLoading(false);
            props.setClientId();
          }
        } else {
          props.notifyError(result.Message);
          props.setClientId();
          setLoading(false);
        }
      } else {
        props.notifyError("خطا در برقراری ارتباط با سرور");
        setLoading(false);
      }
    });
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      // otpRef.current.focus();
      props.notifyError("کد تایید وارد نشده است");
      return;
    }
    const data = {
      username,
      password,
      clientId: props.clientId,
      captcha,
      otp,
    };
    setLoading(true);
    AccountService.verifyAuthenticateOtp(data, (status, result) => {
      if (result.Success) {
        successfulLogin(result.Result);
      } else {
        props.notifyError(result.Message);
        props.setClientId();
        setLoading(false);
      }
    });
  };

  const successfulLogin = (user) => {
    props.setUser(user);
    props.fetchPermissions();
    props.history.push(successfulLoginRedirectUrl);
  };

  const returnToLogin = () => {
    setShowOtpForm(false);
    setDelay(0);
  };

  const loginOptions = [
    {
      value: "OneFactor",
      text: "ورود با رمز ثابت",
    },
    {
      value: "TwoFactor",
      text: "شناسایی دو عاملی (پیامک)",
    },
  ];

  return (
    <Grid container className={clsx(device.isNotMobile && classes.root)}>
      <Grid
        item
        className={
          device.isNotMobile ? classes.mainTitle : classes.mainTitleMobile
        }
      >
        <PageTitle
          title="دانایان تریدر"
          subtitle="ورود به سامانه معاملات آنلاین"
          logo
        />
      </Grid>
      <Grid
        item
        xs={12}
        className={clsx(
          device.isNotMobile && classes.mainContent,
          device.isNotMobile && classes.scrollbarY
        )}
      >
        <Grid
          container
          className={clsx(device.isNotMobile && classes.mainContentInner)}
        >
          <Grid
            item
            xs={12}
            className={clsx(
              device.isNotMobile ? classes.loginForm : classes.loginFormMobile
            )}
          >
            {!showOtpForm ? (
              <form onSubmit={login} className={classes.form}>
                <ClickAwayListener
                  onClickAway={() => {
                    return virtualKeyboard === "username"
                      ? setVirtualKeyboard("")
                      : "";
                  }}
                >
                  <FadeTransition timeout={1200} delay={delay + 200}>
                    <div className={classes.textFieldKeyboard}>
                      <Grid
                        container
                        className={
                          device.isNotMobile
                            ? classes.textField
                            : classes.textFieldMobile
                        }
                      >
                        <Grid item xs={12}>
                          <Input
                            name="username"
                            label={device.isNotMobile ? "نام کاربری" : ""}
                            placeholder={device.isMobile ? "نام کاربری" : ""}
                            ref={usernameRef}
                            onChange={(e) => setUsername(e.target.value)}
                            inputClassName={classes.inputClassName}
                            endAdornment={
                              device.isNotMobile && (
                                <div>
                                  <Link
                                    onClick={() =>
                                      virtualKeyboard === "username"
                                        ? setVirtualKeyboard("")
                                        : setVirtualKeyboard("username")
                                    }
                                  >
                                    <KeyboardIcon
                                      className={clsx(
                                        classes.keyboard,
                                        classes.adornment
                                      )}
                                    ></KeyboardIcon>
                                  </Link>
                                </div>
                              )
                            }
                            startAdornment={<UserIcon />}
                            value={username}
                          />
                        </Grid>
                      </Grid>
                      {virtualKeyboard === "username" && (
                        <div className={classes.virtualKeyboard}>
                          <VirtualKeyboard onChange={(e) => setUsername(e)} />
                        </div>
                      )}
                    </div>
                  </FadeTransition>
                </ClickAwayListener>
                <ClickAwayListener
                  onClickAway={() => {
                    return virtualKeyboard === "password"
                      ? setVirtualKeyboard("")
                      : "";
                  }}
                >
                  <FadeTransition timeout={1200} delay={delay + 400}>
                    <div className={classes.textFieldKeyboard}>
                      <Grid
                        container
                        className={
                          device.isNotMobile
                            ? classes.textField
                            : classes.textFieldMobile
                        }
                      >
                        <Grid item xs={12}>
                          <Input
                            name="password"
                            label={device.isNotMobile ? "کلمه عبور" : ""}
                            placeholder={device.isMobile ? "کلمه عبور" : ""}
                            ref={passwordRef}
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            inputClassName={classes.inputClassName}
                            endAdornment={
                              device.isNotMobile && (
                                <div className={classes.adornmentRoot}>
                                  <Link
                                    onClick={() => {
                                      setShowPassword(!showPassword);
                                    }}
                                  >
                                    {showPassword ? (
                                      <HideIcon
                                        className={clsx(
                                          classes.password,
                                          classes.adornment
                                        )}
                                      ></HideIcon>
                                    ) : (
                                      <EyeIcon
                                        className={clsx(
                                          classes.password,
                                          classes.adornment
                                        )}
                                      ></EyeIcon>
                                    )}
                                  </Link>
                                  <Link
                                    onClick={() =>
                                      virtualKeyboard === "password"
                                        ? setVirtualKeyboard("")
                                        : setVirtualKeyboard("password")
                                    }
                                  >
                                    <KeyboardIcon
                                      className={clsx(
                                        classes.keyboard,
                                        classes.adornment
                                      )}
                                    ></KeyboardIcon>
                                  </Link>
                                </div>
                              )
                            }
                            startAdornment={<KeyIcon />}
                            value={password}
                          />
                        </Grid>

                        {device.isMobile && (
                          <Grid item className={classes.adornmentRoot}>
                            <Grid
                              container
                              className={classes.adornmentRootMobile}
                            >
                              <Grid item>
                                <Link
                                  className={classes.adornmentMainMobile}
                                  onClick={() => {
                                    setShowPassword(!showPassword);
                                  }}
                                >
                                  {showPassword ? (
                                    <HideIcon
                                      className={clsx(
                                        classes.password,
                                        classes.adornmentMobile
                                      )}
                                    ></HideIcon>
                                  ) : (
                                    <EyeIcon
                                      className={clsx(
                                        classes.password,
                                        classes.adornmentMobile
                                      )}
                                    ></EyeIcon>
                                  )}
                                </Link>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      {virtualKeyboard === "password" && (
                        <div className={classes.virtualKeyboard}>
                          <VirtualKeyboard onChange={(e) => setPassword(e)} />
                        </div>
                      )}
                    </div>
                  </FadeTransition>
                </ClickAwayListener>
                <FadeTransition timeout={1200} delay={delay + 600}>
                  <div>
                    <Grid
                      container
                      className={
                        device.isNotMobile
                          ? classes.textField
                          : classes.textFieldMobile
                      }
                    >
                      <Grid item className={classes.captcha}>
                        <Input
                          name="captcha"
                          label={device.isNotMobile ? "کد امنیتی" : ""}
                          placeholder={device.isMobile ? "کد امنیتی" : ""}
                          onChange={(e) => setCaptcha(e.target.value)}
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
                        ></Input>
                      </Grid>
                      {device.isMobile && (
                        <Grid item className={classes.adornmentRoot}>
                          <Grid
                            container
                            className={classes.adornmentRootMobile}
                          >
                            <Grid item>
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
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </div>
                </FadeTransition>
                <FadeTransition timeout={1200} delay={delay + 800}>
                  <div>
                    <Grid
                      container
                      className={
                        device.isNotMobile
                          ? classes.twoStepsAuthentication
                          : classes.textFieldMobile
                      }
                    >
                      <Grid item xs={12}>
                        <DropDownList
                          name="twoStepsAuthentication"
                          label={device.isNotMobile ? "نوع ورود" : ""}
                          placeholder={device.isMobile ? "نوع ورود" : ""}
                          options={loginOptions}
                          textField="text"
                          valueField="value"
                          value={authenticateType}
                          className={classes.fontDropDown}
                          onChange={(e) => setAuthenticateType(e.target.value)}
                          selectMenuClassName={clsx(
                            device.isNotMobile
                              ? classes.selectMenu
                              : classes.selectMenuMobile
                          )}
                        ></DropDownList>
                      </Grid>
                    </Grid>
                  </div>
                </FadeTransition>
                <FadeTransition timeout={1200} delay={delay + 1000}>
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      className={clsx(
                        classes.submitBtn,
                        classes.submitBtnMobile
                      )}
                      disabled={loading}
                      containedBtn={classes.containedBtn}
                      disabledBtn={classes.disabledBtn}
                    >
                      {loading
                        ? "درحال بررسی..."
                        : authenticateType === "TwoFactor"
                        ? "ارسال کد"
                        : "ورود"}
                    </Button>
                    <Link
                      onClick={() => {
                        props.setPage(1);
                        props.setClientId();
                      }}
                      className={clsx(classes.register, classes.registerMobile)}
                    >
                      رمز عبور خود را فراموش کردم
                    </Link>
                  </div>
                </FadeTransition>
              </form>
            ) : (
              <form onSubmit={verifyOtp} className={classes.form}>
                <Grid container className={classes.otp}>
                  {device.isNotMobile && (
                    <Grid item className={classes.back}>
                      <Link onClick={returnToLogin}>
                        <ArrowIcon className={classes.arrowIcon} />
                        بازگشت
                      </Link>
                    </Grid>
                  )}
                  <Grid item className={classes.mainTitle2}>
                    شناسایی دو عاملی (پیامک)
                  </Grid>
                  <Grid item className={classes.mainContent}>
                    <Grid container className={classes.mainContentInner}>
                      <Grid
                        item
                        className={clsx(
                          device.isNotMobile
                            ? classes.loginForm
                            : classes.loginFormMobile
                        )}
                      >
                        {device.isNotMobile && (
                          <FadeTransition timeout={1200} delay={100}>
                            <div className={classes.explain}>
                              کد پیامک شده را در کادر زیر وارد نمایید
                            </div>
                          </FadeTransition>
                        )}
                        <FadeTransition timeout={1200} delay={300}>
                          <div className={classes.textFieldKeyboard}>
                            <Input
                              name="otp"
                              label={device.isNotMobile ? "رمز پویا" : ""}
                              placeholder={
                                device.isMobile
                                  ? "کد تایید پیامک شده را وارد نمایید"
                                  : ""
                              }
                              // ref={otpRef}
                              className={classes.textField}
                              inputClassName={classes.inputClassName}
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              inputProps={{ inputMode: "numeric" }}
                            />
                          </div>
                        </FadeTransition>
                        <FadeTransition timeout={1200} delay={500}>
                          <div>
                            <Grid
                              container
                              className={
                                device.isNotMobile
                                  ? classes.textField
                                  : classes.textFieldMobile
                              }
                            >
                              <Grid item className={classes.captcha}>
                                <Input
                                  name="captcha"
                                  label={device.isNotMobile ? "کد امنیتی" : ""}
                                  placeholder={
                                    device.isMobile ? "کد امنیتی" : ""
                                  }
                                  onChange={(e) => setCaptcha(e.target.value)}
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
                                ></Input>
                              </Grid>
                              {device.isMobile && (
                                <Grid item className={classes.adornmentRoot}>
                                  <Grid
                                    container
                                    className={classes.adornmentRootMobile}
                                  >
                                    <Grid item>
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
                                  </Grid>
                                </Grid>
                              )}
                            </Grid>
                          </div>
                        </FadeTransition>
                        <FadeTransition timeout={1200} delay={700}>
                          <div>
                            <Button
                              type="submit"
                              color="primary"
                              className={clsx(
                                classes.submitBtn,
                                classes.submitBtnMobile
                              )}
                              disabled={loading}
                              containedBtn={classes.containedBtn}
                              disabledBtn={classes.disabledBtn}
                            >
                              {loading ? "درحال بررسی..." : "ورود"}
                            </Button>
                          </div>
                        </FadeTransition>
                        {device.isMobile && (
                          <Grid item>
                            <Link onClick={returnToLogin}>
                              <Grid container className={classes.returnMobile}>
                                <Grid item>
                                  <ArrowIcon className={classes.arrowIcon} />
                                </Grid>
                                <Grid item>بازگشت به صفحه ورود</Grid>
                              </Grid>
                            </Link>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
          </Grid>

          {device.isNotMobile && (
            <Grid item className={classes.securityTips}>
              <Grid container>
                <FadeTransition timeout={1500} delay={delay + 1200}>
                  <div>
                    <Grid item>
                      <Typography
                        variant="h4"
                        className={classes.securityTitle}
                      >
                        <ShieldBlockIcon className={classes.shieldIcon} />
                        نکات امنیتی:
                      </Typography>
                      <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                          <ListItemIcon
                            className={classes.securityListItemIcon}
                          ></ListItemIcon>
                          سامانه DanayanTrader با استفاده از پروتکل امن SSL و به
                          آدرس https://danayantrader.ir/ در اختیار مشتریان قرار
                          دارد لطفاً پیش از ورود هرگونه اطلاعات، آدرس موجود در
                          بخش مرورگر خود را با آدرس فوق مقایسه نمایید. درصورت
                          مشاهده هر نوع مغایرت احتمالی، از ادامه کار منصرف شوید
                          و موضوع را با کارگزاری دانایان در میان بگذارید.
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemIcon
                            className={classes.securityListItemIcon}
                          ></ListItemIcon>
                          هرگز نام کاربری و کلمه عبور خود را در اختیار دیگران
                          قرار ندهید.
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemIcon
                            className={classes.securityListItemIcon}
                          ></ListItemIcon>
                          پس از اتمام کار با سامانه، حتماً با استفاده از دکمه
                          خروج، از حساب کاربری خود خارج شوید.
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemIcon
                            className={classes.securityListItemIcon}
                          ></ListItemIcon>
                          برای حفاظت از اطلاعات حساب کاربری خود، حتی المقدور از
                          صفحه کلید مجازی استفاده نمایید.
                        </ListItem>
                      </List>
                    </Grid>
                  </div>
                </FadeTransition>
              </Grid>
            </Grid>
          )}
        </Grid>
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
    setUser: (user) => dispatch(actions.setUser(user)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
    fetchPermissions: () => dispatch(actions.fetchPermissions()),
  };
};

export default withWidth()(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
