import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "../../UI/Link/Link";
import { makeStyles } from "@material-ui/core/styles";
// import useDevice from "../../../hooks/useDevice";
import HamburgerIcon from "../../UI/icons/hamburger";
import Drawer from "../../UI/drawer/drawer";
// import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MoreIcon from "../../UI/icons/more";
import SignOutIcon from "../../UI/icons/signOut";
import UserIcon from "../../UI/icons/user";
import KeyIcon from "../../UI/icons/key";
import MessageIcon from "../../UI/icons/message";
import SettingIcon from "../../UI/icons/setting";
import HelpIcon from "../../UI/icons/help";
// import logofaramin from "../../../assets/images/logofaramin.png";
import logoDanayanBroker from "../../../assets/images/logoDanayanBroker.png";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Messages from "../../messages/messages";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    flexWrap: "nowrap",
  },
  mobileIcon: {
    fill: "#fff",
  },
  main: {
    flexDirection: "column",
  },
  header: {
    flexDirection: "column",
  },
  headerBg: {
    backgroundColor: theme.palette.primary.main,
    height: 115,
    overflow: "hidden",
  },
  headerBgImg: {
    width: "100%",
    height: "100%",
    filter: "opacity(0.3)",
    objectFit: "cover",
  },
  userAvatar: {
    width: "64px",
    height: "64px",
    border: `2px solid ${theme.palette.border.primary}`,
    borderRadius: "18px",
  },
  colorDefault: {
    backgroundColor: theme.palette.border.bar,
  },
  userInfo: {
    marginTop: -50,
    padding: 20,
  },
  username: {
    margin: "35px 10px 0 0",
    fontSize: 14,
  },
  menu: {
    padding: 10,
  },
  menuItem: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    minHeight: 46,
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.border.primary}`,
    },
  },
  menuItemIcon: {
    height: 24,
    marginLeft: 7,
    fill: theme.palette.text.secondary,
    strokeWidth: 0.5,
    stroke: theme.palette.text.secondary,
  },
  menuItemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  about: {
    display: "flex",
    alignItems: "center",
  },
  signOutContainer: {
    padding: 10,
    flexDirection: "column",
  },
  signOut: {
    justifyContent: "center",
    borderTop: `1px solid ${theme.palette.border.primary}`,

    fontSize: 14,
    color: theme.palette.text.secondary,
    paddingTop: 10,
  },
  menuItemMoreIcon: {
    transform: "rotate(-90deg)",
    height: 18,
    width: 18,
  },
}));

const HamburgerMenu = (props) => {
  const classes = useStyles();
  // const device = useDevice();
  const history = useHistory();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const dialogeToggleHandler = () => {
    setDialogIsOpen(!dialogIsOpen);
  };

  useEffect(() => {
    if (props.userAccountInfo)
      setProfilePicture(
        "data:image/png;base64," + props.userAccountInfo.ProfilePic
      );
  }, [props.userAccountInfo]);

  useEffect(() => {
    props.onMenuItemSelect(
      menuItems.find((item) => item.link === window.location.pathname)
    );
  }, []);

  const menuItemClickHandler = (item) => {
    // props.setBackButton(true);
    // props.setPageTitle(item.title);
    props.onMenuItemSelect(item);
    // if (history.location.pathname !== item.link)
    history.push(item.link);
    setDialogIsOpen(false);
  };

  const menuItems = [
    {
      title: "اطلاعات کاربری",
      link: "/profile",
      icon: <UserIcon className={classes.menuItemIcon} />,
    },
    {
      title: "تغییر رمز عبور",
      link: "/passwordChange",
      icon: <KeyIcon className={classes.menuItemIcon} />,
    },
    {
      title: "پیام‌ها",
      link: "/messages",
      icon: <MessageIcon className={classes.menuItemIcon} />,
      component: <Messages />,
    },
    {
      title: "تنظیمات",
      link: "/setting",
      icon: <SettingIcon className={classes.menuItemIcon} />,
    },
    // {
    //   title: "راهنما",
    //   link: "/help",
    //   icon: <HelpIcon className={classes.menuItemIcon} />,
    // },
    {
      title: "درباره ما",
      link: "/about",
      icon: (
        <img className={classes.menuItemIcon} src={logoDanayanBroker} alt="" />
      ),
    },
  ];

  return (
    <>
      <Drawer
        anchor="right"
        open={dialogIsOpen}
        onClose={dialogeToggleHandler}
        onOpen={dialogeToggleHandler}
      >
        <Grid container className={classes.root}>
          <Grid item>
            <Grid container className={classes.main}>
              <Grid item>
                <Grid container className={classes.header}>
                  <Grid item className={classes.headerBg}>
                    {props.userAccountInfo?.ProfilePic && (
                      <img
                        className={classes.headerBgImg}
                        src={profilePicture}
                        alt=""
                      />
                    )}
                  </Grid>
                  <Grid item className={classes.userInfo}>
                    <Grid container>
                      <Grid item>
                        <Avatar
                          className={classes.userAvatar}
                          classes={{ colorDefault: classes.colorDefault }}
                          src={profilePicture}
                        />
                      </Grid>
                      <Grid item className={classes.username}>
                        {props.userAccountInfo?.IdentityTitle}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.menu}>
                <MenuList classes={{ padding: classes.padding }}>
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.link}
                      onClick={() => menuItemClickHandler(item)}
                      className={classes.menuItem}
                    >
                      <Grid container className={classes.menuItemContainer}>
                        <Grid item>
                          {item.icon}
                          {item.title}
                        </Grid>
                        <Grid item>
                          {item.component}
                          <MoreIcon className={classes.menuItemMoreIcon} />
                        </Grid>
                      </Grid>
                    </MenuItem>
                  ))}
                </MenuList>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container className={classes.signOutContainer}>
              <Link onClick={props.logout}>
                <Grid item>
                  <Grid container className={classes.signOut}>
                    <SignOutIcon className={classes.menuItemIcon}></SignOutIcon>
                    <Grid item>خروج</Grid>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
      <Link onClick={dialogeToggleHandler}>
        <HamburgerIcon className={classes.mobileIcon} />
      </Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userAccountInfo: state.account.userAccountInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
    // setBackButton: (state) => dispatch(actions.setBackButton(state)),
    // setPageTitle: (title) => dispatch(actions.setPageTitle(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu);
