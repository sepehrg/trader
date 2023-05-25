import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../services/appContext";
import SejamService from "../../services/sejamService";
import stepLevel from "../../enums/step";
import Input from "../../components/UI/Input/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SubmitBoxWizard from "./submitBoxWizard/submitBoxWizard";

import DropDownList from "../../components/UI/DropDownList/DropDownList";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
  },
  root: {
    width: "100%",

    height: "100%",
  },
  textField: {
    // backgroundColor: "#fff",
    // marginTop: theme.spacing(13),
    // width: "100%",
  },
  level: {
    // marginTop: theme.spacing(13),
    // width: "100%",
  },
  inputClassName: {
    height: 46,
  },
  title: {
    // textAlign: "center",
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
    marginTop: 2,
    fontSize: 11,
    color: theme.palette.text.secondary,
  },
}));

const FinancialInfo = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const [id, setId] = useState(0);
  const [assetValue, setAssetValue] = useState(null);
  const [incomeAverage, setIncomeAverage] = useState(null);
  const [tradingExchange, setTradingExchange] = useState(null);
  const [commodityExchange, setCommodityExchange] = useState(null);
  const [abroadExchange, setAbroadExchange] = useState(null);
  const [tradingKnowledgeLevelData, setTradingKnowledgeLevelData] = useState(
    []
  );
  const [tradingKnowledgeLevel, setTradingKnowledgeLevel] = useState(0);
  const [transactionLevelData, setTransactionLevelData] = useState([]);
  const [transactionLevel, setTransactionLevel] = useState(0);
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [resultData, sertResult] = useState({});
  const [financial, setFinancial] = useState({});
  const unknownError = "خطایی رخ داده است";
  const addOrUpdateFinancialInfo = async (params) => {
    let resultData = false;
    if (params.Id) {
      await SejamService.updateFinancialInfo(params, (success, result) => {
        if (result && result.Success) {
          resultData = result.Success;
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      });
    } else {
      await SejamService.saveFinancialInfo(params, (success, result) => {
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
      window.location.pathname = stepLevel.sejam.url;
    }
  };
  const saveFinancialInfoStep = async (e) => {
    e.preventDefault();

    if (
      !assetValue ||
      !incomeAverage ||
      !tradingKnowledgeLevel ||
      !transactionLevel
    ) {
      setShowErrorBox(true);
      return;
    }

    dispatch({
      type: "isLoding",
      payload: true,
    });

    var paramsData = {
      Id: id,
      AssetValue: assetValue * 1,
      IncomeAverage: incomeAverage * 1,
      TradingExchange: tradingExchange * 1,
      CommodityExchange: commodityExchange * 1,
      AbroadExchange: abroadExchange * 1,
      TradingKnowledgeLevel: tradingKnowledgeLevel,
      TransactionLevel: transactionLevel,
    };

    dispatch({
      type: "userSavedStepData",
      payload: { ...state.userSavedStepData, Financial: paramsData },
    });

    await addOrUpdateFinancialInfo(paramsData);

    dispatch({
      type: "isLoding",
      payload: false,
    });
  };
  const getTradingKnowledgeLevels = async (parentId, regionTypeId) => {
    await SejamService.getTradingKnowledgeLevels((status, data) => {
      if (data && data.Success) {
        setTradingKnowledgeLevelData(data.Result);
      } else {
        props.handleError(data && data.Message ? data.Message : unknownError);
      }
    });
  };
  const getTransactionLevels = async (parentId, regionTypeId) => {
    await SejamService.getTransactionLevels((status, data) => {
      if (data && data.Success) {
        setTransactionLevelData(data.Result);
      } else {
        props.handleError(data && data.Message ? data.Message : unknownError);
      }
    });
  };

  useEffect(() => {
    var financialData = {};

    async function fetchData() {
      dispatch({
        type: "isLoding",
        payload: true,
      });

      await getTradingKnowledgeLevels();
      await getTransactionLevels();

      if (
        state.userSavedStepData.Financial &&
        state.userSavedStepData.Financial.Id
      ) {
        financialData = state.userSavedStepData.Financial;
      } else {
        financialData = financial;
        await SejamService.getFinancialInfo((status, data) => {
          financialData = data.Result;
        });
      }

      dispatch({
        type: "isLoding",
        payload: false,
      });
    }

    fetchData().then(() => {
      if (financialData) {
        dispatch({
          type: "userSavedStepData",
          payload: { ...state.userSavedStepData, Financial: financialData },
        });

        setId(financialData.Id);
        setAssetValue(financialData.AssetValue);
        setIncomeAverage(financialData.IncomeAverage);
        setTradingExchange(financialData.TradingExchange);
        setCommodityExchange(financialData.CommodityExchange);
        setAbroadExchange(financialData.AbroadExchange);
        setTradingKnowledgeLevel(financialData.TradingKnowledgeLevel);
        setTransactionLevel(financialData.TransactionLevel);
      }
    });

    dispatch({
      type: "stepWizard",
      payload: stepLevel.financial.id,
    });
  }, []);
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
                  <Input
                    name="AssetValue"
                    label="ارزش دارایی های تحت مالکیت شما"
                    className={classes.textField}
                    onChange={(e) => setAssetValue(e.target.value)}
                    error={assetValue === ""}
                    inputClassName={classes.inputClassName}
                    value={assetValue}
                    // type="number"
                    showValidation={!assetValue && showErrorBox}
                    endAdornment={<div className={classes.adornment}>ریال</div>}
                    thousandSeparator
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="IncomeAverage"
                    label="متوسط درآمد ماهیانه شما"
                    className={classes.textField}
                    onChange={(e) => setIncomeAverage(e.target.value)}
                    error={incomeAverage === ""}
                    inputClassName={classes.inputClassName}
                    value={incomeAverage}
                    // type="number"
                    showValidation={!incomeAverage && showErrorBox}
                    endAdornment={<div className={classes.adornment}>ریال</div>}
                    thousandSeparator
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="TradingExchange"
                    label="مبلغ ریالی بورس اوراق بهادار و فرابورس"
                    className={classes.textField}
                    onChange={(e) => setTradingExchange(e.target.value)}
                    //   error={tradingExchange === ""}
                    inputClassName={classes.inputClassName}
                    value={tradingExchange}
                    // type="number"
                    endAdornment={<div className={classes.adornment}>ریال</div>}
                    thousandSeparator
                  ></Input>
                </Grid>

                <Grid item xs={4}>
                  <Input
                    name="CommodityExchange"
                    label=" مبلغ ریالی بورس کالا"
                    className={classes.textField}
                    onChange={(e) => setCommodityExchange(e.target.value)}
                    //error={commodityExchange === ""}
                    inputClassName={classes.inputClassName}
                    value={commodityExchange}
                    // type="number"
                    endAdornment={<div className={classes.adornment}>ریال</div>}
                    thousandSeparator
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="AbroadExchange"
                    label="مبلغ ریالی بورس های خارج از کشور  "
                    className={classes.textField}
                    onChange={(e) => setAbroadExchange(e.target.value)}
                    //error={abroadExchange === ""}
                    inputClassName={classes.inputClassName}
                    value={abroadExchange}
                    // type="number"
                    endAdornment={<div className={classes.adornment}>ریال</div>}
                    thousandSeparator
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.level}>
                    <DropDownList
                      options={tradingKnowledgeLevelData}
                      value={tradingKnowledgeLevel}
                      onChange={(e) => setTradingKnowledgeLevel(e.target.value)}
                      name="TradingKnowledgeLevel"
                      label=" میزان آشنایی با بورس و مفاهیم مالی"
                      textField="Title"
                      valueField="Id"
                      showValidation={!tradingKnowledgeLevel && showErrorBox}
                      selectMenuClassName={classes.selectMenu}
                    />
                  </div>
                </Grid>

                <Grid item xs={4}>
                  <div className={classes.level}>
                    <DropDownList
                      options={transactionLevelData}
                      value={transactionLevel}
                      onChange={(e) => setTransactionLevel(e.target.value)}
                      name="TransactionLevel"
                      label="  پیش بینی سطح معاملات شما طی یکسال "
                      textField="Title"
                      valueField="Id"
                      showValidation={!transactionLevel && showErrorBox}
                      selectMenuClassName={classes.selectMenu}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <SubmitBoxWizard
                  previousWizard="/main/sejam/bank"
                  nextWizard={saveFinancialInfoStep}
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
  connect(mapStateToProps, mapDispatchToProps)(FinancialInfo)
);
