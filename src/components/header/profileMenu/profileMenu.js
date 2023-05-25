import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import SignOutIcon from "../../UI/icons/signOut";
import UserIcon from "../../UI/icons/user";
import HistoryIcon from "../../UI/icons/history";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import IdentityService from "../../../services/identityService";

const useStyles = makeStyles((theme) => ({
  root: {},
  dropDownMenu: {
    zIndex: "300",
    width: 230,
    marginTop: 5,
  },
  profile: {
    alignItems: "center",
    cursor: "pointer",
    "&:hover $userAvatar": {
      borderColor: theme.palette.primary.main,
    },
  },
  userName: {
    color: theme.palette.text.primary,
    fontSize: "12px",
    transition: "0.3s",
    padding: theme.spacing(5),
  },
  userAvatar: {
    width: "44px",
    height: "44px",
    border: `2px solid ${theme.palette.border.primary}`,
    borderRadius: "12px",
    transition: "0.3s",
    cursor: "pointer",
  },
  // dropDownMenu: {
  //   zIndex: "300",
  //   width: 230,
  // },
  dropDownMenu2: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: theme.palette.border.primary,
  },
  menuItem: {
    padding: theme.spacing(6),
    fontSize: 12,
    transition: "0.3s",
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.background.default}`,
    },
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.box,
    },
    "&:hover $menuItemIcon": {
      fill: theme.palette.primary.main,
    },
  },
  menuItemIcon: {
    height: 20,
    marginLeft: theme.spacing(2),
    fill: theme.palette.text.primary,
  },
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  colorDefault: {
    backgroundColor: theme.palette.border.bar,
  },
  [theme.breakpoints.down("sm")]: {
    userName: {
      backgroundColor: theme.palette.background.paper,
      textAlign: "center",
      padding: 5,
      "&:focus": {
        outline: "none",
      },
    },
  },
}));

const ProfileMenu = (props) => {
  const classes = useStyles();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  let isSubscribed = true;

  const closeMenuHandler = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function menuListKeyDownHandler(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const profileMenuClickHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const profileModalOpen = (event) => {
    props.onProfileModalOpen();
    closeMenuHandler(event);
  };

  const loginReportModalOpen = (event) => {
    props.onLoginReportModalOpen();
    closeMenuHandler(event);
  };

  const profilePictureChangeHandler = (data) => {
    setProfilePicture(data);
  };

  useEffect(() => {
    if (props.userAccountInfo)
      setProfilePicture(
        "data:image/png;base64," + props.userAccountInfo.ProfilePic
      );
  }, [props.userAccountInfo]);

  return (
    <>
      <Grid
        container
        className={classes.profile}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={profileMenuClickHandler}
      >
        <Grid item className={classes.userName}>
          {props.userAccountInfo?.IdentityTitle}
        </Grid>
        <Grid item>
          <Avatar
            className={classes.userAvatar}
            classes={{ colorDefault: classes.colorDefault }}
            src={profilePicture}
          />
        </Grid>
      </Grid>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={classes.dropDownMenu}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.dropDownMenu2}>
              <ClickAwayListener onClickAway={closeMenuHandler}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={menuListKeyDownHandler}
                  classes={{ padding: classes.padding }}
                >
                  <MenuItem
                    onClick={profileModalOpen}
                    className={classes.menuItem}
                  >
                    <UserIcon className={classes.menuItemIcon}></UserIcon>
                    مشاهده پروفایل
                  </MenuItem>
                  <MenuItem
                    onClick={loginReportModalOpen}
                    className={classes.menuItem}
                  >
                    <HistoryIcon className={classes.menuItemIcon}></HistoryIcon>
                    تاریخچه ورود
                  </MenuItem>
                  <MenuItem onClick={props.logout} className={classes.menuItem}>
                    <SignOutIcon className={classes.menuItemIcon}></SignOutIcon>
                    خروج از سیستم
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
