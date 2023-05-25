import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../services/appContext";
import SejamService from "../../services/sejamService";
import Input from "../../components/UI/Input/Input";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DropDownList from "../../components/UI/DropDownList/DropDownList";
import SubmitBoxWizard from "./submitBoxWizard/submitBoxWizard";
import stepLevel from "../../enums/step";
import moment from "moment-jalaali";
import DatePicker from "../../components/UI/DatePicker/DatePicker";
import * as actions from "../../store/actions/index";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    height: "100%",
  },
  selectGender: {
    marginRight: theme.spacing(10),
  },
  button: {
    margin: theme.spacing(1),
    width: "100%",
    backgroundColor: "#1e3746",
    color: "#fff",
    boxShadow: "none",
    height: 42,
    "&:hover": {
      backgroundColor: "#1e3746",
      boxShadow: "none",
    },
  },
  // header: {
  //   width: "100%",

  //   height: "100%",
  // },
  job: {
    // marginTop: theme.spacing(13),
  },
  employeeDate: {
    // marginTop: theme.spacing(13),
  },
  textField: {
    // backgroundColor: "#fff",
    // marginTop: theme.spacing(13),
    // width: "100%",
  },
  inputClassName: {
    height: 46,
  },
  title: {
    textAlign: "center",
  },
  form: {
    padding: "20px 30px",
  },
  main: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: 5,
    width: "100%",
  },
  header: {
    width: "100%",
    margin: 20,
    fontSize: 14,
  },
  outlinedRoot: {
    height: 46,
  },
  selectMenu: {
    paddingTop: 17,
    paddingBottom: 10,
  },
  telCode: {
    order: 2,
  },
}));

