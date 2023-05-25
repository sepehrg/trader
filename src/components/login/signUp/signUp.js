import React, { useState, useEffect, useRef } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { themeCreator } from "../../../themes/base";
import ShieldBlockIcon from "../../UI/icons/shieldBlock";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";
import Animation from "../../UI/animation/animation";
import PageTitle from "../pageTitle/pageTitle";
import style from "../../../shared/style";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexDirection: "column",
    height: "100%",
  },
  mainContentInner: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    height: 180,
    display: "flex",
    alignItems: "flex-end",
  },
  mainContent: {
    // display: "flex",
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "calc(100% - 180px)",
    justifyContent: "space-around",
  },

  loginForm: {
    width: 340,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 450,
    margin: "auto",
  },
  textField: {
    marginTop: 26,
    width: "100%",
  },
  inputClassName: {
    height: 48,
  },
  loginAdornment: {
    position: "absolute",
    left: 0,
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
  captchaCode: {
    justifyContent: "center",
    margin: "10px 0px",
    minHeight: 60,
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
}));

const SignUp = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    props.setClientId();
  }, []);

  const submitHandler = (e) => {
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
    setLoading(true);
    AccountService.login(
      username,
      password,
      props.clientId,
      captcha,
      (status, result) => {
        if (result.Success) {
          props.setUser(result.Result);
          props.history.push("/tse");
        } else {
          if (status === 200) {
            props.notifyError(result.Message);
            props.setClientId();
          } else props.notifyError("ارتباط با سرور قطع می باشد");
          setLoading(false);
        }
      }
    );
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.mainTitle}>
        <PageTitle
          title="ثبت نام در سامانه"
          subtitle="سامانه معاملات آنلاین دانایان تریدر"
        />
      </Grid>
      <Grid item className={clsx(classes.mainContent, classes.scrollbarY)}>
        <Grid container className={classes.mainContentInner}>
          <Grid item className={classes.loginForm}>
            <form onSubmit={submitHandler} className={classes.form}>
              <Fade
                in={checked}
                {...(checked ? { timeout: 1200 } : {})}
                style={{ transitionDelay: checked ? "1200ms" : "0ms" }}
              >
                <div>
                  <Input
                    name="text"
                    label="نام و نام خانوادگی"
                    ref={usernameRef}
                    className={classes.textField}
                    onChange={(e) => setUsername(e.target.value)}
                    // error={username === ""}
                    inputClassName={classes.inputClassName}
                  ></Input>
                </div>
              </Fade>
              <Fade
                in={checked}
                {...(checked ? { timeout: 1200 } : {})}
                style={{ transitionDelay: checked ? "1300ms" : "0ms" }}
              >
                <div>
                  <Input
                    name="mobileNumber"
                    label="موبایل"
                    ref={usernameRef}
                    className={classes.textField}
                    onChange={(e) => setUsername(e.target.value)}
                    // error={username === ""}
                    inputClassName={classes.inputClassName}
                  ></Input>
                </div>
              </Fade>
              <Fade
                in={checked}
                {...(checked ? { timeout: 1200 } : {})}
                style={{ transitionDelay: checked ? "1500ms" : "0ms" }}
              >
                <div>
                  <Input
                    name="email"
                    label="ایمیل"
                    ref={usernameRef}
                    className={classes.textField}
                    onChange={(e) => setUsername(e.target.value)}
                    // error={username === ""}
                    inputClassName={classes.inputClassName}
                  ></Input>
                </div>
              </Fade>
              <Fade
                in={checked}
                {...(checked ? { timeout: 1200 } : {})}
                style={{ transitionDelay: checked ? "1700ms" : "0ms" }}
              >
                <div>
                  <Input
                    name="password"
                    label="کلمه عبور"
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    className={classes.textField}
                    onChange={(e) => setPassword(e.target.value)}
                    // error={password === ""}
                    inputClassName={classes.inputClassName}
                    adornment
                    loginAdornment={classes.loginAdornment}
                    endAdornment={
                      <div style={{ display: "flex" }}>
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
                        {/* <Link onClick={() => {}}>
                          <KeyboardIcon
                            className={clsx(
                              classes.keyboard,
                              classes.adornment
                            )}
                          ></KeyboardIcon>
                        </Link> */}
                      </div>
                    }
                  ></Input>
                </div>
              </Fade>
              <Fade
                in={checked}
                {...(checked ? { timeout: 1200 } : {})}
                style={{ transitionDelay: checked ? "1900ms" : "0ms" }}
              >
                <div>
                  <Input
                    name="confirmPassword"
                    label="تکرار کلمه عبور"
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    className={classes.textField}
                    onChange={(e) => setPassword(e.target.value)}
                    // error={password === ""}
                    inputClassName={classes.inputClassName}
                    adornment
                    loginAdornment={classes.loginAdornment}
                    endAdornment={
                      <div style={{ display: "flex" }}>
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
                        {/* <Link onClick={() => {}}>
                          <KeyboardIcon
                            className={clsx(
                              classes.keyboard,
                              classes.adornment
                            )}
                          ></KeyboardIcon>
                        </Link> */}
                      </div>
                    }
                  ></Input>
                </div>
              </Fade>
              <Fade
                in={checked}
                {...(checked ? { timeout: 1200 } : {})}
                style={{ transitionDelay: checked ? "2100ms" : "0ms" }}
              >
                <div>
                  <Button
                    type="submit"
                    color="primary"
                    className={classes.submitBtn}
                    disabled={loading}
                    containedBtn={classes.containedBtn}
                    disabledBtn={classes.disabledBtn}
                  >
                    {loading ? "درحال بررسی..." : "ثبت نام"}
                  </Button>
                </div>
              </Fade>
            </form>
          </Grid>
          <Grid item>{/* epmty section */}</Grid>
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
  };
};

export default withWidth()(
  connect(mapStateToProps, mapDispatchToProps)(SignUp)
);
