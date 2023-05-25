import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "../../UI/dialog/dialog";
import { comma, toJalaliDateTime } from "../../../shared/utility";
import Grid from "@material-ui/core/Grid";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import DropDownList from "../../UI/DropDownList/DropDownList";
import Radio from "../../UI/radio/radio";
import TseCfaService from "../../../services/tseCfaService";
import TseBofService from "../../../services/tseBofService";
import Skeleton from "@material-ui/lab/Skeleton";
import useDevice from "../../../hooks/useDevice";
import ActionDrawer from "../../UI/actionDrawer/actionDrawer";
import clsx from "clsx";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    flexDirection: "column",
  },
  row1: {
    alignItems: "center",
  },
  datesContainer: {
    flexDirection: "column",
  },
  priceLabel: {
    fontSize: 12,
    marginRight: 50,
  },
  datePriceContainer: {
    flexDirection: "column",
  },
  priceContainer: {
    // flexDirection: "column",
    // alignContent: "space-between",
  },
  datesItem: {
    flexGrow: 2,
  },
  priceItem: {
    flexGrow: 1,
  },
  date: {
    direction: "ltr",
  },
  description: {
    width: "100%",
  },
  inputLabel: {
    transform: "translate(-14px, 8px) scale(1)",
  },
  priceInput: {},
  descriptionRow: {
    padding: "10px 0",
  },
  radioLabelDate: {
    minWidth: 80,
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
  },
  actionBtn: {
    minWidth: 130,
  },
  currency: {
    color: theme.palette.text.secondary,
    fontSize: 11,
    paddingLeft: 11,
    paddingRight: 5,
  },
  Amount: {
    display: "flex",
    flexWrap: "nowrap",
  },

  btnMobile: {
    fontSize: 14,
    height: 40,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
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
  radioLabelDateMobile: {
    justifyContent: "space-between",
  },
  formControlLabelRootMobile: {
    margin: "0 0 10px 0",
    minHeight: 50,
  },
}));

