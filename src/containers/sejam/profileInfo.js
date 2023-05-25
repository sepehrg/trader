import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment-jalaali";

import stepLevel from "../../enums/step";
import { connect } from "react-redux";
import AppContext from "../../services/appContext";
import SejamService from "../../services/sejamService";
import Input from "../../components/UI/Input/Input";
import Card from "@material-ui/core/Card";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DropDownList from "../../components/UI/DropDownList/DropDownList";

import DatePicker from "../../components/UI/DatePicker/DatePicker";
import SubmitBoxWizard from "./submitBoxWizard/submitBoxWizard";
import * as actions from "../../store/actions/index";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    height: "100%",
  },
  selectGender: {
    // marginRight: theme.spacing(10),
  },
  // button: {
  //   margin: theme.spacing(1),
  //   width: "100%",
  //   backgroundColor: "#1e3746",
  //   color: "#fff",
  //   boxShadow: "none",
  //   height: 42,
  //   "&:hover": {
  //     backgroundColor: "#1e3746",
  //     boxShadow: "none",
  //   },
  // },
  // header: {
  //   width: "100%",

  //   height: "100%",

  //   flexGrow: 1,
  // },

  textField: {
    // width: "100%",
  },
  inputClassName: {
    height: 46,
  },
  birthDate: {
    // marginTop: theme.spacing(15),
  },
  gender: {
    // marginTop: theme.spacing(15),
    // marginRight: theme.spacing(-10),
    // width: "104%",
  },
  seriChar: {
    // marginTop: theme.spacing(15),
    // width: "78%",
  },
  SeriNumber: {
    // marginRight: theme.spacing(-15),
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
  form: {
    padding: "20px 30px",
  },
  selectMenu: {
    paddingTop: 17,
    paddingBottom: 10,
  },
  outlinedRoot: {
    height: 46,
  },
  input: {
    position: "relative",
  },
  error: {
    fontSize: 10,
    position: "absolute",
    backgroundColor: theme.palette.color.red,
    borderRadius: 4,
    padding: "0px 5px",
    right: 20,
    bottom: 0,
    whiteSpace: "nowrap",
  },
}));

