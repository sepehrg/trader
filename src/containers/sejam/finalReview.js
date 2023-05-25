import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import stepLevel from "../../enums/step";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../services/appContext";
import SejamService from "../../services/sejamService";
import { typography, breakpoints } from "@material-ui/system";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
// import Checkbox from "@material-ui/core/Checkbox";
import clsx from "clsx";
import TickIcon from "../../components/UI/icons/tick";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { notifyError } from "../../store/actions/app";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import style from "../../shared/style";
import Checkbox from "../../components/UI/checkbox/checkbox";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  // root: {
  //   width: "100%",
  //   maxHeight: " 620px",

  //   overflow: "auto",
  //   "&::-webkit-scrollbar": {
  //     width: "0.9em",
  //   },
  //   "&::-webkit-scrollbar-track": {
  //     boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  //     webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  //   },
  //   "&::-webkit-scrollbar-thumb": {
  //     backgroundColor: "#555",
  //     outline: "1px solid slategrey",
  //   },
  // },
  root: {
    height: "calc(100% - 100px)",
  },
  header: {
    width: "100%",
  },
  sizeSmall: {
    padding: 6,
  },
  checkboxRoot: {
    color: theme.palette.text.secondary,
  },
  checkboxColorSecondary: {
    "&$checkboxChecked": {
      color: theme.palette.primary.main,
    },
  },
  checkboxChecked: {},
  checkboxIcon: {
    width: 18,
    height: 18,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
  },
  uncheckedIcon: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
  },
  checkedTickIcon: {
    stroke: theme.palette.text.primary,
    strokeWidth: "62",
    width: 14,
    height: 14,
    margin: "auto",
  },
  infoPart: {
    width: "100%",
    padding: "5px 0% 11px",
    position: "relative",
    display: "inline-block",
    textAlign: "center",
  },
  infoLable: {
    width: "33.33%",
    display: "inline-block",
    // color: "#505050",
    fontSize: "14px",
    float: "right",
    padding: "0px 10px 0 0",
    textAlign: "right",
  },
  title: {
    color: "#539bc5",
    borderBottom: "solid 1px #e0e1e3",
    padding: " 0 0 5px 0",
    fontWeight: "600",
    fontSize: "15px",
    textAlign: "center",
  },
  preview: {
    textAlign: "right",
    padding: 20,
  },
  button: {
    // margin: theme.spacing(1),
    // // width: "100%",
    // backgroundColor: "#1e3746",
    // color: "white",
    // boxShadow: "none",
    // height: 42,
    // "&:hover": {
    //   backgroundColor: "#1e3746",
    //   boxShadow: "none",
    //   color: "white",
    // },
  },
  title2: {
    textAlign: "center",
  },
  main: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: 5,
    width: "100%",
    overflow: "hidden auto",
    height: "calc(100% - 60px)",
  },
  header: {
    width: "100%",
    margin: 20,
    fontSize: 14,
  },
  form: {
    padding: "20px 30px",
  },
  submit: {
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.paper,
    padding: "20px 30px",
  },
  submitBtn: {
    justifyContent: "flex-end",
  },
  button: {
    color: theme.palette.color.blue,
    border: `1px solid ${theme.palette.color.blue}`,
    fontSize: 12,
    height: 42,
    width: 162,
  },
  cancelButton: {
    color: theme.palette.color.red,
    border: `1px solid ${theme.palette.color.red}`,
  },
  actions: {
    position: "sticky",
    bottom: 0,
  },
  gridItem: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 12,
  },
  gridTitle: {
    color: theme.palette.text.secondary,
  },
  mainTitle: {
    display: "flex",
    justifyContent: "center",
    fontSize: 14,
  },
  labelCheckbox: {
    fontSize: 11,
  },
  warning: {
    flexDirection: "column",
  },
}));