const NewRequest = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const [bankAccounts, setBankAccounts] = useState(null);
  const [settlementBalances, setSettlementBalances] = useState(null);
  const [settlementOptions, setSettlementOptions] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getBankAccountInfos();
    getSettlementBalance();
  }, []);

  const getBankAccountInfos = () => {
    TseCfaService.getBankAccountInfos((status, data) => {
      if (data.length > 0) setBankAccounts(data);
    });
  };

  const getSettlementBalance = () => {
    TseCfaService.getSettlementBalance((status, data) => {
      if (data) {
        const settlements = Object.keys(data).map((key) => {
          return {
            PaymentDay: data[key].PaymentDay,
            PaymentDate: data[key].BalanceDate,
            Amount: data[key].Balance,
          };
        });
        setSettlementBalances(settlements);
        const options = settlements.map((item) => {
          return {
            label: getSettlementLabel(item),
            value: item.PaymentDay,
          };
        });
        setSettlementOptions(options);
      }
    });
  };

  useEffect(() => {
    if (settlementBalances) {
      formData.PaymentDay = settlementBalances[0].PaymentDay;
      formData.Amount = settlementBalances[0].Amount;
      formData.PaymentDate = settlementBalances[0].PaymentDate;
    }
  }, [settlementBalances]);

  useEffect(() => {
    if (bankAccounts) {
      formData.BankAccountId = bankAccounts[0].value;
    }
  }, [bankAccounts]);

  const submitHandler = (event) => {
    event.preventDefault();
    TseBofService.addPaymentRequest(formData, (status, data) => {
      if (data?.Success) {
        props.notifySuccess(data.Message);
        props.onClose();
      } else props.notifyError(data.Message);
    });
  };

  const dateRadioChangeHandler = (event) => {
    const data = settlementBalances.filter(
      (item) => item.PaymentDay === event.target.value
    )[0];
    setFormData({ ...formData, ...data });
  };

  const bankAccountChangeHandler = (event) => {
    setFormData({ ...formData, BankAccountId: event.target.value });
  };

  const amountChangeHandler = (event) => {
    setFormData({ ...formData, Amount: parseInt(event.target.value) });
  };

  const getSettlementLabel = (item) => (
    <Grid
      container
      className={clsx(device.isMobile && classes.radioLabelDateMobile)}
    >
      <Grid item className={clsx(device.isNotMobile && classes.radioLabelDate)}>
        {toJalaliDateTime(item.PaymentDate).split(" ")[0]}
      </Grid>
      <Grid item className={classes.Amount}>
        {comma(item.Amount)}
        <div className={classes.currency}>ریال</div>
      </Grid>
    </Grid>
  );

  const drawerActions = [
    {
      title: "تایید",
      onClick: submitHandler,
      className: clsx(classes.btnMobile, classes.acceptBtnMobile),
    },
    {
      title: "انصراف",
      onClick: props.onClose,
      className: clsx(classes.btnMobile, classes.cancelBtnMobile),
    },
  ];

  const addNewForm = (
    <>
      <Grid item>
        <Grid container className={classes.row1} spacing={6}>
          <Grid item className={classes.datesItem} sm={6} xs={12}>
            <Grid container className={classes.datesContainer}>
              {device.isNotMobile && (
                <Grid item className={classes.priceLabel}>
                  <Grid container>
                    <Grid item className={classes.radioLabelDate}>
                      تاریخ
                    </Grid>
                    <Grid item>مبلغ (ریال)</Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <Grid container className={classes.datePriceContainer}>
                  {settlementOptions ? (
                    <Radio
                      options={settlementOptions}
                      value={formData.PaymentDay ? formData.PaymentDay : 1}
                      onChange={dateRadioChangeHandler}
                      formControlLabelRootClassName={clsx(
                        device.isMobile && classes.formControlLabelRootMobile
                      )}
                    ></Radio>
                  ) : (
                    [...Array(3).keys()].map((i) => (
                      <Skeleton
                        key={i}
                        animation="wave"
                        variant="text"
                        height={35}
                      />
                    ))
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.priceItem} sm={6} xs={12}>
            <Grid container spacing={8} className={classes.priceContainer}>
              <Grid item sm={12} xs={6}>
                <Input
                  required
                  label="مبلغ"
                  thousandSeparator
                  className={classes.priceInput}
                  value={formData.Amount ? comma(formData.Amount) : 0}
                  onChange={amountChangeHandler}
                  endAdornment={<div className={classes.currency}>ریال</div>}
                ></Input>
              </Grid>
              <Grid item sm={12} xs={6}>
                <DropDownList
                  required
                  label="حساب بانکی"
                  textField="BankTitle"
                  valueField="Id"
                  className={classes.dropdownlist}
                  options={bankAccounts}
                  onChange={bankAccountChangeHandler}
                  value={formData.BankAccountId ? formData.BankAccountId : ""}
                  inputLabelOutlined={classes.inputLabel}
                ></DropDownList>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.descriptionRow}>
        <Input
          label="توضیحات"
          className={classes.description}
          value={formData.Description ? formData.Description : ""}
          onChange={(e) =>
            setFormData({ ...formData, Description: e.target.value })
          }
        ></Input>
      </Grid>
    </>
  );

  return (
    <>
      {device.isNotMobile ? (
        <Dialog
          title="پرداخت جدید"
          open={props.open}
          onClose={props.onClose}
          fullWidth
          maxWidth="sm"
        >
          <form onSubmit={submitHandler}>
            <Grid container className={classes.root} spacing={6}>
              {addNewForm}
              <Grid item className={classes.action}>
                <Button
                  type="submit"
                  variant="outlined"
                  className={classes.actionBtn}
                >
                  تایید
                </Button>
              </Grid>
            </Grid>
          </form>
        </Dialog>
      ) : (
        <ActionDrawer
          title="فیلتر پرداخت الکترونیک"
          open={props.open}
          onClose={props.onClose}
          onOpen={props.onClose}
          actions={drawerActions}
        >
          <form onSubmit={submitHandler}>
            <Grid container className={classes.root} spacing={6}>
              {addNewForm}
            </Grid>
          </form>
        </ActionDrawer>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
  };
};

export default connect(null, mapDispatchToProps)(NewRequest);
