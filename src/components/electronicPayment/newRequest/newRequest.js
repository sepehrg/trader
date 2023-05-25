import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "../../UI/dialog/dialog";
import Grid from "@material-ui/core/Grid";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import DropDownList from "../../UI/DropDownList/DropDownList";
import TseCfaService from "../../../services/tseCfaService";
import useDevice from "../../../hooks/useDevice";
import ActionDrawer from "../../UI/actionDrawer/actionDrawer";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    flexDirection: "column",
  },
  inputLabel: {
    transform: "translate(-14px, 8px) scale(1)",
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    minWidth: 200,
  },
  actionBtn: {
    minWidth: 130,
  },
  currency: {
    color: theme.palette.text.secondary,
    fontSize: 11,
    padding: "0 10px",
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
}));

const NewRequest = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const callBackUrl = process.env.REACT_APP_URL + "/tse/paymentResult";

  const [paymentGateways, setPaymentGateways] = useState([
    { BankTitle: "parsian", BankId: 1 },
  ]);
  const [formData, setFormData] = useState({
    callBackUrl,
  });
  const [amount, setAmount] = useState();

  useEffect(() => {
    getActivePayment();
  }, []);

  useEffect(() => {
    if (paymentGateways.length > 0)
      setFormData({ ...formData, bankAccountId: paymentGateways[0].BankId });
  }, [paymentGateways]);

  const getActivePayment = () => {
    TseCfaService.getActivePayment((status, data) => {
      if (data?.length > 0) setPaymentGateways(data);
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    TseCfaService.addTseElectronicPayment(formData, (status, data) => {
      if (data?.Success) props.onClose();
      else props.notifyError(data?.Message);
    });
  };

  const bankAccountChangeHandler = (event) => {
    setFormData({ ...formData, bankAccountId: event.target.value });
  };

  const amountChangeHandler = (event) => {
    setFormData({ ...formData, amount: event.target.value });
  };

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
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <Input
                  label="مبلغ"
                  value={formData.amount}
                  onChange={amountChangeHandler}
                  thousandSeparator
                  endAdornment={<div className={classes.currency}>ریال</div>}
                />
              </Grid>
              <Grid item xs={6}>
                <DropDownList
                  label="درگاه"
                  options={paymentGateways}
                  textField="BankTitle"
                  valueField="BankId"
                  value={formData.bankAccountId}
                  onChange={bankAccountChangeHandler}
                  inputLabelOutlined={classes.inputLabel}
                ></DropDownList>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
          title="درخواست پرداخت الکترونیک جدید"
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
    notifyError: (message) => dispatch(actions.notifyError(message)),
  };
};

export default connect(null, mapDispatchToProps)(NewRequest);
