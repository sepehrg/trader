import React, { useState, useEffect, useReducer } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "../../UI/Input/Input";
import clsx from "clsx";
import PasswordStrengthBar from "react-password-strength-bar";
import Button from "../../UI/Button/Button";
import PasswordAdornment from "../../UI/passwordAdornment/passwordAdornment";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Captcha from "../../UI/captcha/captcha";
import { useForm } from "react-hook-form";
import IdentityService from "../../../services/identityService";
import useDevice from "../../../hooks/useDevice";
import PasswordIcon from "../../UI/icons/password";
import ReloadIcon from "../../UI/icons/reload";
import Link from "../../UI/Link/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    maxWidth: 340,
    padding: "0 20px",
    paddingTop: 0,
    margin: "auto",
    flexDirection: "column",
  },
  textField: {
    marginTop: 16,
    width: "100%",
  },
  inputRoot: {
    height: 42,
  },
  scoreWord: {
    fontSize: "10px !important",
  },
  passConfirm: {
    fontSize: 11,
    color: theme.palette.color.red,
    margin: "5px 0",
  },
  action: {
    // width: "100%",
    display: "flex",
    // justifyContent: "flex-end",
  },
  btn: {
    width: "50%",
    height: 36,
    marginRight: 10,
    marginTop: 15,
  },
  acceptBtn: {
    color: theme.palette.color.blue,
    borderColor: theme.palette.color.blue,
  },
  cancelBtn: {
    color: theme.palette.color.red,
    borderColor: theme.palette.color.red,
  },
  captcha: {
    width: "100%",
  },
  captchaCode: {
    justifyContent: "center",
    margin: "10px 0px",
  },
  captchaImage: {
    borderRadius: 4,
    verticalAlign: "middle",
    marginLeft: 4,
  },
  main: {
    flexDirection: "column",
  },
  containerForm: {
    flexDirection: "column",
  },
  containerinput: {
    flexWrap: "nowrap",
    alignItems: "flex-end",
  },
  inputItem: {
    // width: "100%",
    flex: 1,
  },

  rootMobile: {
    maxWidth: 400,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    height: "100%",
    padding: 10,

    overflow: "hidden scroll",
  },
  headerMobile: {
    display: "flex",
    justifyContent: "center",
  },
  passwordIcon: {
    width: 90,
    height: 90,
    fill: theme.palette.primary.main,
  },
  inputRootMobile: {
    height: 48,
  },
  captchaImageMobile: {
    height: 40,
    borderRadius: 6,
    marginLeft: 4,
  },
  adornmentMainMobile: {
    backgroundColor: `${theme.palette.icon.primary}77`,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
    height: 48,
    width: 48,
  },
  adornmentMobile: {
    fill: "#FFF",
  },
  textFieldMobile: {
    marginTop: 0,
  },
  formMobile: {
    height: "100%",
  },
  actionMbile: {
    padding: "10px 0",
  },
  btnMobile: {
    fontSize: 14,
    height: 40,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
    width: "50%",
    margin: "0 5px",
  },
  acceptBtnMobile: {
    backgroundColor: theme.palette.color.blue,
    "&:hover": {
      backgroundColor: theme.palette.color.blue,
    },
  },
  cancelBtnMobile: {
    backgroundColor: theme.palette.color.red,
    "&:hover": {
      backgroundColor: theme.palette.color.red,
    },
  },
  scoreWordMobile: {
    fontSize: "12px !important",
    color: `${theme.palette.text.secondary} !important`,
  },
  sendOtpItem: {
    textAlign: "center",
  },

  sendOtpBtn: {
    width: "100%",
    height: 42,
  },

  sendOtpBtnMobile: {
    width: "100%",
    height: 48,
    margin: 0,
    backgroundColor: `${theme.palette.icon.primary}77`,
  },
}));