const FinalReview = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const [agreeState, setAgreeState] = useState(false);
  const unknownError = "خطایی رخ داده است";
  // console.log("state.userSavedStepData", state.userSavedStepData);

  const styleFunction = breakpoints(typography);
  const Box = styled.div`
    ${styleFunction}
  `;
  const confirmPreviewData = async () => {
    await SejamService.sendVerificationCode(
      {
        nationalCode: state.userSavedStepData.Result.Person
          ? state.userSavedStepData.Result.Person.NationalCode
          : "",
        mobileNumber: state.userSavedStepData.Result.Person
          ? state.userSavedStepData.Result.Person.Mobile
          : "",
      },
      (success, result) => {
        if (result && result.Success) {
          nextWizard();
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      }
    );
  };
  const nextWizard = () => {
    window.location.pathname = stepLevel.addInSejam.url;
  };

  const cancel = () => {};
  const getPersonalInformation = async () => {
    await SejamService.getPersonalInformation((success, result) => {
      if (result) {
        dispatch({
          type: "userSavedStepData",
          payload: result,
        });
      }
    });
  };
  useEffect(() => {
    async function fetchData() {
      await getPersonalInformation();
    }

    fetchData();

    dispatch({
      type: "stepWizard",
      payload: stepLevel.finalReview.id,
    });
  }, []);
  const uncheckedIcon = (
    <div className={clsx(classes.checkboxIcon, classes.uncheckedIcon)}></div>
  );
  const checkedIcon = (
    <div className={clsx(classes.checkboxIcon, classes.checkedIcon)}>
      <TickIcon className={classes.checkedTickIcon}></TickIcon>
    </div>
  );

  const profileData = [
    {
      title: "نام",
      value: state.userSavedStepData.Result.Person.FirstName,
    },
    {
      title: "نام خانوادگی",
      value: state.userSavedStepData.Result.Person.LastName,
    },
    {
      title: "نام پدر",
      value: state.userSavedStepData.Result.Person.FatherName,
    },
    {
      title: "کد ملی",
      value: state.userSavedStepData.Result.Person.NationalCode,
    },
    {
      title: "تاریخ تولد",
      value: state.userSavedStepData.Result.Person.BirthDate,
    },
    {
      title: "شماره شناسنامه",
      value: state.userSavedStepData.Result.Person.ShNumber,
    },
    {
      title: "سری و سریال شناسنامه",
      value: (
        <span>
          {" "}
          {state.userSavedStepData.Result.Person.SeriChar}/
          {state.userSavedStepData.Result.Person.SeriNumber}{" "}
          {" " + state.userSavedStepData.Result.Person.SerialNumber}{" "}
        </span>
      ),
    },
    {
      title: "محل تولد",
      value: state.userSavedStepData.Result.Person.BirthPlace,
    },
    {
      title: "محل صدور",
      value: state.userSavedStepData.Result.Person.IssuePlace,
    },
    {
      title: "جنسیت",
      value: (
        <span>
          {state.userSavedStepData.Result.Person.Gender == 1 ? "مرد" : "زن"}
        </span>
      ),
    },
    {
      title: "شماره موبایل",
      value: state.userSavedStepData.Result.Person.Mobile,
    },
    {
      title: "کد پستی",
      value: state.userSavedStepData.Result.Person.PostalCode,
    },
  ];

  const addressData = [
    {
      title: "استان محل سکونت",
      value: state.userSavedStepData.Result.Address.ProvinceId,
    },
    {
      title: "شهر محل سکونت",
      value: state.userSavedStepData.Result.Address.CityId,
    },
    {
      title: "نشانی محل سکونت",
      value: (
        <span>
          {" "}
          {state.userSavedStepData.Result.Address.RemnantAddress} -{" "}
          {state.userSavedStepData.Result.Address.Alley} -{" "}
          {state.userSavedStepData.Result.Address.Plaque}
        </span>
      ),
    },
    {
      title: "شماره تلفن ثابت",
      value: (
        <span>
          {" "}
          {state.userSavedStepData.Result.Address.CityPrefix}-
          {state.userSavedStepData.Result.Address.Telephone}{" "}
        </span>
      ),
    },
    {
      title: "تلفن ثابت اضطراری",
      value: (
        <span>
          {" "}
          {state.userSavedStepData.Result.Address.EmergencyTelephone}-
          {state.userSavedStepData.Result.Address.EmergencyCityPrefix}
        </span>
      ),
    },
    {
      title: "موبایل اضطراری",
      value: state.userSavedStepData.Result.Address.EmergencyMobile,
    },
    {
      title: "فکس",
      value: (
        <span>
          {" "}
          {state.userSavedStepData.Result.Address.FaxPrefix}-
          {state.userSavedStepData.Result.Address.Fax}{" "}
        </span>
      ),
    },
    {
      title: "پست الکترونیکی",
      value: state.userSavedStepData.Result.Address.Email,
    },
    {
      title: "وب سایت",
      value: state.userSavedStepData.Result.Address.WebSite,
    },
  ];

  const jobData = [
    {
      title: "عنوان شغل",
      value: state.userSavedStepData.Result.PersonJob.JobDescription,
    },
    {
      title: "نام شرکت",
      value: state.userSavedStepData.Result.PersonJob.CompanyName,
    },
    {
      title: "سمت شغلی",
      value: state.userSavedStepData.Result.PersonJob.JobPosition,
    },
    {
      title: "نشانی محل کار",
      value: state.userSavedStepData.Result.PersonJob.CompanyAddress,
    },
    {
      title: "کدپستی محل کار",
      value: state.userSavedStepData.Result.PersonJob.CompanyPostalCode,
    },
    {
      title: "تلفن محل کار",
      value: state.userSavedStepData.Result.PersonJob.CompanyCityPrefix,
    },
    {
      title: "دورنگار محل کار",
      value: state.userSavedStepData.Result.PersonJob.CompanyFaxPrefix,
    },
    {
      title: "پست الکترونیکی محل کار",
      value: state.userSavedStepData.Result.PersonJob.CompanyEmail,
    },
    {
      title: "وب سایت محل کار",
      value: state.userSavedStepData.Result.PersonJob.CompanyWebSite,
    },
    {
      title: "تاریخ شروع همکاری",
      value: state.userSavedStepData.Result.PersonJob.EmployeeDate,
    },
  ];

  const bankData = [
    {
      title: "نام بانک",
      value: state.userSavedStepData.Result.Accounts[0].BankId,
    },
    {
      title: "استان شعبه حساب",
      value: state.userSavedStepData.Result.Accounts[0].BranchProvinceId,
    },
    {
      title: "شهر شعبه حساب",
      value: state.userSavedStepData.Result.Accounts[0].BranchCityId,
    },
    {
      title: "نوع حساب بانکی",
      value: state.userSavedStepData.Result.Accounts[0].AccountType,
    },
    {
      title: "شماره حساب بانکی",
      value: state.userSavedStepData.Result.Accounts[0].AccountNumber,
    },
    {
      title: "نام شعبه بانک",
      value: state.userSavedStepData.Result.Accounts[0].BranchName,
    },
    {
      title: "کد شعبه بانک",
      value: state.userSavedStepData.Result.Accounts[0].BranchCode,
    },
    {
      title: "شماره شبای بانکی",
      value: state.userSavedStepData.Result.Accounts[0].ShebaNumber,
    },
  ];

  const financialData = [
    {
      title: "میزان آشنایی با بورس",
      value: state.userSavedStepData.Result.Financial.TradingKnowledgeLevel,
    },
    {
      title: "میزان دارایی (ریال)",
      value: state.userSavedStepData.Result.Financial.AssetValue,
    },
    {
      title: "متوسط درآمد ماهیانه (ریال)",
      value: state.userSavedStepData.Result.Financial.IncomeAverage,
    },
    {
      title: "پیش بینی سطح ارزش ریالی معاملات",
      value: state.userSavedStepData.Result.Financial.TransactionLevel,
    },
    {
      title: "مبلغ ریالی بورس اوراق بهادار و فرابورس ",
      value: state.userSavedStepData.Result.Financial.TradingExchange,
    },
    {
      title: "مبلغ ریالی بورس کالا",
      value: state.userSavedStepData.Result.Financial.CommodityExchange,
    },
    {
      title: "مبلغ ریالی بورس های خارج از کشور",
      value: state.userSavedStepData.Result.Financial.AbroadExchange,
    },
  ];

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.header}>
        بررسی نهایی
      </Grid>
      <Grid item className={clsx(classes.main, classes.scrollbarY)}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              {state.userSavedStepData.Result && (
                <Grid container className={classes.preview} spacing={10}>
                  {state.userSavedStepData.Result.Person && (
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={12} className={classes.mainTitle}>
                          اطلاعات فردی
                        </Grid>
                        {profileData.map((col, i) => (
                          <Grid item sm={4} key={i}>
                            <Grid container className={classes.gridItem}>
                              <Grid item className={classes.gridTitle}>
                                {col.title}
                              </Grid>
                              <Grid item>{col.value}</Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}

                  {state.userSavedStepData.Result.Address && (
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={12} className={classes.mainTitle}>
                          اطلاعات تماس
                        </Grid>
                        {addressData.map((col, i) => (
                          <Grid item sm={4} key={i}>
                            <Grid container className={classes.gridItem}>
                              <Grid item className={classes.gridTitle}>
                                {col.title}
                              </Grid>
                              <Grid item>{col.value}</Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}

                  {state.userSavedStepData.Result.PersonJob && (
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={12} className={classes.mainTitle}>
                          اطلاعات شغلی
                        </Grid>
                        {jobData.map((col, i) => (
                          <Grid item sm={4} key={i}>
                            <Grid container className={classes.gridItem}>
                              <Grid item className={classes.gridTitle}>
                                {col.title}
                              </Grid>
                              <Grid item>{col.value}</Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}

                  {state.userSavedStepData.Result.Accounts && (
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={12} className={classes.mainTitle}>
                          اطلاعات بانکی
                        </Grid>
                        {bankData.map((col, i) => (
                          <Grid item sm={4} key={i}>
                            <Grid container className={classes.gridItem}>
                              <Grid item className={classes.gridTitle}>
                                {col.title}
                              </Grid>
                              <Grid item>{col.value}</Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}

                  {state.userSavedStepData.Result.Financial && (
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={12} className={classes.mainTitle}>
                          اطلاعات مالی
                        </Grid>
                        {financialData.map((col, i) => (
                          <Grid item sm={4} key={i}>
                            <Grid container className={classes.gridItem}>
                              <Grid item className={classes.gridTitle}>
                                {col.title}
                              </Grid>
                              <Grid item>{col.value}</Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}

                  <Grid item>
                    در صورت اطمینان از درستی اطلاعات ثبت شده، گزینه "صحت اطلاعات
                    وارد شده را تایید می‌نمایم" انتخاب کنید. سپس دکمه "ادامه ثبت
                    نام" را کلیک کنید.
                  </Grid>
                </Grid>
              )}

              <Grid item xs={12} className={classes.actions}>
                <Grid container className={classes.submit}>
                  <Grid item xs={6}>
                    <Grid container className={classes.warning}>
                      <Grid item>
                        <Checkbox
                          label="صحت اطلاعات وارد شده را تایید می نمایم"
                          checked={agreeState}
                          onChange={(e) => setAgreeState(e.target.checked)}
                          labelClassName={classes.labelCheckbox}
                        />
                      </Grid>
                      {agreeState && (
                        <Grid item className={classes.warning}>
                          کاربر گرامی در صورت تایید اطلاعات امکان ویرایش مجدد
                          وجود نخواهد داشت.
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container className={classes.submitBtn} spacing={8}>
                      <Grid item>
                        <Button
                          variant="submit"
                          color="primary"
                          onClick={cancel}
                          className={clsx(classes.button, classes.cancelButton)}
                          startIcon={<ClearOutlinedIcon />}
                          disabled={!agreeState}
                        >
                          انصراف{" "}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="submit"
                          color="primary"
                          onClick={confirmPreviewData}
                          className={classes.button}
                          startIcon={<CheckIcon />}
                          disabled={!agreeState}
                        >
                          ادامه ثبت نام
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleError: (message) => dispatch(actions.notifyError(message)),
  };
};
const mapStateToProps = () => {
  return {
    handleError: (message) => actions.notifyError(message),
  };
};

export default withWidth()(
  connect(mapStateToProps, mapDispatchToProps)(FinalReview)
);
