import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Modal from "../UI/modal/modal";
import { comma } from "../../shared/utility";
// import Radio from "../UI/radio/radio";
import Input from "../UI/Input/Input";
import useDevice from "../../hooks/useDevice";
import CalculatorIcon from "../UI/icons/calculator";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    padding: `${theme.spacing(8)}px ${theme.spacing(5)}px`,
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 11,
    marginBottom: 20,
  },
  icon: {
    fill: `${theme.palette.text.secondary}66`,
  },
}));

const Calculator = (props) => {
  const classes = useStyles();
  const device = useDevice();

  // const [side, setSide] = useState("1");

  // const sideOptions = [
  //   { label: "خرید", value: "1" },
  //   { label: "فروش", value: "2" },
  // ];

  // const sideChangeHandler = (e) => {
  //   setSide(e.target.value);
  //   props.onSideChange(+e.target.value);
  // };

  const calculatorInput = (
    <Input
      name="budget"
      label={device.isNotMobile ? "سرمایه" : "ماشین حساب"}
      placeholder={device.isMobile ? "سرمایه خود را وارد نمایید": ""}
      thousandSeparator
      onChange={props.onBudgetChange}
      startAdornment={
        device.isMobile && <CalculatorIcon className={classes.icon} />
      }
    ></Input>
  );

  return (
    <>
      {device.isNotMobile ? (
        <Modal
          open={props.open}
          onClose={props.onClose}
          title="لطفا سرمایه را وارد نمایید"
          hideMove
          hideMinimize
          top="40%"
          left="60%"
        >
          <Grid container className={classes.root}>
            <Grid item className={classes.title}>
              قدرت خرید: {comma(props.accountState?.BuyCeiling)} ریال
            </Grid>
            {/* <Grid item>
          <Radio
            options={sideOptions}
            value={side}
            onChange={sideChangeHandler}
            row
          ></Radio>
        </Grid> */}
            <Grid item>{calculatorInput}</Grid>
          </Grid>
        </Modal>
      ) : (
        calculatorInput
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accountState: state.tseOms.accountState,
  };
};

export default connect(mapStateToProps)(Calculator);
