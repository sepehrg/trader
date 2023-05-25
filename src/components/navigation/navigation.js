import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import LineIcon from "../UI/icons/line";
import SettingIcon from "../UI/icons/setting";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/logo4.png";
import logoBlack from "../../assets/images/logo1.png";
import logofaramin from "../../assets/images/logofaramin.png";
import logoDanayanBroker from "../../assets/images/logoDanayanBroker.png";
import Link from "../UI/Link/Link";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import navigationData from "./navigationData";
import style from "../../shared/style";
import { connect } from "react-redux";
import useDevice from "../../hooks/useDevice";
import { useHistory } from "react-router-dom";
import Drawer from "../UI/drawer/drawer";
import * as actions from "../../store/actions/index";
import CompassIcon from "../UI/icons/compass";
import appInfo from "../../../package.json";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    height: "100%",
    flexWrap: "nowrap",
    position: "relative",
  },
  level1: {
    height: "100%",
    paddingTop: 10,
    paddingBottom: "3px",
    justifyContent: "space-between",
    flexDirection: "column",
    textAlign: "center",
    flexWrap: "nowrap",
    overflowX: "hidden",
  },
  level2Item: {
    height: "100%",
    backgroundColor: theme.palette.background.main,
    zIndex: "150",
    position: "relative",
    transition: "1s",
  },
  level2: {
    height: "100%",
    borderLeft: `2px solid ${theme.palette.border.primary}`,
    paddingTop: "45px",
    paddingBottom: "10px",
    backgroundColor: theme.palette.border.secondary,
    flexDirection: "column",
    flexWrap: "nowrap",
    overflowX: "hidden",
    transition: "1s",
  },
  grouped: {
    padding: "4px 3px 4px 2px",
    justifyContent: "center",
    flexDirection: "column",
  },
  btnLevel1: {
    margin: "auto",
    borderRadius: 0,
    marginTop: "2px",
    marginBottom: "2px",
    fill: theme.palette.icon.primary,
    padding: 0,
    width: "100%",
    height: 50,
    transition: "none",
    "&:hover $icon": {
      fill: theme.palette.primary.main,
    },
    "&:hover $seoIcon": {
      fill: theme.palette.primary.main,
    },
  },
  btnLevel2: {
    borderRadius: 7,
    padding: 7,
    transition: "0.3s",
    justifyContent: "flex-start",
    width: "100%",
    "&:hover $icon": {
      fill: theme.palette.primary.main,
    },
    "&:hover $label": {
      color: theme.palette.primary.main,
    },
  },
  logo: {
    width: 36,
  },
  copyright: {
    opacity: 0.6,
    color: theme.palette.text.secondary,
    transition: ["", ".3s", "ease-in-out"],
    fontSize: ".7rem",
    marginTop: "12px",
    justifyContent: "center",
    flexDirection: "column",
    "& $logo": {
      width: 25,
      marginBottom: "-2px",
    },
    "&:hover": {
      opacity: 1,
    },
  },
  collapseBtn: {
    position: "absolute",
    bottom: "7%",
    left: -5,
    backgroundColor: theme.palette.background.box,
    border: `2px solid ${theme.palette.border.primary}`,
    zIndex: "200",
    borderRadius: 6,
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover $icon": {
      stroke: theme.palette.primary.main,
    },
  },
  lineIcon: {
    width: 9,
    height: 30,
    stroke: theme.palette.text.primary,
    strokeWidth: 15,
    paddingLeft: 4,
    verticalAlign: "middle",
    padding: `${theme.spacing(3)}px 0px`,
    fill: "none",
  },
  icon: {},
  seoIcon: {
    stroke: "none",
    fill: theme.palette.icon.primary,
    width: 28,
    height: 28,
    margin: -1.5,
  },
  collapsed: {
    width: 50,
  },
  expanded: {
    width: 150,
  },
  label: {
    fontSize: 11,
    whiteSpace: "nowrap",
    marginRight: `${theme.spacing(4)}px`,
    color: theme.palette.text.secondary,
    transition: "1s",
    transformOrigin: "center right",
    transform: "scale(1)",
  },
  title: {
    fontSize: 11,
    whiteSpace: "nowrap",
    marginRight: `${theme.spacing(4)}px`,
    color: theme.palette.text.primary,
    textAlign: "right",
    transition: "1s",
    height: 19,
    overflow: "hidden",
    transformOrigin: "center right",
    transform: "scale(1)",
  },
  hideLabel: {
    transform: "scale(0)",
    transition: "1s",
  },
  hideTitle: {
    transform: "scale(0)",
    transition: "1s",
  },
  active: {
    "& $icon": {
      fill: theme.palette.primary.main,
    },
    "& $btnLevel1": {
      backgroundColor: theme.palette.border.secondary,
      "&:before": {
        content: "''",
        position: "absolute",
        top: -30,
        left: 0,
        width: 30,
        height: 30,
        borderBottomLeftRadius: "50%",
        boxShadow: `0 15px 0 0px ${theme.palette.border.secondary}`,
        zIndex: -1,
      },
      "&:after": {
        content: "''",
        position: "absolute",
        bottom: -30,
        left: 0,
        width: 30,
        height: 30,
        borderTopLeftRadius: "50%",
        boxShadow: `0 -15px 0 0px ${theme.palette.border.secondary}`,
        zIndex: -1,
      },
    },
    "& $btnLevel2": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
    "& $seoIcon": {
      fill: theme.palette.primary.main,
    },
    "& $label": {
      color: theme.palette.primary.main,
    },
    "& $submenuTitle": {
      color: theme.palette.primary.main,
    },
    "& $iconMobile": {
      stroke: theme.palette.primary.main,
    },
  },
  tabBar: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.main,
  },
  tabBarItem: {
    flexDirection: "column",
    textAlign: "center",
    width: 48,
  },
  submenuSection: {
    flexDirection: "column",
  },
  groupTitle: {
    textAlign: "center",
    fontSize: 12,
    color: theme.palette.text.secondary,
    margin: "10px 0",
  },
  sectionItems: {
    flexDirection: "row-reverse",
  },
  linkItem: {
    backgroundColor: theme.palette.background.box,
    borderRadius: 8,
    border: `1px solid ${theme.palette.border.primary}`,
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  iconMobile: {
    width: 22,
    height: 22,
    stroke: theme.palette.text.secondary,
    strokeWidth: 0.5,
  },
  tabBarItemTitle: {
    color: `${theme.palette.text.secondary}77`,
    marginTop: 1,
  },
  submenuTitle: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  dialogContent: {
    padding: "0 16px 28px 16px",
    overflowY: "scroll",
  },
  fullWidth: {
    width: "100%",
  },
  linkItemBtn: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperAnchorBottom: {
    marginBottom: 48,
    overflow: "hidden",
  },
  drawerRoot: {
    zIndex: "1200 !important",
  },
  ribbonTabBar: {
    position: "absolute",
    top: -19,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
  ribbonFill: {
    fill: theme.palette.background.box,
  },
  ribbonStroke: {
    fill: theme.palette.border.primary,
  },
  mainMenu: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 50,
    height: 46,
    width: 46,
    justifyContent: "center",
    marginTop: -14,
    "& $iconMobile": {
      fill: "#fff",
      stroke: "#fff",
      height: 26,
      width: 26,
    },
  },
}));

