import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CameraIcon from "../UI/icons/camera";
import Avatar from "@material-ui/core/Avatar";
import Link from "../UI/Link/Link";
import Dialog from "../UI/dialog/dialog";
import PasswordChange from "./passwordChange/passwordChange";
import Tabs from "../UI/Tab/Tabs";
import Tab from "../UI/Tab/Tab";
import TabPanel from "../UI/Tab/TabPanel";
import Input from "../UI/Input/Input";
import * as actions from "../../store/actions/index";
import DeleteIcon from "../UI/icons/delete";
import clsx from "clsx";
import IdentityService from "../../services/identityService";
import useDevice from "../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "5px",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    padding: `${theme.spacing(8)}px ${theme.spacing(5)}px`,
  },
  avatar: {
    justifyContent: "center",
    position: "relative",
  },
  userAvatar: {
    width: "94px",
    height: "94px",
    border: `2px solid ${theme.palette.border.primary}`,
    borderRadius: "22px",
  },
  colorDefault: {
    backgroundColor: theme.palette.border.bar,
  },
  changeAvatarBtn: {
    height: 28,
    width: 28,
    backgroundColor: `${theme.palette.border.primary}cc`,
    borderRadius: 50,
    padding: 5,
    margin: "0 2px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      // fill: theme.palette.border.primary,
      fill: "#ffffff",
    },
  },
  deleteAvatarBtn: {
    "&:hover": {
      backgroundColor: theme.palette.color.red,
      // fill: theme.palette.border.primary,
      fill: "#ffffff",
    },
  },
  avatarBtn: {
    position: "absolute",
    left: "42%",
    bottom: -12,
    display: "flex",
  },
  user: {
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "column",
    textAlign: "center",
  },
  userNickName: {
    color: theme.palette.text.primary,
    fontSize: 16,
  },
  userName: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  userInfo: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 7,
    fontSize: 11,
    marginTop: 7,
  },
  gridItems: {
    padding: "0 10px",
    borderBottom: `2px solid ${theme.palette.background.box}`,
  },
  gridItem: {
    display: "flex",
    minHeight: 38,
    justifyContent: "space-between",
  },
  gridTh: {
    flexDirection: "column",
    textAlign: "right",
    margin: "auto 0",
    color: theme.palette.text.secondary,
  },
  gridTd: {
    flexDirection: "column",
    textAlign: "left",
    margin: "auto 0",
  },
  passwordChangeBtn: {
    color: theme.palette.primary.main,
    marginTop: 10,
  },
  iconBtnEdit: {
    width: 14,
    height: 14,
    fill: theme.palette.primary.main,
  },
  AvatarImg: {
    minHeight: 200,
    minWidth: 400,
    border: `2px dashed ${theme.palette.border.bar}`,
    borderRadius: 15,
  },
  tab: {
    width: "50%",
    minWidth: "auto",
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    fontSize: 11,
  },
  innerTabs: {
    width: "100%",
  },

  rootMobile: {
    flexDirection: "column",
    height: "100%",
  },
  headerMobile: {
    backgroundColor: theme.palette.primary.main,
    height: 60,
    marginTop: -26,
  },
  avatarMobile: {
    marginTop: -40,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30,
  },
  userMobile: {
    marginTop: 10,
  },
  profileInfoContainerMobile: {
    flexDirection: "column",
    padding: "0 20px",
    overflow: "hidden scroll",
    height: "100%",
    flexWrap: "nowrap",
  },
  gridItemMobile: {
    minHeight: 40,
    borderBottom: `1px solid ${theme.palette.border.bar}99`,
    "&:not(:last-child)": {},
  },
  gridThMobile: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  gridTdMobile: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  changeAvatarBtnMobile: {
    height: 18,
    width: 18,
    margin: "0 4px",
  },
  avatarBtnMobile: {
    display: "flex",
    backgroundColor: `${theme.palette.border.bar}99`,
    borderRadius: 15,
    padding: "5px 10px",
    marginTop: 10,
  },
  profileInfoMobile: {
    maxHeight: "calc(100% - 154px - 60px + 26px)",
    backgroundColor: theme.palette.background.box,
  },
}));

