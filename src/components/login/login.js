import React, { useState } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import videoWebm from "../../assets/videos/FaraTraderWebm.webm";
import poster from "../../assets/images/FaraTraderPoster.jpg";
import mobilePoster from "../../assets/images/mobile-bg.png";
import logo from "../../assets/images/logo3.png";
import pattern from "../../assets/images/pattern-02.png";
import LoginForm from "./loginForm/loginForm";
import LoginFeatures from "./loginFeatures/loginFeatures";
import Contact from "./contact/contact";
import Tab from "../UI/Tab/Tab";
import Tabs from "../UI/Tab/Tabs";
import Clock from "../UI/clock/clock";
import ForgetPassword from "./forgetPassword/forgetPassword";
// import SignUp from "./signUp/signUp";
import useDevice from "../../hooks/useDevice";
// import CmdTseService from "../../services/cmdTseService";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflow: "hidden",
  },
  bgVideo: {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    zIndex: "-100",
    "&:after": {
      content: "''",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0%",
      left: "0%",
      background: `url(${pattern})`,
      opacity: "0.2",
    },
  },
  Video: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    backgroundSize: "cover",
    minWidth: "100%",
    minHeight: "100%",
  },
  content: {
    backgroundColor: `${theme.palette.background.box}f5`,
    display: "flex",
    flexDirection: "column",
    width: "70%",
    justifyContent: "center",
    overflow: "hidden",
    height: "100%",
  },
  expandContentI: {
    animation: "$collapseI 1.2s",
  },
  expandContentII: {
    animation: "$collapseII 1.2s",
  },
  "@keyframes collapseI": {
    "0%": {
      width: "70%",
      opacity: 0,
    },
    "30%": {
      width: "0%",
      opacity: 0,
    },
    "100%": {
      width: "70%",
      opacity: 1,
    },
  },
  "@keyframes collapseII": {
    "0%": {
      width: "70%",
      opacity: 0,
    },
    "30%": {
      width: "0%",
      opacity: 0,
    },
    "100%": {
      width: "70%",
      opacity: 1,
    },
  },
  menu: {
    backgroundColor: `${theme.palette.background.default}66`,
    display: "flex",
    flex: "1",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    height: "100%",
  },
  navbar: {
    flexDirection: "column",
  },
  navbarItem: {
    backgroundColor: `${theme.palette.background.default}80`,
    color: theme.palette.text.primary,
    margin: "1px 0",
    minHeight: 30,
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    paddingRight: 50,
    cursor: "pointer",
    minWidth: "100%",
    opacity: 1,
    "&:hover": {
      backgroundColor: `${theme.palette.background.default}b5`,
      fontWeight: "600",
    },
  },
  selected: {
    fontWeight: "600",
  },
  title: {
    flexDirection: "column",
    padding: "0 50px",
  },
  logo: {
    width: 64,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 600,
    marginTop: 6,
    marginBottom: 20,
    color: theme.palette.text.primary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    color: theme.palette.text.primary,
    fontSize: 11,
    fontWeight: 600,
    padding: "10px 20px",
    flexDirection: "column",
  },
  wrapper: {
    alignItems: "flex-start",
  },
  indicator: {
    backgroundColor: `${theme.palette.background.default}66`,
    width: "100%",
    zIndex: "-1",
  },
  subTabs: {
    paddingRight: 80,
    fontSize: 12,
  },

  rootMobile: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  boxMobile: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: `${theme.palette.background.box}dd`,
    borderRadius: 8,
    padding: "3px 16px",
  },
  copyRightMobile: {
    position: "absolute",
    bottom: 6,
    fontSize: 10,
    color: `${theme.palette.text.secondary}99`,
    width: "100%",
    textAlign: "center",
  },
  mainMobile: {
    padding: 10,
    width: "100%",
    maxWidth: 630,
  },
  posterMobile: {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    zIndex: "-100",
  },
}));

let firstRender = true;

const Login = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const history = useHistory();

  const [expandContent, setExpandContent] = useState(true);
  const [value, setValue] = React.useState(0);

  // if user is logged in redirect to dashboard
  if (props.user && firstRender) {
    firstRender = false;
    history.push("/marketView");
    return null;
  } else firstRender = false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeContent = () => {
    setExpandContent(!expandContent);
  };

  return (
    <>
      {device.isNotMobile ? (
        <Grid container className={classes.root}>
          <Grid item className={classes.bgVideo}>
            <video
              poster={poster}
              autoPlay
              loop
              muted
              className={classes.Video}
            >
              <source src={videoWebm} type="video/webm" />
            </video>
          </Grid>
          <Grid item className={classes.menu}>
            <Grid container className={classes.title}>
              <Grid item>
                <img className={classes.logo} src={logo} alt="دانایان تریدر" />
              </Grid>
              <Typography variant="h1" className={classes.mainTitle}>
                سامانه معاملات آنلاین دانایان تریدر
              </Typography>
            </Grid>
            <Grid container className={classes.navbar}>
              <Tabs
                onChange={handleChange}
                value={value}
                orientation="vertical"
                classes={{
                  indicator: classes.indicator,
                }}
              >
                <Tab
                  onClick={changeContent}
                  className={classes.navbarItem}
                  label="ورود به سامانه"
                  classes={{
                    wrapper: classes.wrapper,
                    selected: classes.selected,
                  }}
                ></Tab>
                <Tab
                  onClick={changeContent}
                  className={clsx(classes.navbarItem, classes.subTabs)}
                  label="بازیابی رمزعبور"
                  classes={{
                    wrapper: classes.wrapper,
                    selected: classes.selected,
                  }}
                ></Tab>
                <Tab
                  onClick={changeContent}
                  className={classes.navbarItem}
                  label="ویژگی‌های سامانه"
                  classes={{
                    wrapper: classes.wrapper,
                    selected: classes.selected,
                  }}
                ></Tab>
                <Tab
                  onClick={changeContent}
                  className={classes.navbarItem}
                  classes={{
                    wrapper: classes.wrapper,
                    selected: classes.selected,
                  }}
                  label=" پشتیبانی و تماس"
                ></Tab>
              </Tabs>
            </Grid>
            <Grid container className={classes.footer}>
              <Grid item>
                ©تمام حقوق مادی و معنوی این سامانه متعلق به کارگزاری دانایان می
                باشد.
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={clsx(
              classes.content,
              !expandContent ? classes.expandContentI : classes.expandContentII
            )}
          >
            {value === 0 && (
              <LoginForm {...props} setPage={setValue}></LoginForm>
            )}
            {value === 1 && <ForgetPassword {...props} setPage={setValue} />}
            {/* {value === 2 && <SignUp />} */}
            {value === 2 && <LoginFeatures></LoginFeatures>}
            {/* {value === 4 && <About></About>} */}
            {value === 3 && <Contact></Contact>}
          </Grid>
        </Grid>
      ) : (
        <Grid container className={clsx(classes.root, classes.rootMobile)}>
          <Grid item className={classes.posterMobile}>
            <img src={mobilePoster} alt="" className={classes.video} />
          </Grid>
          <Grid item>
            <Grid container className={classes.mainMobile}>
              <Grid item xs={12} className={classes.boxMobile}>
                {value === 0 && <LoginForm {...props} setPage={setValue} />}
                {value === 1 && (
                  <ForgetPassword {...props} setPage={setValue} />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.copyRightMobile}>
            ©تمام حقوق مادی و معنوی این سامانه متعلق به کارگزاری دانایان می
            باشد.
          </Grid>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
  };
};

export default connect(mapStateToProps)(Login);