const Navigation = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();
  const history = useHistory();

  const [location, setLocation] = useState(window.location.pathname);
  const [collapse, setCollapse] = useState(true);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [submenuContent, setSubmenuContent] = useState("");

  useEffect(() => {
    navigationData.forEach((nav) =>
      nav.children.forEach((group) => {
        group.children.forEach((page) => {
          if (page.link === location) props.onSelect(page);
        });
      })
    );
  }, []);

  const getIcon = (Component) => {
    return (
      <Component
        className={clsx(classes.icon, device.isMobile && classes.iconMobile)}
      />
    );
  };

  const toggleCollapse = () => {
    setCollapse(!collapse);
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  };

  const mainMenuMobileClickHandler = (item) => {
    if (item.children.length > 0) {
      if (isSubmenuOpen) setIsSubmenuOpen(false);
      else {
        setSubmenuContent(createMobileSubmenu(item));
        setIsSubmenuOpen(true);
      }
    } else {
      history.push(item.link);
      props.onSelect(item);
      setIsSubmenuOpen(false);
    }
  };

  const subMenuMobileClickHandler = (item) => {
    props.onSelect(item);
    setIsSubmenuOpen(false);
  };

  const mainMenuClickHandler = (item) => {
    setLocation(item.link);
    if (!item.children.length) {
      history.push(item.link);
      props.onSelect(item);
    }
    props.setIsTourOpen(false);
  };

  const subMenuClickHandler = (item) => {
    props.onSelect(item);
    props.setIsTourOpen(false);
  };

  const aboutHandler = () => {
    window.open("https://www.faramingostar.com", "_blank");
  };

  const menuIsVisible = (m) =>
    !m.accessKey ||
    (m.accessKey && !props.permissions.includes(m.accessKey) && m.showable) ||
    (m.accessKey && props.permissions.includes(m.accessKey));

  const createMobileSubmenu = (item) => (
    <Grid item className={classes.dialogContent}>
      {item.children.map(
        (n, i) =>
          n.children
            .filter((n) => !n.isDesktopOnly)
            .some((c) => props.permissions.includes(c.accessKey)) && (
            <Grid item key={i}>
              <Grid container className={classes.submenuSection}>
                <Grid item className={classes.groupTitle}>
                  {n.title}
                </Grid>
                <Grid item>
                  <Grid container className={classes.sectionItems} spacing={4}>
                    {n.children
                      .filter((n) => !n.isDesktopOnly)
                      .map(
                        (c, i) =>
                          (!c.accessKey ||
                            (c.accessKey &&
                              props.permissions.includes(c.accessKey))) && (
                            <Grid item xs={3} key={i}>
                              <Grid container>
                                <Grid item xs={12} className={classes.linkItem}>
                                  <Link
                                    exact
                                    activeClassName={classes.active}
                                    link={c.link}
                                    onClick={() => subMenuMobileClickHandler(c)}
                                    className={classes.linkItemBtn}
                                  >
                                    <Grid container spacing={4}>
                                      <Grid item xs={12}>
                                        {getIcon(c.icon)}
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        className={classes.submenuTitle}
                                      >
                                        {c.title}
                                      </Grid>
                                    </Grid>
                                  </Link>
                                </Grid>
                              </Grid>
                            </Grid>
                          )
                      )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
      )}
    </Grid>
  );

  return (
    <>
      {device.isNotMobile ? (
        <Grid container className={classes.root}>
          <Grid item style={{ width: 50 }}>
            <Grid
              container
              className={clsx(classes.level1, classes.scrollbarY)}
            >
              <Grid item>
                <img
                  className={classes.logo}
                  src={theme.palette.type === "dark" ? logo : logoBlack}
                  alt=""
                />
              </Grid>
              <Grid item></Grid>
              <Grid item>
                {navigationData
                  .filter((n) => !n.isMobileOnly)
                  .map(
                    (n, i) =>
                      (!n.accessKey ||
                        (n.accessKey &&
                          props.permissions.includes(n.accessKey))) && (
                        <Link
                          strict
                          key={i}
                          tooltipPlacement="left"
                          title={n.title}
                          link="#"
                          onClick={() => mainMenuClickHandler(n)}
                          buttonClassName={classes.btnLevel1}
                          activeClassName={clsx(
                            n.link === "/" + location.split("/")[1] &&
                              classes.active
                          )}
                        >
                          {getIcon(n.icon)}
                        </Link>
                      )
                  )}
              </Grid>
              <Grid item></Grid>
              <Grid item></Grid>
              <Grid item>
                <Link
                  tooltipPlacement="left"
                  title="تنظیمات"
                  onClick={() => props.onSelect({ modal: "themeModal" })}
                  buttonClassName={classes.btnLevel1}
                >
                  <SettingIcon className={classes.icon}></SettingIcon>
                </Link>
                <Link
                  tooltipPlacement="left"
                  title="راهنما"
                  onClick={() => {
                    props.setIsTourOpen(true);
                  }}
                  buttonClassName={classes.btnLevel1}
                >
                  <CompassIcon className={classes.icon}></CompassIcon>
                </Link>
                <Grid container className={classes.copyright}>
                  <Grid item>
                    <Link
                      tooltipPlacement="left"
                      title="طراحی و توسعه توسط شرکت راهکارهای هوشمند فرامین گستر"
                      onClick={aboutHandler}
                    >
                      <img className={classes.logo} src={logofaramin} alt="" />
                    </Link>
                  </Grid>
                  <Grid item>v {appInfo.version}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {navigationData.find(
            (item) => item.link === "/" + location.split("/")[1]
          )?.children.length > 0 && (
            <>
              <Grid
                item
                className={clsx(
                  classes.level2Item,
                  device.isBigScreen && !collapse
                    ? classes.expanded
                    : classes.collapsed
                )}
              >
                {/* nav 2 */}
                <Grid
                  container
                  className={clsx(classes.level2, classes.scrollbarY)}
                >
                  {navigationData
                    .find((n) => n.link === "/" + location.split("/")[1])
                    .children.map(
                      (n, i) =>
                        n.children
                          .filter((n) => !n.isMobileOnly)
                          .some((c) =>
                            props.permissions.includes(c.accessKey)
                          ) && (
                          <Grid item key={i}>
                            <Grid
                              container
                              className={classes.grouped}
                              spacing={2}
                            >
                              <Grid item className={classes.fullWidth}>
                                <Typography
                                  className={clsx(
                                    classes.title,
                                    collapse && classes.hideTitle
                                  )}
                                >
                                  {device.isBigScreen && n.title}
                                </Typography>
                              </Grid>
                              {n.children
                                .filter((n) => !n.isMobileOnly)
                                .map(
                                  (c, i) =>
                                    menuIsVisible(c) && (
                                      <Grid
                                        item
                                        key={i}
                                        className={clsx(
                                          classes.item,
                                          classes.fullWidth
                                        )}
                                      >
                                        <Link
                                          exact
                                          activeClassName={classes.active}
                                          tooltipPlacement="left"
                                          title={c.title}
                                          link={c.link}
                                          onClick={() => subMenuClickHandler(c)}
                                          buttonClassName={classes.btnLevel2}
                                        >
                                          {getIcon(c.icon)}
                                          {device.isBigScreen && (
                                            <Typography
                                              className={clsx(
                                                classes.label,
                                                collapse && classes.hideLabel
                                              )}
                                            >
                                              {c.title}
                                            </Typography>
                                          )}
                                        </Link>
                                      </Grid>
                                    )
                                )}
                            </Grid>
                          </Grid>
                        )
                    )}
                </Grid>
              </Grid>
              {device.isBigScreen && (
                <Grid
                  item
                  className={classes.collapseBtn}
                  onClick={toggleCollapse}
                >
                  <LineIcon className={classes.lineIcon}></LineIcon>
                </Grid>
              )}
            </>
          )}
        </Grid>
      ) : (
        <>
          <Grid container className={classes.tabBar}>
            {navigationData
              .filter((n) => !n.isDesktopOnly)
              .map(
                (n, i) =>
                  (!n.accessKey ||
                    (n.accessKey &&
                      props.permissions.includes(n.accessKey))) && (
                    <Grid item key={i}>
                      <Link
                        strict
                        key={i}
                        onClick={() => mainMenuMobileClickHandler(n)}
                        activeClassName={classes.active}
                      >
                        <Grid
                          container
                          className={clsx(
                            classes.tabBarItem,
                            n.mainMenu && classes.mainMenu
                          )}
                        >
                          <Grid item>{getIcon(n.icon)}</Grid>
                          {!n.mainMenu && (
                            <Grid item className={classes.tabBarItemTitle}>
                              {n.title}
                            </Grid>
                          )}
                        </Grid>
                      </Link>
                    </Grid>
                  )
              )}
          </Grid>
          <div className={classes.ribbonTabBar}>
            <svg
              viewBox="-470.7 282.1 233.4 53.8"
              width="85px"
              className={classes.ribbon}
            >
              <g>
                <path
                  className={classes.ribbonFill}
                  d="M-242.4,335.9c-39-13.2-68.2-52.3-111.6-52.3c-43.5,0-72.7,39.1-111.6,52.3H-242.4z"
                />
                <path
                  className={classes.ribbonStroke}
                  d="M-455.2,333.3c11.9-5.5,23.1-12.9,33.9-20.3c20.4-13.7,41.6-27.9,67.2-27.9c25.6,0,45.8,13.6,67.1,27.9
	c10.9,7.3,22.1,14.8,34,20.3h7.7c-14.3-5.4-27.4-14.2-40.1-22.8c-20.8-14-42.3-28.4-68.8-28.4c-26.6,0-48.1,14.5-68.9,28.5
	c-12.7,8.6-25.8,17.3-40,22.7H-455.2z"
                />
              </g>
            </svg>
          </div>
          <Drawer
            anchor="bottom"
            open={isSubmenuOpen}
            onClose={() => setIsSubmenuOpen(false)}
            onOpen={() => setIsSubmenuOpen(false)}
            bottomClassName={classes.paperAnchorBottom}
            drawerClassName={classes.drawerRoot}
            showClose
          >
            {submenuContent}
          </Drawer>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
    openedModals: state.app.openedModals,
    permissions: state.account.permissions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsTourOpen: (state) => dispatch(actions.setIsTourOpen(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