const PasswordChange = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();

  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alternateToken, setAlternateToken] = useState(null);

  const { register, handleSubmit, errors, watch, reset, getValues } = useForm();

  useEffect(() => {
    props.setClientId();
  }, []);

  const sendOtp = () => {
    IdentityService.addUpdatePasswordToken(
      { captcha: getValues("captcha"), clientId: props.clientId },
      (status, result) => {
        if (result.Success) {
          setAlternateToken(result.Result);
          props.notifySuccess("کد تایید ارسال شد");
        } else {
          props.notifyError(result.Message);
          props.setClientId();
        }
      }
    );
  };

  const changePassword = (formData) => {
    setLoading(true);
    console.log(formData);
    IdentityService.updateUserPassword(
      {
        ...formData,
        alternateToken,
        clientId: props.clientId,
      },
      (status, result) => {
        if (result.Success) {
          props.notifySuccess("کلمه عبور با موفقیت تغییر یافت");
          props.onPasswordChangeSuccess();
          reset();
        } else {
          props.notifyError(result.Message);
          props.setClientId();
        }
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (errors.confirmPassword) {
      if (errors.confirmPassword.type === "validate")
        setConfirmPasswordError(errors.confirmPassword.message);
      else if (errors.confirmPassword.type === "required")
        setConfirmPasswordError("تکرار کلمه عبور جدید الزامی است");
    }
  }, [errors]);

  const cancelButtonClickHandler = () => {
    if (props.userMustChangePassword) props.logout();
    else props.onClose();
  };

  const initialState = {};
  const reducer = (state, action) => {
    return { ...state, [action.field]: action.visible };
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const barColors = [
    theme.palette.border.bar,
    theme.palette.color.red,
    theme.palette.color.yellow,
    theme.palette.color.blue,
    theme.palette.color.green,
  ];

  return (
    <form
      onSubmit={handleSubmit(changePassword)}
      className={clsx(device.isMobile && classes.formMobile)}
    >
      <Grid
        container
        className={clsx(classes.root, device.isMobile && classes.rootMobile)}
      >
        <Grid item>
          <Grid container className={classes.main}>
            {device.isMobile && (
              <Grid item className={classes.headerMobile}>
                <PasswordIcon className={classes.passwordIcon} />
              </Grid>
            )}
            <Grid item>
              <Grid
                container
                className={classes.containerForm}
                spacing={device.isMobile ? 4 : 0}
              >
                <Grid item>
                  <Grid container className={classes.containerinput}>
                    <Grid item className={classes.inputItem}>
                      <Input
                        name="oldPassword"
                        label="کلمه عبور فعلی"
                        type={state.old ? "text" : "password"}
                        className={clsx(
                          device.isNotMobile
                            ? classes.textField
                            : classes.textFieldMobile
                        )}
                        inputClassName={clsx(
                          device.isNotMobile
                            ? classes.inputRoot
                            : classes.inputRootMobile
                        )}
                        ref={register({ required: true })}
                        error={!!errors.oldPassword}
                        helperText="کلمه عبور فعلی الزامی است"
                        endAdornment={
                          device.isNotMobile && (
                            <PasswordAdornment
                              onClick={(visible) =>
                                dispatch({ field: "old", visible })
                              }
                            />
                          )
                        }
                      />
                    </Grid>
                    {device.isMobile && (
                      <Grid item>
                        <PasswordAdornment
                          onClick={(visible) =>
                            dispatch({ field: "old", visible })
                          }
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container className={classes.containerForm}>
                    <Grid item>
                      <Grid container className={classes.containerinput}>
                        <Grid item className={classes.inputItem}>
                          <Input
                            name="newPassword"
                            label="کلمه عبور جدید"
                            type={state.new ? "text" : "password"}
                            className={clsx(
                              device.isNotMobile
                                ? classes.textField
                                : classes.textFieldMobile
                            )}
                            inputClassName={clsx(
                              device.isNotMobile
                                ? classes.inputRoot
                                : classes.inputRootMobile
                            )}
                            ref={register({ required: true })}
                            error={!!errors.newPassword}
                            helperText="کلمه عبور جدید الزامی است"
                            endAdornment={
                              device.isNotMobile && (
                                <PasswordAdornment
                                  onClick={(visible) =>
                                    dispatch({ field: "new", visible })
                                  }
                                />
                              )
                            }
                          />
                        </Grid>
                        {device.isMobile && (
                          <Grid item>
                            <PasswordAdornment
                              onClick={(visible) =>
                                dispatch({ field: "new", visible })
                              }
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item>
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
                        scoreWordClassName={clsx(
                          device.isNotMobile
                            ? classes.scoreWord
                            : classes.scoreWordMobile
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container className={classes.containerinput}>
                    <Grid item className={classes.inputItem}>
                      <Input
                        name="confirmPassword"
                        label="تکرار کلمه عبور جدید"
                        type={state.confirm ? "text" : "password"}
                        className={clsx(
                          device.isNotMobile
                            ? classes.textField
                            : classes.textFieldMobile
                        )}
                        inputClassName={clsx(
                          device.isNotMobile
                            ? classes.inputRoot
                            : classes.inputRootMobile
                        )}
                        error={
                          errors.confirmPassword?.type === "required" ||
                          (errors.confirmPassword?.type !== "required" &&
                            errors.confirmPassword?.type === "validate")
                        }
                        helperText={confirmPasswordError}
                        ref={register({
                          required: true,
                          validate: (value) =>
                            value === watch("newPassword") ||
                            "کلمه عبور و تکرار آن یکسان نیست",
                        })}
                        endAdornment={
                          device.isNotMobile && (
                            <PasswordAdornment
                              onClick={(visible) =>
                                dispatch({ field: "confirm", visible })
                              }
                            />
                          )
                        }
                      />
                    </Grid>
                    {device.isMobile && (
                      <Grid item>
                        <PasswordAdornment
                          onClick={(visible) =>
                            dispatch({ field: "confirm", visible })
                          }
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container className={classes.containerinput}>
                    <Grid item className={classes.inputItem}>
                      <Input
                        ref={register({ required: true })}
                        name="captcha"
                        label="کد امنیتی"
                        className={clsx(
                          device.isNotMobile
                            ? classes.textField
                            : classes.textFieldMobile
                        )}
                        inputClassName={clsx(
                          device.isNotMobile
                            ? classes.inputRoot
                            : classes.inputRootMobile
                        )}
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
                    </Grid>
                    {device.isMobile && (
                      <Grid item>
                        <Link
                          onClick={props.setClientId}
                          className={classes.adornmentMainMobile}
                        >
                          <ReloadIcon
                            className={classes.adornmentMobile}
                          ></ReloadIcon>
                        </Link>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {/* <Grid item>
                  <Grid container className={classes.containerinput}>
                    <Grid
                      item
                      className={clsx(classes.inputItem, classes.sendOtpItem)}
                    >
                      <Button
                        type="button"
                        variant="outlined"
                        className={clsx(
                          device.isNotMobile ? classes.btn : classes.btnMobile,
                          device.isNotMobile
                            ? classes.acceptBtn
                            : classes.acceptBtnMobile
                        )}
                        onClick={sendOtp}
                      >
                        ارسال کد تایید
                      </Button>
                    </Grid>
                  </Grid>
                </Grid> */}
                <Grid item>
                  <Grid
                    container
                    className={classes.containerinput}
                    spacing={6}
                  >
                    <Grid item className={classes.inputItem}>
                      <Input
                        ref={register({ required: true })}
                        name="otp"
                        label="کد تایید"
                        className={clsx(
                          classes.textField,
                          device.isMobile && classes.textFieldMobile
                        )}
                        inputClassName={clsx(
                          device.isNotMobile
                            ? classes.inputRoot
                            : classes.inputRootMobile
                        )}
                        error={!!errors.otp}
                        helperText="کد تایید الزامی است"
                      />
                    </Grid>
                    <Grid item>
                      <Grid container className={classes.containerinput}>
                        <Grid
                          item
                          className={clsx(
                            classes.inputItem,
                            classes.sendOtpItem
                          )}
                        >
                          <Button
                            type="button"
                            variant="outlined"
                            className={clsx(
                              device.isNotMobile
                                ? classes.sendOtpBtn
                                : clsx(
                                    classes.btnMobile,
                                    classes.sendOtpBtnMobile
                                  ),
                              device.isNotMobile
                                ? classes.acceptBtn
                                : classes.acceptBtnMobile
                            )}
                            onClick={sendOtp}
                          >
                            ارسال کد تایید
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className={clsx(
            classes.action,
            device.isMobile && classes.actionMbile
          )}
        >
          <Button
            type="submit"
            variant="outlined"
            className={clsx(
              device.isNotMobile ? classes.btn : classes.btnMobile,
              device.isNotMobile ? classes.acceptBtn : classes.acceptBtnMobile
            )}
          >
            {loading ? "درحال بررسی..." : "تغییر رمز عبور"}
          </Button>
          <Button
            onClick={cancelButtonClickHandler}
            variant="outlined"
            className={clsx(
              device.isNotMobile ? classes.btn : classes.btnMobile,
              device.isNotMobile ? classes.cancelBtn : classes.cancelBtnMobile
            )}
          >
            انصراف
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    clientId: state.account.clientId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
    logout: () => dispatch(actions.logout()),
    setClientId: () => dispatch(actions.setClientId()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);
