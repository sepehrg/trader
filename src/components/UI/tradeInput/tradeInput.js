import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "../../UI/Link/Link";
import Input from "../../UI/Input/Input";
import MessageTypes from "../../../enums/messageTypes";
import Components from "../../../enums/components";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import TradeAdornment from "./tradeAdornment/tradeAdornment";
import { comma } from "../../../shared/utility";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  infoItem: {
    // flexDirection: "column",
    justifyContent: "space-around",
    width: "auto",
    margin: "0 5px",
    fontSize: 10,
    minWidth: 40,
  },
  adornmentMobile: {
    backgroundColor: `${theme.palette.icon.primary}77`,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    marginRight: 7,
    height: 21,
    justifyContent: "center",
    color: "#FFF",
    fontSize: 13,
  },
  infoItemMobile: {
    width: 118,
    height: 48,
    marginTop: "auto",
  },
}));

const TradeInput = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const device = useDevice();
  const { type, instrumentId, lastTradePrice, subscribe, unsubscribe } = props;

  const [value, setValue] = useState(props.value);
  // const [dividedOrder, setDividedOrder] = useState(false);
  const [lockToLast, setLockToLast] = useState(null);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    return () => {
      if (type === "price") {
        unsubscribe(instrumentId, MessageTypes.BidAsk, Components.PriceInput);
      }
    };
  }, [type, instrumentId, unsubscribe]); // on component unmount

  useEffect(() => {
    if (type === "price" && lockToLast !== null) {
      if (lockToLast) {
        setValue(lastTradePrice);
        subscribe(instrumentId, MessageTypes.BidAsk, Components.PriceInput);
      } else {
        unsubscribe(instrumentId, MessageTypes.BidAsk, Components.PriceInput);
      }
    }
  }, [lockToLast, type, instrumentId, subscribe, unsubscribe, lastTradePrice]); // on lockToLast change

  useEffect(() => {
    if (props.min) setMin(props.min);
    if (props.max) setMax(props.max);
  }, [props.min, props.max]);

  useEffect(() => {
    if (type === "price" && props.staticThreshold) {
      setMin(props.staticThreshold.LowerStaticThreshold);
      setMax(props.staticThreshold.UpperStaticThreshold);
    }
  }, [props.staticThreshold]);

  const lockToLastHandler = () => {
    setLockToLast(!lockToLast);
  };

  const changeHandler = (e) => {
    props.onChange(e.target.value);
    setValue(e.target.value);
  };

  const increaseOneHandler = () => {
    if (value < max) {
      props.onChange(+value + 1);
      setValue(+value + 1);
    }
  };

  const decreaseOneHandler = () => {
    if (value > min) {
      props.onChange(+value - 1);
      setValue(+value - 1);
    }
  };

  const setMaxHandler = () => {
    props.onChange(props.max);
    setValue(props.max);
  };

  const setMinHandler = () => {
    props.onChange(props.min);
    setValue(props.min);
  };

  return (
    <>
      <Input
        ref={ref}
        name={props.name}
        label={props.label}
        className={props.className}
        onChange={changeHandler}
        thousandSeparator
        // value={value}
        value={props.value}
        error={props.error}
        helperText={props.helperText}
        endAdornment={
          <TradeAdornment
            instrumentId={instrumentId}
            orderSide={props.orderSide}
            // onIncreaseOne={increaseOneHandler}
            // onDecreaseOne={decreaseOneHandler}
            // max={max}
            // min={min}
            // onSetMax={setMaxHandler}
            // onSetMin={setMinHandler}
            onDivideOrder={props.onDivideOrder}
            onLockToLast={lockToLastHandler}
            lockToLast={lockToLast}
            type={props.type}
            onValueChange={(value) => setValue(value)}
            // hideThreshold={props.hideThreshold}
          />
        }
      ></Input>
      <TradeAdornment
        instrumentId={instrumentId}
        orderSide={props.orderSide}
        // onDivideOrder={props.onDivideOrder}
        // onLockToLast={lockToLastHandler}
        // lockToLast={lockToLast}
        // type={props.type}
        onValueChange={(value) => setValue(value)}
        // hideThreshold={props.hideThreshold}
        // hideMinMax={true}
        max={max}
        min={min}
        onSetMax={setMaxHandler}
        onSetMin={setMinHandler}
      />
      {/* {props.hideThreshold && (
        <Grid
          container
          className={clsx(
            device.isNotMobile ? classes.infoItem : classes.infoItemMobile
          )}
        >
          <Grid item xs={12}>
            <Link
              tooltipPlacement="top"
              title={device.isNotMobile && "حداکثر"}
              onClick={setMaxHandler}
              className={clsx(device.isMobile && classes.adornmentMobile)}
            >
              {comma(max)}
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link
              tooltipPlacement="bottom"
              title={device.isNotMobile && "حداقل"}
              onClick={setMinHandler}
              className={clsx(device.isMobile && classes.adornmentMobile)}
            >
              {comma(min)}
            </Link>
          </Grid>
        </Grid>
      )} */}
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    staticThreshold: state.app.staticThreshold,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (messageType, instrumentId, component) =>
      dispatch(actions.subscribe(messageType, instrumentId, component)),
    unsubscribe: (messageType, instrumentId, component) =>
      dispatch(actions.unsubscribe(messageType, instrumentId, component)),
  };
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    TradeInput
  ),
  (prevProps, nextProps) =>
    nextProps.InstrumentId === prevProps.InstrumentId &&
    nextProps.staticThreshold?.InstrumentId !==
      prevProps.staticThreshold?.InstrumentId
);
