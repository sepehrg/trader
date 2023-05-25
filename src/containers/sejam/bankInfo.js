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

import regionType from "../../enums/regionType";
import getRegionByType, { getRegionById } from "../../services/region";
// import Checkbox from "@material-ui/core/Checkbox";
import clsx from "clsx";
import TickIcon from "../../components/UI/icons/tick";
import Checkbox from "../../components/UI/checkbox/checkbox";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
const useStyles = makeStyles((theme) => ({
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
  textField: {
    // backgroundColor: "#fff",
    // marginTop: theme.spacing(13),
    // width: "100%",
  },
  inputClassName: {
    height: 46,
  },
  accountType: {
    // marginTop: theme.spacing(13),
  },
  shebaIR: {
    // marginTop: theme.spacing(18),
  },
  root: {
    width: "100%",

    height: "100%",
  },
  title: {
    textAlign: "center",
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
  adornment: {
    marginLeft: 10,
    marginTop: 8,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  inputMarginDense: {
    direction: "ltr",
  },
  labelCheckbox: {
    fontSize: 11,
  },
  checkbox: {
    margin: 0,
  },
}));

const BankInfo = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const [id, setId] = useState(0);
  const [bankData, setBankData] = useState([]);
  const [bankId, setBankId] = useState(0);
  const [provinceData, setProvinceData] = useState([]);
  const [branchProvinceId, setBranchProvinceId] = useState(0);
  const [cityData, setCityData] = useState([]);
  const [branchCityId, setBranchCityId] = useState(0);
  const [branchName, setBranchName] = useState(null);
  const [branchCode, setBranchCode] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);
  const [accountTypeData, setAccountTypeData] = useState([]);
  const [accountTypeId, setAccountTypeId] = useState(0);
  const [shebaNumber, setShebaNumber] = useState(null);
  const [isDefault, setIsDefault] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [notValidBranchName, setNotValidBranchName] = useState(false);
  const [notValidSheba, setNotValidSheba] = useState(false);

  const unknownError = "خطایی رخ داده است";
  function just_persian(str) {
    var p =
      /^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC\u06F0-\u06F9\u202C\u064B\u064C\u064E-\u0652\u0600-\u06FF\u0020\u2000-\u200F\u2028-\u202F\d+\d+-\d\d+-\d+s]+$/;
    if (!p.test(str)) {
      return false;
    }
  }
  const addOrUpdateBankInfo = async (params) => {
    let paramsListData = [];
    paramsListData.push(params);

    dispatch({
      type: "userSavedStepData",
      payload: { ...state.userSavedStepData, Accounts: paramsListData },
    });

    let resultData = false;
    if (params.Id) {
      //  result = await Api.updateBankInfo(state.user.access_token, params);

      await SejamService.updateBankInfo(params, (success, result) => {
        if (result && result.Success) {
          resultData = result.Success;
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      });
    } else {
      // result = await Api.saveBankInfo(state.user.access_token, paramsListData);
      await SejamService.saveBankInfo(paramsListData, (success, result) => {
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
      window.location.pathname = stepLevel.financial.url;
    }
  };
  const saveBankInfoStep = async (e) => {
    e.preventDefault();
    setNotValidBranchName(false);
    setNotValidSheba(false);
    if (
      !bankId ||
      !branchCityId ||
      !branchName ||
      !branchCode ||
      !accountNumber ||
      !accountTypeId ||
      !shebaNumber
    ) {
      setShowErrorBox(true);
      return;
    }
    function iso7064Mod97_10(iban) {
      var remainder = iban,
        block;

      while (remainder.length > 2) {
        block = remainder.slice(0, 9);
        remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
      }

      return parseInt(remainder, 10) % 97;
    }

    function validateSheba(str) {
      var pattern = /IR[0-9]{24}/;

      if (str.length !== 26) {
        return false;
      }

      if (!pattern.test(str)) {
        return false;
      }

      var newStr = str.substr(4);
      var d1 = str.charCodeAt(0) - 65 + 10;
      var d2 = str.charCodeAt(1) - 65 + 10;
      newStr += d1.toString() + d2.toString() + str.substr(2, 2);

      var remainder = iso7064Mod97_10(newStr);
      if (remainder !== 1) {
        return false;
      }

      return true;
    }

    if (branchName && just_persian(branchName) === false) {
      setShowErrorBox(true);
      setNotValidBranchName(true);
      return true;
    }
    if ("IR" + shebaNumber && validateSheba("IR" + shebaNumber) === false) {
      setShowErrorBox(true);
      setNotValidSheba(true);
      return true;
    }
    dispatch({
      type: "isLoding",
      payload: true,
    });

    var paramsData = {
      Id: id,
      BankId: bankId * 1,
      BranchProvinceId: branchProvinceId * 1,
      BranchCityId: branchCityId * 1,
      BranchName: branchName,
      BranchCode: branchCode * 1,
      AccountNumber: accountNumber * 1,
      AccountType: accountTypeId * 1,
      ShebaNumber: "IR" + shebaNumber,
      IsDefault: isDefault,
      InternationalAccountNumber: "1",
    };

    dispatch({
      type: "userSavedStepData",
      payload: { ...state.userSavedStepData, Accounts: paramsData },
    });

    await addOrUpdateBankInfo(paramsData);

    dispatch({
      type: "isLoding",
      payload: false,
    });
  };
  const getBankData = async () => {
    await SejamService.getBanks((status, data) => {
      if (data && data.Success) {
        setBankData(data.Result);
      } else {
        props.handleError(data && data.Message ? data.Message : unknownError);
      }
    });
  };

  const getAccountTypes = async () => {
    await SejamService.getAccountTypes((status, data) => {
      if (data && data.Success) {
        setAccountTypeData(data.Result);
      } else {
        props.handleError(data && data.Message ? data.Message : unknownError);
      }
    });
  };
  const getRegionByParentId = async (parentId, regionSelectedType) => {
    var regionData = await getRegionByType(
      state,
      dispatch,
      parentId,
      regionSelectedType
    );

    switch (regionSelectedType.EnTitle) {
      case regionType.Province.EnTitle:
        setProvinceData(regionData);
        return;
      case regionType.City.EnTitle:
        setCityData(regionData);
        if (regionData && regionData.length > 1) {
          setBranchCityId(regionData[0].Id);
        }

        return;
    }
  };
  const setRegionData = async (cityId) => {
    await getRegionById(cityId).then(async (city) => {
      if (city && city.ParentId) {
        await getRegionById(city.ParentId).then(async (province) => {
          await getRegionByParentId(province.ParentId, regionType.Province);
          if (province && province.Id) {
            await getRegionByParentId(province.Id, regionType.City);

            setBranchProvinceId(province.Id);
            setBranchCityId(cityId);
          }
        });
      }
    });
  };
  //   const getAccountsInfo = async () => {
  //     await CmdTseService.getAccountsInfo((status, data) => {
  //      setAccount(data.Result);
  //  });
  // }
  useEffect(() => {
    var accountData = {};
    async function fetchData() {
      dispatch({
        type: "isLoding",
        payload: true,
      });
      await getBankData();
      await getAccountTypes();
      // getRegionByParentId(2,regionType.Province)
      if (
        state.userSavedStepData.Accounts &&
        state.userSavedStepData.Accounts.length > 0
      ) {
        accountData = state.userSavedStepData.Accounts;
      } else {
        await SejamService.getAccountsInfo((status, data) => {
          accountData = data.Result;
        });
      }

      dispatch({
        type: "isLoding",
        payload: false,
      });
    }

    fetchData().then(() => {
      if (accountData) {
        let paramsListData = [];
        paramsListData.push(accountData);
        accountData = accountData[0];

        dispatch({
          type: "userSavedStepData",
          payload: { ...state.userSavedStepData, Accounts: accountData },
        });

        if (accountData) {
          setRegionData(accountData.BranchCityId);
          setId(accountData.Id);
          setBankId(accountData.BankId);
          setBranchProvinceId(accountData.BranchProvinceId);
          setBranchCityId(accountData.BranchCityId);
          setBranchName(accountData.BranchName);
          setBranchCode(accountData.BranchCode);
          setAccountNumber(accountData.AccountNumber);
          setAccountTypeId(accountData.AccountType);
          setShebaNumber(
            accountData.ShebaNumber
              ? accountData.ShebaNumber.substring(
                  2,
                  accountData.ShebaNumber.length
                )
              : accountData.ShebaNumber
          );
          setIsDefault(accountData.IsDefault);
        } else {
          getRegionByParentId(2, regionType.Province);
        }
      }
    });

    dispatch({
      type: "stepWizard",
      payload: stepLevel.bank.id,
    });
  }, []);
  const onChangeProvinceHandler = (event) => {
    setBranchProvinceId(event.target.value);
    getRegionByParentId(event.target.value, regionType.City);
  };
  const uncheckedIcon = (
    <div className={clsx(classes.checkboxIcon, classes.uncheckedIcon)}></div>
  );
  const checkedIcon = (
    <div className={clsx(classes.checkboxIcon, classes.checkedIcon)}>
      <TickIcon className={classes.checkedTickIcon}></TickIcon>
    </div>
  );
  const onChangeBranchName = (event) => {
    setBranchName(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) === false) {
      checkValidation = true;
    }
    setNotValidBranchName(checkValidation);
  };
  // console.log("baI", bankId);
  // console.log("baI", bankData);

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
                <Grid item xs={3}>
                  <DropDownList
                    options={bankData}
                    value={bankId}
                    onChange={(e) => setBankId(e.target.value)}
                    name="BankId"
                    label="نام بانک "
                    textField="Title"
                    valueField="Id"
                    showValidation={!bankId && showErrorBox}
                    selectMenuClassName={classes.selectMenu}
                  />
                </Grid>
                <Grid item xs={3}>
                  <DropDownList
                    options={provinceData}
                    value={branchProvinceId}
                    onChange={onChangeProvinceHandler}
                    name="Province"
                    label="استان شعبه حساب "
                    textField="Title"
                    valueField="Id"
                    showValidation={!branchProvinceId && showErrorBox}
                    selectMenuClassName={classes.selectMenu}
                  />
                </Grid>
                <Grid item xs={3}>
                  <DropDownList
                    options={cityData}
                    value={branchCityId}
                    onChange={(e) => setBranchCityId(e.target.value)}
                    name="BranchCity"
                    label="شهر شعبه حساب "
                    textField="Title"
                    valueField="Id"
                    selectMenuClassName={classes.selectMenu}
                  />
                </Grid>
                <Grid item xs={3}>
                  {/* <label
                    htmlFor=""
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      marginRight: "10px",
                    }}
                  >
                    حساب پیش فرض
                  </label> */}
                  <Checkbox
                    label="حساب پیش فرض"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    icon={uncheckedIcon}
                    checkedIcon={checkedIcon}
                    // classes={{
                    //   root: classes.checkboxRoot,
                    //   colorSecondary: classes.checkboxColorSecondary,
                    //   checked: classes.checkboxChecked,
                    //   colorPrimary: classes.checkboxColorPrimary,
                    // }}
                    labelClassName={classes.labelCheckbox}
                    className={classes.checkbox}
                  />
                </Grid>

                <Grid item xs={4}>
                  <div className={classes.accountType}>
                    <DropDownList
                      options={accountTypeData}
                      value={accountTypeId}
                      onChange={(e) => setAccountTypeId(e.target.value)}
                      name="AccountType"
                      label="نوع حساب بانکی "
                      textField="Title"
                      valueField="Id"
                      showValidation={!accountTypeId && showErrorBox}
                      selectMenuClassName={classes.selectMenu}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="AccountNumber"
                    label=" شماره حساب بانکی"
                    className={classes.textField}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    error={accountNumber === ""}
                    inputClassName={classes.inputClassName}
                    value={accountNumber}
                    type="number"
                    showValidation={!accountNumber && showErrorBox}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="BranchName"
                    label="نام شعبه بانک"
                    className={classes.textField}
                    onChange={onChangeBranchName}
                    error={branchName === "" || notValidBranchName}
                    inputClassName={classes.inputClassName}
                    value={branchName}
                    showValidation={
                      (!branchName || notValidBranchName) && showErrorBox
                    }
                    validation={notValidBranchName && "فارسی وارد کنید"}
                  ></Input>
                </Grid>

                <Grid item xs={4}>
                  <Input
                    name="BranchCode"
                    label=" کد شعبه بانک  "
                    className={classes.textField}
                    onChange={(e) => setBranchCode(e.target.value)}
                    error={branchCode === ""}
                    inputClassName={classes.inputClassName}
                    value={branchCode}
                    showValidation={!branchCode && showErrorBox}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="ShebaNumber"
                    label="شماره شبای بانکی  "
                    className={classes.textField}
                    onChange={(e) => setShebaNumber(e.target.value)}
                    error={shebaNumber === "" || notValidSheba}
                    inputClassName={classes.inputClassName}
                    value={shebaNumber}
                    showValidation={
                      (!shebaNumber || notValidSheba) && showErrorBox
                    }
                    validation={notValidSheba && "شماره شبا صحیح نیست"}
                    endAdornment={<div className={classes.adornment}>IR</div>}
                    inputMarginDense={classes.inputMarginDense}
                  ></Input>
                </Grid>
                {/* <div className={classes.shebaIR}>
                  <Typography variant="h6" component="h6">
                    IR
                  </Typography>
                </div> */}
              </Grid>
            </Grid>

            {/* <br />
            <br /> */}

            <Grid item xs={12}>
              <SubmitBoxWizard
                previousWizard="/main/sejam/job"
                nextWizard={saveBankInfoStep}
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
  connect(mapStateToProps, mapDispatchToProps)(BankInfo)
);