const JobInfo = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const [id, setId] = useState(0);
  const [jobData, setJobData] = useState([]);
  const [JobInfo, setJobInfo] = useState([]);
  const [job, setJob] = useState(0);
  const [jobDescription, setJobDescription] = useState(null);
  const [employeeDate, setEmployeeDate] = useState(0);
  const [companyName, setCompanyName] = useState(null);
  const [companyCityPrefix, setCompanyCityPrefix] = useState(null);
  const [companyTell, setCompanyTell] = useState(null);
  const [jobPosition, setJobPosition] = useState(null);
  const [companyAddress, setCompanyAddress] = useState(null);
  const [companyFaxPrefix, setCompanyFaxPrefix] = useState(null);
  const [companyFax, setCompanyFax] = useState(null);
  const [companyPostalCode, setCompanyPostalCode] = useState(null);
  const [companyEmail, setCompanyEmail] = useState(null);
  const [companyWebSite, setCompanyWebSite] = useState(null);
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [notValidEmail, setNotValidEmail] = useState(false);
  const [notValidCompanyName, setNotValidCompanyName] = useState(false);
  const [notValidJobDescription, setNotValidJobDescription] = useState(false);
  const [notValidCompanyAddress, setNotValidCompanyAddress] = useState(false);
  const [notValidCompanyWebSite, setNotValidCompanyWebSite] = useState(false);
  const [resultData, sertResult] = useState({});
  const [notValidPostalCode, setNotValidPostalCode] = useState(false);
  const [notValidTelephone, setNotValidTelephone] = useState(false);
  const [notValidPrefixTelephone, setNotValidPrefixTelephone] = useState(false);
  const unknownError = "خطایی رخ داده است";
  function just_persian(str) {
    var p =
      /^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC\u06F0-\u06F9\u202C\u064B\u064C\u064E-\u0652\u0600-\u06FF\u0020\u2000-\u200F\u2028-\u202F\d+\d+-\d\d+-\d+s]+$/;
    if (!p.test(str)) {
      return false;
    }
  }
  const checkValidation = () => {
    setShowErrorBox(false);
    setNotValidEmail(false);
    setNotValidCompanyName(false);
    setNotValidJobDescription(false);
    setNotValidCompanyAddress(false);
    setNotValidCompanyWebSite(false);
    setNotValidPostalCode(false);
    setNotValidTelephone(false);
    setNotValidPrefixTelephone(false);
    if (!companyAddress || !companyTell || !companyName || !companyPostalCode) {
      setShowErrorBox(true);
      return true;
    }

    function isUrlValid(userInput) {
      var res = userInput.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (res == null) return false;
      else return true;
    }

    if (just_persian(companyName) == false) {
      setShowErrorBox(true);
      setNotValidCompanyName(true);
      return true;
    }
    if (just_persian(jobDescription) == false) {
      setShowErrorBox(true);
      setNotValidJobDescription(true);
      return true;
    }
    if (just_persian(companyAddress) == false) {
      setShowErrorBox(true);
      setNotValidCompanyAddress(true);
      return true;
    }
    if (companyWebSite && isUrlValid(companyWebSite) == false) {
      setShowErrorBox(true);
      setNotValidCompanyWebSite(true);
      return true;
    }
    if (companyPostalCode.toString().length != 10) {
      setShowErrorBox(true);
      setNotValidPostalCode(true);
      return true;
    }
    if (!jobDescription || !companyName || !job) {
      setShowErrorBox(true);
      return true;
    }
    var telephonelength = companyTell.length;
    if (telephonelength != 8) {
      setNotValidTelephone(true);
      setShowErrorBox(true);
      return true;
    }
    var companyCityPrefixlength = companyCityPrefix.length;
    if (companyCityPrefixlength != 3 || !companyCityPrefix.startsWith("0")) {
      setNotValidPrefixTelephone(true);
      setShowErrorBox(true);
      return true;
    }
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (companyEmail && !re.test(companyEmail)) {
      setNotValidEmail(true);
      return true;
    }
    return false;
  };
  const addOrUpdateJobInfo = async (params) => {
    let resultData = false;
    if (params.Id) {
      await SejamService.updatePersonJobInfo(params, (success, result) => {
        if (result && result.Success) {
          resultData = result.Success;
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      });
    } else {
      await SejamService.savePersonJobInfo(params, (success, result) => {
        if (result && result.Success) {
          resultData = result.Success;
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      });
    }
    if (resultData) {
      window.location.pathname = stepLevel.bank.url;
    }
  };
  const saveJobInfoStep = async (e) => {
    e.preventDefault();
    if (checkValidation()) {
      return;
    }

    dispatch({
      type: "isLoding",
      payload: true,
    });

    var paramsData = {
      Id: id,
      Job: job,
      JobDescription: jobDescription,
      EmployeeDate: employeeDate,
      CompanyName: companyName,
      CompanyCityPrefix: companyCityPrefix * 1,
      CompanyTell: companyTell * 1,
      JobPosition: jobPosition,
      CompanyAddress: companyAddress,
      CompanyFaxPrefix: companyFaxPrefix == "" ? null : companyFaxPrefix,
      CompanyFax: companyFax == "" ? null : companyFax,
      CompanyPostalCode: companyPostalCode * 1,
      CompanyEmail: companyEmail == "" ? null : companyEmail,
      CompanyWebSite: companyWebSite == "" ? null : companyWebSite,
    };

    dispatch({
      type: "userSavedStepData",
      payload: { ...state.userSavedStepData, PersonJob: paramsData },
    });

    await addOrUpdateJobInfo(paramsData);

    dispatch({
      type: "isLoding",
      payload: false,
    });
  };
  const getJobData = () => {
    SejamService.getJobs((status, data) => {
      setJobData(data.Result);
    });
  };
  const getPersonJobInfo = () => {
    SejamService.getPersonJobInfo((status, data) => {
      setJobInfo(data.Result);
    });
  };
  useEffect(() => {
    var personJobData = {};

    async function fetchData() {
      dispatch({
        type: "isLoding",
        payload: true,
      });
      await getJobData();

      if (
        state.userSavedStepData.PersonJob &&
        state.userSavedStepData.PersonJob.Id
      ) {
        personJobData = state.userSavedStepData.PersonJob;
      } else {
        await SejamService.getPersonJobInfo((status, data) => {
          if (data && data.Success) {
            personJobData = data.Result;
          } else {
            props.handleError(
              data && data.Message ? data.Message : unknownError
            );
          }
        });
      }

      dispatch({
        type: "isLoding",
        payload: false,
      });
    }

    fetchData().then(() => {
      if (personJobData) {
        dispatch({
          type: "userSavedStepData",
          payload: { ...state.userSavedStepData, PersonJob: personJobData },
        });

        setId(personJobData.Id);
        setJob(personJobData.Job);
        setJobDescription(personJobData.JobDescription);
        setEmployeeDate(moment(personJobData.EmployeeDate));
        setCompanyName(personJobData.CompanyName);
        setCompanyCityPrefix(personJobData.CompanyCityPrefix);
        setCompanyTell(personJobData.CompanyTell);
        setJobPosition(personJobData.JobPosition);
        setCompanyAddress(personJobData.CompanyAddress);
        setCompanyFaxPrefix(personJobData.CompanyFaxPrefix);
        setCompanyFax(personJobData.CompanyFax);
        setCompanyPostalCode(personJobData.CompanyPostalCode);
        setCompanyEmail(personJobData.CompanyEmail);
        setCompanyWebSite(personJobData.CompanyWebSite);
      }
    });

    dispatch({
      type: "stepWizard",
      payload: stepLevel.job.id,
    });
  }, []);
  const onChangeJobDescription = (event) => {
    setJobDescription(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) == false) {
      checkValidation = true;
    }
    setNotValidJobDescription(checkValidation);
  };
  const onChangeCompanyName = (event) => {
    setCompanyName(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) == false) {
      checkValidation = true;
    }
    setNotValidCompanyName(checkValidation);
  };
  const onChangeCompanyAddress = (event) => {
    setCompanyAddress(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) == false) {
      checkValidation = true;
    }
    setNotValidCompanyAddress(checkValidation);
  };
  return (
    <Grid container>
      <Grid item className={classes.header}>
        اطلاعات تماس
      </Grid>
      <Grid item className={classes.main}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              {/* <Card className={classes.root}>
              <CardContent> */}
              <Grid container spacing={10} className={classes.form}>
                <Grid item xs={4}>
                  <div className={classes.job}>
                    <DropDownList
                      options={jobData}
                      value={job}
                      onChange={(e) => setJob(e.target.value)}
                      name="Job"
                      label="  شغل "
                      textField="Title"
                      valueField="Id"
                      selectMenuClassName={classes.selectMenu}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="JobDescription"
                    label="عنوان شغلی"
                    className={classes.textField}
                    onChange={onChangeJobDescription}
                    error={jobDescription === "" || notValidJobDescription}
                    inputClassName={classes.inputClassName}
                    value={jobDescription}
                    showValidation={
                      (!jobDescription || notValidJobDescription) &&
                      showErrorBox
                    }
                    validation={notValidJobDescription && "فارسی وارد کنید"}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="JobPosition"
                    label="سمت شغلی"
                    className={classes.textField}
                    onChange={(e) => setJobPosition(e.target.value)}
                    error={jobPosition === ""}
                    inputClassName={classes.inputClassName}
                    value={jobPosition}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.employeeDate}>
                    <DatePicker
                      label="تاریخ اشتغال"
                      name="EmployeeDate"
                      value={employeeDate}
                      onChange={(val) => setEmployeeDate(val)}
                      outlinedRoot={classes.outlinedRoot}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="CompanyName"
                    label=" نام شرکت یاموسسه محل کار"
                    className={classes.textField}
                    onChange={onChangeCompanyName}
                    error={companyName === ""}
                    inputClassName={classes.inputClassName}
                    value={companyName}
                    showValidation={
                      (!companyName || notValidCompanyName) && showErrorBox
                    }
                    validation={notValidCompanyName && "فارسی وارد کنید"}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={3} className={classes.telCode}>
                      <Input
                        name="CompanyCityPrefix"
                        label="پیش شماره  "
                        className={classes.textField}
                        onChange={(e) => setCompanyCityPrefix(e.target.value)}
                        error={companyCityPrefix === ""}
                        inputClassName={classes.inputClassName}
                        value={companyCityPrefix}
                        type="number"
                        showValidation={
                          (!companyCityPrefix || notValidPrefixTelephone) &&
                          showErrorBox
                        }
                        validation={
                          notValidPrefixTelephone && "پیش شماره اشتباه است."
                        }
                      ></Input>
                    </Grid>
                    <Grid item xs={9}>
                      <Input
                        name="CompanyTell"
                        label="تلفن  "
                        className={classes.textField}
                        onChange={(e) => setCompanyTell(e.target.value)}
                        error={companyTell === "" || notValidTelephone}
                        inputClassName={classes.inputClassName}
                        value={companyTell}
                        type="number"
                        showValidation={showErrorBox}
                        showValidation={
                          (!companyTell || notValidTelephone) && showErrorBox
                        }
                        validation={
                          notValidTelephone && "شماره تلفن وارد شده اشتباه است."
                        }
                      ></Input>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={3} className={classes.telCode}>
                      <Input
                        name="CompanyFaxPrefix"
                        label="پیش شماره "
                        className={classes.textField}
                        onChange={(e) => setCompanyFaxPrefix(e.target.value)}
                        //   error={companyFaxPrefix === ""}
                        inputClassName={classes.inputClassName}
                        value={companyFaxPrefix}
                      ></Input>
                    </Grid>
                    <Grid item xs={9}>
                      <Input
                        name="CompanyFax"
                        label="  دورنگار محل کار  "
                        className={classes.textField}
                        onChange={(e) => setCompanyFax(e.target.value)}
                        // error={companyFax === ""}
                        inputClassName={classes.inputClassName}
                        value={companyFax}
                      ></Input>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Input
                    name="CompanyPostalCode"
                    label=" کدپستی محل کار"
                    className={classes.textField}
                    onChange={(e) => setCompanyPostalCode(e.target.value)}
                    error={companyPostalCode === "" || notValidPostalCode}
                    inputClassName={classes.inputClassName}
                    value={companyPostalCode}
                    showValidation={
                      (!companyPostalCode || notValidPostalCode) && showErrorBox
                    }
                    validation={
                      notValidPostalCode && "کدپستی را درست وارد نمایید."
                    }
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="CompanyEmail"
                    label="پست الکترونیکی محل کار"
                    className={classes.textField}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    //  error={companyEmail === ""}
                    inputClassName={classes.inputClassName}
                    value={companyEmail}
                    showValidation={notValidEmail}
                    validation={
                      notValidEmail &&
                      " پست الکترونیکی محل کار را درست وارد نمایید."
                    }
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="CompanyWebSite"
                    label="وب سایت محل کار"
                    className={classes.textField}
                    onChange={(e) => setCompanyWebSite(e.target.value)}
                    //error={companyWebSite === ""}
                    inputClassName={classes.inputClassName}
                    value={companyWebSite}
                    showValidation={notValidCompanyWebSite && showErrorBox}
                    validation={"سایت معتبر نیست"}
                  ></Input>
                </Grid>

                <Grid item xs={4}>
                  <Input
                    name="CompanyAddress"
                    label="نشانی محل کار   "
                    className={classes.textField}
                    onChange={onChangeCompanyAddress}
                    error={companyAddress === "" || notValidCompanyAddress}
                    inputClassName={classes.inputClassName}
                    value={companyAddress}
                    showValidation={
                      (!companyAddress || notValidCompanyAddress) &&
                      showErrorBox
                    }
                    validation={notValidCompanyAddress && "فارسی وارد کنید"}
                  ></Input>
                </Grid>
              </Grid>
              {/* <br />
                <br /> */}

              <Grid item xs={12}>
                <SubmitBoxWizard
                  previousWizard="/main/sejam/address"
                  nextWizard={saveJobInfoStep}
                />
              </Grid>
              {/* </CardContent>
            </Card> */}
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
  connect(mapStateToProps, mapDispatchToProps)(JobInfo)
);