const ProfileInfo = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const [id, setId] = useState(0);
  const [nationalCode, setNationalCode] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [fatherName, setFatherName] = useState(null);
  const [gender, setGender] = useState(0);
  const [issuePlace, setIssuePlace] = useState(null);
  const [birthDate, setBirthDate] = useState(0);
  const [birthPlace, setBirthPlace] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [seriChar, setSeriChar] = useState("الف");
  const [seriNumber, setSeriNumber] = useState(null);
  const [serialNumber, setSerialNumber] = useState(null);
  const [shNumber, setShNumber] = useState(null);
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [showSeriErrorBox, setSeriShowErrorBox] = useState(false);
  const [notValidNationalCode, setNotValidNationalCode] = useState(false);
  const [notValidPostalCode, setNotValidPostalCode] = useState(false);
  const [notValidMobile, setNotValidMobile] = useState(false);
  const [notValidSeriNumber, setValidSeriNumber] = useState(false);

  const [notValiLastName, setNotValiLastName] = useState(false);
  const [notValidFirstName, setNotValiLdFirstName] = useState(false);
  const [notValidFatherName, setNotValidFatherName] = useState(false);
  const [notValidBirthPlace, setNotValiLdBirthPlace] = useState(false);
  const [notValidIssuePlace, setNotValidIssuePlace] = useState(false);
  const unknownError = "خطایی رخ داده است";
  function just_persian(str) {
    // var p = /^[\u0600-\u06FF\s]+$/;
    var p =
      /^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC\u06F0-\u06F9\u202C\u064B\u064C\u064E-\u0652\u0600-\u06FF\u0020\u2000-\u200F\u2028-\u202F\d+\d+-\d\d+-\d+s]+$/;
    if (!p.test(str)) {
      return false;
    }
  }

  const isValidIranianNationalCode = (input) => {
    if (
      !/^\d{10}$/.test(input) ||
      input === "0000000000" ||
      input === "1111111111" ||
      input === "2222222222" ||
      input === "3333333333" ||
      input === "4444444444" ||
      input === "5555555555" ||
      input === "6666666666" ||
      input === "7777777777" ||
      input === "8888888888" ||
      input === "9999999999"
    )
      return false;

    var check = parseInt(input[9]);
    var sum = 0;
    var i;
    for (i = 0; i < 9; ++i) {
      sum += parseInt(input[i]) * (10 - i);
    }
    sum %= 11;

    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
  };
  const checkValidation = () => {
    setSeriShowErrorBox(false);
    setNotValidNationalCode(false);
    setNotValidMobile(false);
    setValidSeriNumber(false);
    setNotValidPostalCode(false);
    setNotValiLastName(false);
    setNotValiLdFirstName(false);
    setNotValidFatherName(false);
    setNotValiLdBirthPlace(false);
    setNotValidIssuePlace(false);

    if (
      !nationalCode ||
      !mobile ||
      !firstName ||
      !lastName ||
      !fatherName ||
      !gender ||
      !issuePlace ||
      !birthDate ||
      !birthPlace ||
      !postalCode ||
      !seriChar ||
      !seriNumber ||
      !serialNumber ||
      !shNumber
    ) {
      if (!seriChar || !seriNumber || !serialNumber) {
        setSeriShowErrorBox(true);
      }
      setShowErrorBox(true);
      return true;
    }

    if (
      nationalCode.length !== 10 ||
      isValidIranianNationalCode(nationalCode) === false
    ) {
      setShowErrorBox(true);
      setNotValidNationalCode(true);
      return true;
    }

    if (just_persian(lastName) === false) {
      setShowErrorBox(true);
      setNotValiLastName(true);
      return true;
    }
    if (just_persian(firstName) === false) {
      setShowErrorBox(true);
      setNotValiLdFirstName(true);
      return true;
    }
    if (just_persian(fatherName) === false) {
      setShowErrorBox(true);
      setNotValidFatherName(true);
      return true;
    }
    if (just_persian(birthPlace) === false) {
      setShowErrorBox(true);
      setNotValiLdBirthPlace(true);
      return true;
    }
    if (just_persian(issuePlace) === false) {
      setShowErrorBox(true);
      setNotValidIssuePlace(true);
      return true;
    }
    if (mobile.length !== 11 || !mobile.startsWith("09")) {
      setShowErrorBox(true);
      setNotValidMobile(true);
      return true;
    }
    if (seriNumber.length > 2) {
      setShowErrorBox(true);
      setValidSeriNumber(true);
      return true;
    }
    if (postalCode.toString().length !== 10) {
      setShowErrorBox(true);
      setNotValidPostalCode(true);
      return true;
    }
    return false;
  };
  const addOrUpdateProfileInfo = async (params) => {
    let resultData = false;

    if (params.Id) {
      await SejamService.updateProfileInfo(params, (status, result) => {
        if (result.Success === true) {
          resultData = result.Success;
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      });
    } else {
      await SejamService.saveProfileInfo(params, (status, result) => {
        if (result.Success === true) {
          resultData = result.Success;
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      });
    }
    if (resultData) {
      window.location.pathname = stepLevel.address.url;
    }
  };
  const saveProfileInfoStep = async (e) => {
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
      NationalCode: nationalCode,
      Mobile: mobile.substring(1, mobile.length),
      FirstName: firstName,
      LastName: lastName,
      FatherName: fatherName,
      Gender: gender,
      IssuePlace: issuePlace,
      BirthDate: birthDate,
      BirthPlace: birthPlace,
      PostalCode: postalCode * 1,
      SeriChar: seriChar,
      SeriNumber: seriNumber * 1,
      SerialNumber: serialNumber * 1,
      ShNumber: shNumber,
    };

    dispatch({
      type: "userSavedStepData",
      payload: { ...state.userSavedStepData, Person: paramsData },
    });

    await addOrUpdateProfileInfo(paramsData);

    dispatch({
      type: "isLoding",
      payload: false,
    });
  };
  useEffect(() => {
    var personData = {};

    async function fetchData() {
      dispatch({
        type: "isLoding",
        payload: true,
      });

      if (state.userSavedStepData.Person && state.userSavedStepData.Person.Id) {
        personData = state.userSavedStepData.Person;
      } else {
        await SejamService.getPersonInfo((status, data) => {
          if (data && data.Success) {
            personData = data.Result;
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
      if (personData) {
        dispatch({
          type: "userSavedStepData",
          payload: { ...state.userSavedStepData, Person: personData },
        });

        setId(personData.Id);
        setNationalCode(personData.NationalCode);
        setMobile("0" + personData.Mobile);
        setFirstName(personData.FirstName);
        setLastName(personData.LastName);
        setFatherName(personData.FatherName);
        setGender(personData.Gender);
        setIssuePlace(personData.IssuePlace);
        setBirthDate(moment(personData.BirthDate));
        setBirthPlace(personData.BirthPlace);
        setPostalCode(personData.PostalCode);
        setSeriChar(personData.SeriChar);
        setSeriNumber(personData.SeriNumber);
        setSerialNumber(personData.SerialNumber);
        setShNumber(personData.ShNumber);
      }
    });

    dispatch({
      type: "stepWizard",
      payload: stepLevel.profile.id,
    });
  }, []);

  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) === false) {
      checkValidation = true;
    }
    setNotValiLdFirstName(checkValidation);
  };
  const onChangeLastName = (event) => {
    setLastName(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) === false) {
      checkValidation = true;
    }
    setNotValiLastName(checkValidation);
  };
  const onChangeFatherName = (event) => {
    setFatherName(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) === false) {
      checkValidation = true;
    }
    setNotValidFatherName(checkValidation);
  };
  const onChangeIssuePlace = (event) => {
    setIssuePlace(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) === false) {
      checkValidation = true;
    }
    setNotValidIssuePlace(checkValidation);
  };
  const onChangeBirthPlace = (event) => {
    setBirthPlace(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) === false) {
      checkValidation = true;
    }
    setNotValiLdBirthPlace(checkValidation);
  };
  return (
    <Grid container>
      <Grid item className={classes.header}>
        اطلاعات فردی
      </Grid>

      <Grid item className={classes.main}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              {/* <Card className={classes.root}>
              <CardContent> */}
              <Grid container spacing={10} className={classes.form}>
                <Grid item xs={4}>
                  <Input
                    name="FirstName"
                    label="نام "
                    className={classes.textField}
                    onChange={onChangeFirstName}
                    error={firstName === "" || notValidFirstName}
                    inputClassName={classes.inputClassName}
                    value={firstName}
                    showValidation={
                      (!firstName || notValidFirstName) && showErrorBox
                    }
                    validation={notValidFirstName && "فارسی وارد کنید"}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="LastName"
                    label="نام خانوادگی "
                    className={classes.textField}
                    onChange={onChangeLastName}
                    error={lastName === "" || notValiLastName}
                    inputClassName={classes.inputClassName}
                    value={lastName}
                    showValidation={
                      (!lastName || notValiLastName) && showErrorBox
                    }
                    validation={notValiLastName && "فارسی وارد کنید"}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="FatherName"
                    label="نام پدر "
                    className={classes.textField}
                    onChange={onChangeFatherName}
                    error={fatherName === "" || notValidFatherName}
                    inputClassName={classes.inputClassName}
                    value={fatherName}
                    showValidation={
                      (!fatherName || notValidFatherName) && showErrorBox
                    }
                    validation={notValidFatherName && "فارسی وارد کنید"}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="NationalCode"
                    label="  کد ملی "
                    className={classes.textField}
                    onChange={(e) => setNationalCode(e.target.value)}
                    error={nationalCode === "" || notValidNationalCode}
                    inputClassName={classes.inputClassName}
                    value={nationalCode}
                    type="number"
                    showValidation={
                      (!nationalCode || notValidNationalCode) && showErrorBox
                    }
                    validation={notValidNationalCode && "کد ملی وجود ندارد."}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="ShNumber"
                    label="  شماره شناسنامه"
                    className={classes.textField}
                    onChange={(e) => setShNumber(e.target.value)}
                    error={shNumber === ""}
                    inputClassName={classes.inputClassName}
                    value={shNumber}
                    type="tel"
                    showValidation={!shNumber && showErrorBox}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="IssuePlace"
                    label="محل صدور "
                    className={classes.textField}
                    onChange={onChangeIssuePlace}
                    error={issuePlace === "" || notValidIssuePlace}
                    inputClassName={classes.inputClassName}
                    value={issuePlace}
                    showValidation={
                      (!issuePlace || notValidIssuePlace) && showErrorBox
                    }
                    validation={notValidIssuePlace && "فارسی وارد کنید"}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="PostalCode"
                    label="  کدپستی محل زندگی  "
                    className={classes.textField}
                    onChange={(e) => setPostalCode(e.target.value)}
                    error={postalCode === "" || notValidPostalCode}
                    inputClassName={classes.inputClassName}
                    value={postalCode}
                    type="number"
                    showValidation={
                      (!postalCode || notValidPostalCode) && showErrorBox
                    }
                    validation={
                      notValidPostalCode &&
                      "کدپستی محل زندگی را درست وارد نمایید."
                    }
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="BirthPlace"
                    label="شهر محل تولد "
                    className={classes.textField}
                    onChange={onChangeBirthPlace}
                    error={birthPlace === "" || notValidBirthPlace}
                    inputClassName={classes.inputClassName}
                    value={birthPlace}
                    showValidation={
                      (!birthPlace || notValidBirthPlace) && showErrorBox
                    }
                    validation={notValidBirthPlace && "فارسی وارد کنید"}
                  ></Input>
                </Grid>

                <Grid item xs={4}>
                  <Input
                    name="Mobile"
                    label="  شماره موبایل"
                    className={classes.textField}
                    onChange={(e) => setMobile(e.target.value)}
                    error={mobile === "" || notValidMobile}
                    inputClassName={classes.inputClassName}
                    value={mobile}
                    type="tel"
                    showValidation={(!mobile || notValidMobile) && showErrorBox}
                    validation={
                      notValidMobile && "شماره موبایل را درست وارد نمایید."
                    }
                  ></Input>
                </Grid>

                <Grid item xs={4}>
                  <div className={classes.birthDate}>
                    <DatePicker
                      label="تاریخ تولد"
                      name="BirthDate"
                      value={birthDate}
                      onChange={(val) => setBirthDate(val)}
                      showValidation={!birthDate && showErrorBox}
                      outlinedRoot={classes.outlinedRoot}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.gender}>
                    <DropDownList
                      options={[
                        { value: 1, text: "مرد" },
                        { value: 2, text: "زن" },
                      ]}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      name="Gender"
                      label="جنسیت"
                      textField="text"
                      valueField="value"
                      className={classes.selectGender}
                      showValidation={!gender && showErrorBox}
                      selectMenuClassName={classes.selectMenu}
                    />
                  </div>
                </Grid>
                <Grid item xs={4} className={classes.input}>
                  <Grid container spacing={4}>
                    <Grid item xs={4}>
                      <div className={classes.seriChar}>
                        <DropDownList
                          options={[
                            { value: "الف", text: "الف" },
                            { value: "ب", text: "ب" },
                            { value: "ج", text: "ج" },
                            { value: "د", text: "د" },
                            { value: "ی", text: "ی" },
                          ]}
                          value={seriChar}
                          onChange={(e) => setSeriChar(e.target.value)}
                          name="SeriChar"
                          label="حرف سریال شناسنامه"
                          textField="text"
                          valueField="value"
                          selectMenuClassName={classes.selectMenu}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className={classes.SeriNumber}>
                        <Input
                          name="SeriNumber"
                          label="کد سریال شناسنامه   "
                          className={classes.textField}
                          onChange={(e) => setSeriNumber(e.target.value)}
                          error={seriNumber === "" || notValidSeriNumber}
                          inputClassName={classes.inputClassName}
                          value={seriNumber}
                          type="number"
                          showValidation={
                            (!seriNumber || notValidSeriNumber) && showErrorBox
                          }
                          validation={
                            notValidSeriNumber && "حداکثر دو رقم مجاز ست."
                          }
                        ></Input>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <Input
                        name="ُerialNumber"
                        label="کد سریال شناسنامه   "
                        className={classes.textField}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        error={serialNumber === ""}
                        inputClassName={classes.inputClassName}
                        value={serialNumber}
                        type="number"
                      ></Input>
                      {showSeriErrorBox && (
                        <span className={classes.error}>
                          فیلدهای مشخصات شناسنامه الزامی است.
                        </span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <br />
                <br /> */}
            <Grid item xs={12}>
              <SubmitBoxWizard
                previousWizard="/sejam"
                nextWizard={saveProfileInfoStep}
              />
            </Grid>
            {/* </CardContent>
            </Card> */}
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
  connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)
);