const ProfileModal = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const [selectedTab, setSelectedTab] = useState(
    props.userMustChangePassword ? 1 : 0
  );
  const [profilePicture, setProfilePicture] = useState("");
  const inputFile = useRef(null);

  useEffect(() => {
    if (props.userAccountInfo)
      setProfilePicture(
        "data:image/png;base64," + props.userAccountInfo.ProfilePic
      );
  }, [props.userAccountInfo]);

  const tabChangeHandler = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    const form = new FormData();
    form.append("file", file);
    IdentityService.uploadProfilePicture(form, (status, data) => {
      if (data.Success) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          setProfilePicture(e.target.result);
          // props.onProfilePictureChange(e.target.result);
          props.updateUserAccountInfo({
            ProfilePic: e.target.result.split(";base64,")[1],
          });
        };
      } else {
        props.notifyError(data.Message);
      }
    });
  };

  const deleteProfilePictureHandler = () => {
    IdentityService.deleteProfilePicture((status, data) => {
      setProfilePicture("");
      // props.onProfilePictureChange("");
      props.updateUserAccountInfo({ ProfilePic: "" });
    });
  };

  const passwordChangeSuccessHandler = () => {
    props.updateUser({ UserMustChangePassword: false });
  };

  const userFields = [
    {
      title: "نام کاربری",
      field: "Username",
    },
    {
      title: "کد بورسی",
      field: "TseAccountCode",
    },
    {
      title: "شناسه حساب",
      field: "TseAccountNumber",
    },
    {
      title: "تلفن ثابت",
      field: 8,
    },
    {
      title: "تلفن همراه",
      field: 4,
    },
    {
      title: "پست الکترونیک",
      field: 32,
    },
  ];

  const profileInfo = (
    <>
      {props.userAccountInfo && (
        <Grid
          container
          className={clsx(
            device.isMobile && classes.profileInfoContainerMobile
          )}
        >
          {userFields.map((col, i) => (
            <Grid
              item
              className={clsx(device.isNotMobile && classes.gridItems)}
              sm={12}
              key={i}
            >
              <Grid
                container
                className={clsx(
                  classes.gridItem,
                  device.isMobile && classes.gridItemMobile
                )}
              >
                <Grid
                  item
                  className={clsx(
                    classes.gridTh,
                    device.isMobile && classes.gridThMobile
                  )}
                >
                  {col.title}
                </Grid>
                <Grid
                  item
                  className={clsx(
                    classes.gridTd,
                    device.isMobile && classes.gridTdMobile
                  )}
                >
                  {typeof col.field !== "number"
                    ? props.userAccountInfo[col.field]
                    : props.userAccountInfo.IdentityContactInfoModels?.find(
                        (c) => c.IdentityContactTypeId === col.field
                      )?.Contact}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );

  return (
    <>
      {props.userAccountInfo &&
        (device.isNotMobile ? (
          <Dialog
            title={
              props.userMustChangePassword
                ? "تغییر رمز عبور"
                : "تنظیمات پروفایل"
            }
            open={props.open}
            onClose={props.onClose}
            fullWidth
            maxWidth="xs"
            hideClose={props.userMustChangePassword}
            disableBackdropClick={props.userMustChangePassword}
            disableEscapeKeyDown={props.userMustChangePassword}
          >
            <Grid container className={classes.root}>
              <>
                {!props.userMustChangePassword && (
                  <>
                    <Grid item>
                      <Grid container className={classes.avatar}>
                        <Grid item>
                          <Avatar
                            className={classes.userAvatar}
                            classes={{ colorDefault: classes.colorDefault }}
                            src={profilePicture}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            type="file"
                            ref={inputFile}
                            style={{ display: "none" }}
                            onChange={fileChangeHandler}
                          ></Input>
                          <Grid container>
                            <Grid item className={classes.avatarBtn}>
                              <Link onClick={() => inputFile.current.click()}>
                                <CameraIcon
                                  className={classes.changeAvatarBtn}
                                />
                              </Link>
                              <Link onClick={deleteProfilePictureHandler}>
                                <DeleteIcon
                                  className={clsx(
                                    classes.changeAvatarBtn,
                                    classes.deleteAvatarBtn
                                  )}
                                />
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container className={classes.user}>
                        <Grid item className={classes.userNickName}>
                          {props.userAccountInfo.IdentityTitle}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Tabs
                          orientation="horizontal"
                          value={selectedTab}
                          onChange={tabChangeHandler}
                          className={classes.innerTabs}
                          indicatorColor="primary"
                        >
                          <Tab
                            className={classes.tab}
                            label="اطلاعات کاربر"
                            id="tab-0"
                          ></Tab>
                          <Tab
                            className={classes.tab}
                            label="تغییر رمز عبور"
                            id="tab-1"
                          ></Tab>
                        </Tabs>
                      </Grid>
                    </Grid>
                  </>
                )}
                <Grid item>
                  <>
                    {!props.userMustChangePassword && (
                      <TabPanel
                        value={selectedTab}
                        index={0}
                        className={classes.userInfo}
                      >
                        {profileInfo}
                      </TabPanel>
                    )}
                    <TabPanel value={selectedTab} index={1}>
                      <PasswordChange
                        userMustChangePassword={props.userMustChangePassword}
                        onPasswordChangeSuccess={passwordChangeSuccessHandler}
                        onClose={props.onClose}
                      />
                    </TabPanel>
                  </>
                </Grid>
              </>
            </Grid>
          </Dialog>
        ) : (
          <Grid container className={classes.rootMobile}>
            <Grid item className={classes.headerMobile}></Grid>
            <Grid item>
              <Grid
                container
                className={clsx(
                  classes.avatar,
                  device.isMobile && classes.avatarMobile
                )}
              >
                <Grid item>
                  <Input
                    type="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                    onChange={fileChangeHandler}
                  ></Input>
                  <Link onClick={() => inputFile.current.click()}>
                    <Avatar
                      className={classes.userAvatar}
                      classes={{ colorDefault: classes.colorDefault }}
                      src={profilePicture}
                    />
                  </Link>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    className={clsx(
                      classes.user,
                      device.isMobile && classes.userMobile
                    )}
                  >
                    <Grid item className={classes.userNickName}>
                      {props.userAccountInfo.IdentityTitle}
                    </Grid>
                  </Grid>
                </Grid>

                {!props.userAccountInfo?.ProfilePic ? (
                  <Grid item className={classes.avatarBtnMobile}>
                    <Input
                      type="file"
                      ref={inputFile}
                      style={{ display: "none" }}
                      onChange={fileChangeHandler}
                    ></Input>
                    <Grid container>
                      <Grid item>
                        <Link onClick={() => inputFile.current.click()}>
                          <CameraIcon
                            className={classes.changeAvatarBtnMobile}
                          />
                          تصویر پروفایل
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item>
                    <Input
                      type="file"
                      ref={inputFile}
                      style={{ display: "none" }}
                      onChange={fileChangeHandler}
                    ></Input>
                    <Grid container>
                      <Grid item className={classes.avatarBtnMobile}>
                        <Link onClick={() => inputFile.current.click()}>
                          <CameraIcon
                            className={classes.changeAvatarBtnMobile}
                          />
                          تغییر تصویر
                        </Link>
                        <Link onClick={deleteProfilePictureHandler}>
                          <DeleteIcon
                            className={classes.changeAvatarBtnMobile}
                          />
                          حذف تصویر
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item className={classes.profileInfoMobile}>
              {profileInfo}
            </Grid>
          </Grid>
        ))}
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
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
    // setUser: (user) => dispatch(actions.setUser(user)),
    updateUser: (user) => dispatch(actions.updateUser(user)),
    setUserAccountInfo: (user) => dispatch(actions.setUserAccountInfo(user)),
    updateUserAccountInfo: (user) =>
      dispatch(actions.updateUserAccountInfo(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
