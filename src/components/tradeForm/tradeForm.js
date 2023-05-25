import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../UI/Input/Input";
import TradeInput from "../UI/tradeInput/tradeInput";
import Button from "../UI/Button/Button";
import DropDownList from "../UI/DropDownList/DropDownList";
import Checkbox from "../UI/checkbox/checkbox";
import DatePicker from "../UI/DatePicker/DatePicker";
import { comma, getOptions } from "../../shared/utility";
import clsx from "clsx";
import Link from "../UI/Link/Link";
import ExpandMoreIcon from "../UI/icons/expandMore";
import WalletIcon from "../UI/icons/wallet";
import PropertyAmountModal from "../propertyAmountModal/propertyAmountModal";
import TseOmsService from "../../services/tseOmsService";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import OrderValidityTypes from "../../enums/orderValidityTypes";
import OrderPaymentGateways from "../../enums/orderPaymentGateways";
import { useForm, Controller } from "react-hook-form";
import Calculator from "../calculator/calculator";
import useDevice from "../../hooks/useDevice";
import TseOnlineGroup from "../../services/tseOnlineGroup";
import OptionIcon from "../UI/icons/option";
import CalculatorIcon from "../UI/icons/calculator";
import NumKeyboard from "../UI/numKeyboard/numKeyboard";
// import Slider from "@material-ui/core/Slider";
import ArrowIcon from "../UI/icons/arrow";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "row",
    textAlign: "right",
    padding: theme.spacing(4),
    paddingTop: 15,
  },
  price: {
    width: "100%",
  },
  validityContainer: {
    flexDirection: "row",
  },
  validityItem: {
    flexGrow: 1,
    flexBasis: "50%",
  },
  creditInput: {
    padding: "9px 14px",
  },
  send: {
    textAlign: "left",
    padding: theme.spacing(4),
  },
  orderBtn: {
    height: 38,
  },
  outlinedBtnBuy: {
    color: theme.palette.color.blue,
    border: `1px solid ${theme.palette.color.blue}`,
  },
  outlinedBtnSell: {
    color: theme.palette.color.red,
    border: `1px solid ${theme.palette.color.red}`,
  },
  property: {
    textAlign: "right",
    color: theme.palette.text.secondary,
    justifyContent: "space-between",
  },
  propertyAmount: {
    fontSize: 12,
    transition: "0.3s",
  },
  arrowBtn: {
    flexWrap: "nowrap",
    height: "100%",
  },
  inputWidth: {
    width: "100%",
    display: "flex",
  },
  emptyGrid: {
    height: 54,
  },
  more: {
    color: theme.palette.text.primary,
    padding: 7,
    fontSize: 10,
    display: "flex",
  },
  open: {
    transform: "rotate(-90deg)",
  },
  close: {
    transform: "rotate(90deg)",
  },
  textField: {
    margin: `2px 0`,
  },
  buyPower: {
    flexWrap: "nowrap",
    cursor: "pointer",
    "&:hover": {
      "& $iconBuyPower": {
        fill: theme.palette.primary.main,
      },
      color: theme.palette.primary.main,
    },
  },
  buyPowerAmount: {
    flexDirection: "column",
  },
  iconBuyPower: {
    margin: `auto ${theme.spacing(2)}px`,
  },
  expandMore: {
    height: 16,
  },
  visible: {
    display: "block",
  },
  hidden: {
    display: "none",
  },
  form: {
    margin: "auto",
  },
  labelCheckbox: {
    fontSize: 11,
  },
  checkbox: {
    margin: 0,
  },
  calculator: {
    height: 38,
    width: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  outlinedBtnDraft: {
    color: theme.palette.color.yellow,
    border: `1px solid ${theme.palette.color.yellow}`,
  },
  rowMobile: {
    flexDirection: "column",
    paddingTop: 0,
    paddingBottom: 0,
  },
  textFieldMobile: {
    margin: 0,
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
  },
  btnMobile: {
    height: 48,
    borderRadius: 8,
    boxShadow: "none",
    minWidth: "auto",
    "&:hover": {
      boxShadow: "none",
    },
  },
  outlinedBtnBuyMobile: {
    color: "#FFF",
    backgroundColor: theme.palette.color.blue,
    "&:hover": {
      backgroundColor: theme.palette.color.blue,
    },
  },
  outlinedBtnSellMobile: {
    color: "#FFF",
    backgroundColor: theme.palette.color.red,
    "&:hover": {
      backgroundColor: theme.palette.color.red,
    },
  },
  outlinedBtnDraftMobile: {
    color: "#FFF",
    backgroundColor: theme.palette.color.yellow,
    "&:hover": {
      backgroundColor: theme.palette.color.yellow,
    },
  },
  optionIcon: {
    fill: "#FFF",
  },
  calculatorIcon: {
    fill: "#FFF",
  },
  moreBtnMobile: {
    backgroundColor: `${theme.palette.text.secondary}77`,
    "&:hover": {
      backgroundColor: `${theme.palette.text.secondary}77`,
    },
  },
  actionBtn: {
    position: "sticky",
    bottom: 0,
    zIndex: 4,
    backgroundColor: theme.palette.background.box,
  },
  slider: {
    width: "100%",
    padding: "0px 10px",
  },
  sliderRoot: {
    height: 5,
  },
  sliderRail: {
    height: 5,
    borderRadius: 4,
  },
  sliderTrack: {
    height: 5,
    borderRadius: 4,
  },
  sliderThumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
  },

  textFieldContainer: {
    flexWrap: "nowrap",
  },
  actionHorizontal: {
    flexWrap: "nowrap",
  },
  rootHorizontal: {
    flexWrap: "nowrap",
    padding: 4,
  },
  orderBtnHorizontal: {
    minWidth: 80,
  },
  orderValidityTypeInput: {
    order: 1,
  },
  orderPaymentGatewayInput: {
    order: 2,
  },
  orderValidityDateInput: {
    order: 1,
  },
  horizontalUnderCaution: {
    order: 2,
    whiteSpace: "nowrap",
    fontSize: 10,
    color: theme.palette.text.secondary,
  },
  horizontalEmptyGrid: {
    order: 3,
  },
}));

const TradeForm = ({ order, ...props }) => {
  const classes = useStyles();
  const device = useDevice();

  const [dateVisible, setDateVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [propertyModalIsOpen, setPropertyModalIsOpen] = useState(false);
  const [calculatorIsOpen, setCalculatorIsOpen] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [isDividedOrder, setIsDivideOrder] = useState(false);

  const initialState = { OrderValidityType: OrderValidityTypes.Day.value };
  if (props.side === "buy")
    initialState.OrderPaymentGateway = OrderPaymentGateways.BrokerAccount.value;
  const { register, handleSubmit, errors, control, setValue, getValues } =
    useForm({
      defaultValues: order || initialState,
    });

  useEffect(() => {
    if (
      order &&
      order.OrderValidityType === OrderValidityTypes.ValidTillDate.value
    ) {
      setDateVisible(true);
    }
  }, []);

  const validityTypeChangeHandler = (event, props) => {
    props.onChange(event.target.value);
    if (event.target.value === OrderValidityTypes.ValidTillDate.value) {
      setDateVisible(true);
    } else {
      setDateVisible(false);
    }
  };

  const formatInt = (value) => {
    if (typeof value === "number") return value;
    if (value) return parseInt(value.replaceAll(",", ""));
    return null;
  };

  const prepareFormData = (formData) => {
    if (formData.OrderValidityDate)
      formData.OrderValidityDate = formData.OrderValidityDate._d;
    formData.Price = formatInt(formData.Price);
    formData.Quantity = formatInt(formData.Quantity);
    formData.DisclosedQuantity = formatInt(formData.DisclosedQuantity);
    return formData;
  };

  const orderHandler = (formData) => {
    if (!props.instrument) {
      props.notifyError("نماد انتخاب نشده است");
      return;
    }
    formData = prepareFormData(formData);
    if (order) {
      if (!isDraft)
        TseOmsService.updateOrder({ ...order, ...formData }, (status, data) => {
          if (data?.Success) props.notifySuccess(data.Message);
          else props.notifyError(data.Message);
        });
      else
        TseOmsService.updateDraftOrder(
          { ...order, ...formData },
          (status, data) => {
            if (data?.Success) {
              props.notifySuccess(data.Message);
              props.fetchDraftOrders();
            } else props.notifyError(data.Message);
          }
        );
    } else {
      formData.Isin = props.instrument.Isin;
      formData.OrderSide = props.side === "buy" ? 1 : 2;
      if (isDividedOrder)
        formData.MultipleOrderQuantities = getMultipleOrderQuantities();

      if (props.ipo)
        TseOmsService.registerIpoOrder(formData, (status, data) => {
          if (data?.Success) props.notifySuccess(data.Message);
          else props.notifyError(data.Message);
        });
      else if (isDraft)
        TseOmsService.registerDraftOrder(formData, (status, data) => {
          if (data?.Success) {
            props.notifySuccess(data.Message);
            props.fetchDraftOrders();
          } else props.notifyError(data.Message);
        });
      else if (props.onlineGroup) {
        if (props.accountNumber) {
          formData.AccountNumber = props.accountNumber;
          TseOnlineGroup.registerOnlineGroupOrder(formData, (status, data) => {
            if (data?.Success) props.notifySuccess(data.Message);
            else props.notifyError(data.Message);
          });
        } else props.notifyError("مشتری انتخاب نشده است");
      } else {
        TseOmsService.registerOrder(formData, (status, data) => {
          if (data?.Success) props.notifySuccess(data.Message);
          else props.notifyError(data.Message);
        });
      }
    }
    setIsDraft(false);
  };

  const draftHandler = () => {
    setIsDraft(true);
    handleSubmit(orderHandler);
  };

  const propertyAmountModalToggle = () => {
    setPropertyModalIsOpen(!propertyModalIsOpen);
  };

  const divideOrderHandler = (state) => {
    setIsDivideOrder(state);
  };

  const getMultipleOrderQuantities = () => {
    const maxQuantity = props.instrument?.MaximumOrderQuantity;
    const groups = Math.floor(getValues("Quantity") / maxQuantity);
    const remained = getValues("Quantity") - groups * maxQuantity;
    return [...[...Array(groups).keys()].map((g) => maxQuantity), remained];
  };

  const budgetChangeHandler = (e) => {
    const budget = parseInt(e.target.value);
    const rate = props.side === "buy" ? 0.00464 : 0.00575;
    const quantity = Math.floor(budget / (getValues("Price") * (1 + rate)));
    setValue("Quantity", comma(quantity));
  };

  const sectionVisible =
    !props.expandable || (props.expandable && expanded && !props.minimized);

  return (
    <form onSubmit={handleSubmit(orderHandler)}>
      <Grid
        container
        className={clsx(
          classes.root,
          device.isMobile && classes.rowMobile,
          props.horizontal && classes.rootHorizontal
        )}
        spacing={6}
      >
        <Grid
          item
          md={props.minimized ? 10 : 12}
          className={props.minimized ? classes.form : ""}
        >
          <Grid
            container
            spacing={device.isNotMobile ? 6 : 4}
            className={clsx(props.horizontal && classes.textFieldContainer)}
          >
            <Grid
              item
              xs={12}
              md={props.vertical || props.horizontal ? 12 : 6}
              className={clsx(
                classes.textField,
                device.isMobile && classes.textFieldMobile
              )}
            >
              <Grid container>
                <Grid item className={classes.inputWidth}>
                  <Controller
                    name="Price"
                    control={control}
                    as={TradeInput}
                    label="قیمت"
                    className={clsx(classes.price, "no-drag")}
                    type="price"
                    rules={{ required: true }}
                    min={props.instrument?.LowerStaticThreshold}
                    max={props.instrument?.UpperStaticThreshold}
                    instrumentId={props.instrument?.InstrumentId}
                    lastTradePrice={props.instrument?.LastTradePrice}
                    orderSide={props.side === "buy" ? 1 : 2}
                    ipo={props.ipo}
                    error={!!errors.Price}
                    helperText="قیمت الزامی است"
                  ></Controller>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={props.vertical || props.horizontal ? 12 : 6}
              className={clsx(
                classes.textField,
                device.isMobile && classes.textFieldMobile
              )}
            >
              <Grid container>
                <Grid item className={classes.inputWidth}>
                  <Controller
                    name="Quantity"
                    control={control}
                    as={TradeInput}
                    label="تعداد"
                    className={clsx(classes.price, "no-drag")}
                    type="quantity"
                    rules={{ required: true }}
                    min={props.instrument?.MinimumOrderQuantity}
                    max={props.instrument?.MaximumOrderQuantity}
                    onDivideOrder={divideOrderHandler}
                    ipo={props.ipo}
                    error={!!errors.Quantity}
                    helperText="تعداد الزامی است"
                  ></Controller>
                </Grid>
              </Grid>
            </Grid>
            {device.isMobile && (
              <Grid
                item
                xs={12}
                md={props.vertical || props.horizontal ? 12 : 6}
                className={clsx(
                  classes.textField,
                  device.isMobile && classes.textFieldMobile
                )}
              >
                <Grid container>
                  <Grid item className={classes.inputWidth}>
                    <Calculator onBudgetChange={budgetChangeHandler} />
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid
              item
              xs={6}
              md={props.vertical ? 12 : props.horizontal ? 9 : 6}
              className={clsx(
                classes.textField,
                sectionVisible & !props.ipo ? classes.visible : classes.hidden,
                device.isMobile && classes.textFieldMobile
              )}
            >
              <Input
                ref={register}
                name="DisclosedQuantity"
                label="حجم نمایشی"
                className={clsx(classes.price, "no-drag")}
                thousandSeparator
                defaultValue=""
              ></Input>
            </Grid>
            <Grid
              item
              xs={6}
              md={props.vertical ? 12 : props.horizontal ? 9 : 6}
              className={clsx(
                classes.textField,
                sectionVisible & (props.side === "buy")
                  ? classes.visible
                  : classes.hidden,
                device.isMobile && classes.textFieldMobile,
                props.horizontal && classes.orderPaymentGatewayInput
              )}
            >
              <Controller
                control={control}
                name="OrderPaymentGateway"
                render={(props) => (
                  <DropDownList
                    className="no-drag"
                    label="محل اعتبار"
                    textField="text"
                    valueField="value"
                    options={getOptions(OrderPaymentGateways)}
                    value={props.value}
                    onChange={(event) => props.onChange(event.target.value)}
                  />
                )}
              ></Controller>
            </Grid>
            <Grid
              item
              xs={6}
              md={props.vertical ? 12 : props.horizontal ? 9 : 6}
              className={clsx(
                !props.horizontal && classes.validityItem,
                classes.textField,
                sectionVisible & !props.ipo ? classes.visible : classes.hidden,
                device.isMobile && classes.textFieldMobile,
                props.horizontal && classes.orderValidityTypeInput
              )}
            >
              <Controller
                control={control}
                name="OrderValidityType"
                render={(props) => (
                  <DropDownList
                    className="no-drag"
                    label="اعتبار سفارش"
                    textField="text"
                    valueField="value"
                    options={getOptions(OrderValidityTypes)}
                    value={props.value}
                    onChange={(event) =>
                      validityTypeChangeHandler(event, props)
                    }
                  />
                )}
              ></Controller>
            </Grid>
            <Grid
              item
              xs={6}
              md={props.minimized ? 2 : props.horizontal ? 9 : 12}
              className={clsx(
                !props.horizontal && classes.validityItem,
                classes.textField,
                sectionVisible & !props.ipo && dateVisible
                  ? classes.visible
                  : classes.hidden,
                device.isMobile && classes.textFieldMobile,
                props.horizontal && classes.orderValidityDateInput
              )}
            >
              <Controller
                control={control}
                name="OrderValidityDate"
                as={<DatePicker className="no-drag" label="تاریخ"></DatePicker>}
              ></Controller>
            </Grid>
            {props.side === "sell" && !props.expandable && (
              <Grid
                item
                md={props.vertical ? 12 : props.horizontal ? 9 : 6}
                className={clsx(
                  classes.emptyGrid,
                  props.horizontal && classes.horizontalEmptyGrid
                )}
              ></Grid>
            )}
            {props.underCautionInstruments.some(
              (i) => i.Isin === props.instrument?.Isin
            ) && (
              <Grid
                item
                className={clsx(
                  props.horizontal && classes.horizontalUnderCaution
                )}
              >
                <Checkbox
                  ref={register({ required: true })}
                  label="شرایط نماد تحت احتیاط را می‌پذیرم"
                  name="underCaution"
                  labelClassName={classes.labelCheckbox}
                  className={classes.checkbox}
                  error={errors.underCaution}
                  helperText="تایید شرایط الزامی است"
                ></Checkbox>
              </Grid>
            )}
          </Grid>
        </Grid>
        {device.isMobile && (
          <Grid item>
            <NumKeyboard />
          </Grid>
        )}
        <Grid
          item
          md={props.minimized ? 2 : props.horizontal ? null : 12}
          className={clsx(
            !props.horizontal && classes.validityItem,
            classes.textField,
            device.isMobile && classes.actionBtn
          )}
        >
          <Grid
            container
            spacing={device.isMobile ? 3 : 4}
            className={classes.actionHorizontal}
          >
            {!props.minimized && device.isNotMobile && (
              <Grid item md={props.horizontal ? 12 : 6}>
                <Grid container className={classes.property}>
                  {props.expandable && (
                    <Grid item>
                      <Link
                        onClick={() => {
                          setExpanded(!expanded);
                        }}
                        className={classes.more}
                      >
                        <Grid item>تنظیمات پیشرفته</Grid>
                        <Grid item>
                          <ExpandMoreIcon
                            className={clsx(
                              expanded ? classes.close : classes.open,
                              classes.expandMore
                            )}
                          ></ExpandMoreIcon>
                        </Grid>
                      </Link>
                    </Grid>
                  )}
                  {!props.horizontal && (
                    <>
                      {calculatorIsOpen && (
                        <Calculator
                          open={calculatorIsOpen}
                          onClose={() => setCalculatorIsOpen(!calculatorIsOpen)}
                          onBudgetChange={budgetChangeHandler}
                          // onSideChange={sideChangeHandler}
                        ></Calculator>
                      )}
                      <Grid item className={classes.calculator}>
                        <Link
                          tooltipPlacement="bottom"
                          title="ماشین حساب"
                          onClick={() => setCalculatorIsOpen(!calculatorIsOpen)}
                        >
                          <CalculatorIcon></CalculatorIcon>
                        </Link>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            )}
            {/* {!props.horizontal && ( */}
            <>
              <Grid
                item
                xs={5}
                md={props.minimized || props.horizontal ? 12 : 3}
              >
                {!props.isDraftEdit && (
                  <Button
                    type="submit"
                    variant={device.isNotMobile ? "outlined" : null}
                    fullWidth={true}
                    className={clsx(
                      classes.orderBtn,
                      props.side === "buy"
                        ? device.isNotMobile
                          ? classes.outlinedBtnBuy
                          : classes.outlinedBtnBuyMobile
                        : device.isNotMobile
                        ? classes.outlinedBtnSell
                        : classes.outlinedBtnSellMobile,
                      device.isMobile && classes.btnMobile,
                      props.horizontal && classes.orderBtnHorizontal
                    )}
                  >
                    {props.side === "buy" ? "خرید" : "فروش"}
                  </Button>
                )}
              </Grid>
              {!props.minimized && (
                <Grid item xs={3} md={props.horizontal ? 12 : 3}>
                  <Button
                    type="submit"
                    variant={device.isNotMobile ? "outlined" : null}
                    fullWidth={true}
                    onClick={draftHandler}
                    className={clsx(
                      classes.orderBtn,
                      device.isNotMobile
                        ? classes.outlinedBtnDraft
                        : classes.outlinedBtnDraftMobile,
                      device.isMobile && classes.btnMobile,
                      props.horizontal && classes.orderBtnHorizontal
                    )}
                  >
                    {props.isDraftEdit ? "ذخیره" : "پیش‌نویس"}
                  </Button>
                </Grid>
              )}
            </>
            {device.isMobile && (
              <>
                <Grid item xs={2}>
                  <Button
                    fullWidth={true}
                    onClick={() => {
                      setExpanded(!expanded);
                    }}
                    className={clsx(
                      classes.orderBtn,
                      device.isMobile && classes.moreBtnMobile,
                      device.isMobile && classes.btnMobile
                    )}
                  >
                    <OptionIcon className={classes.optionIcon} />
                  </Button>
                </Grid>
              </>
            )}
            {device.isMobile && (
              <>
                <Grid item xs={2}>
                  <Button
                    fullWidth={true}
                    onClick={() => props.onClose(props.id)}
                    className={clsx(
                      classes.orderBtn,
                      device.isMobile && classes.moreBtnMobile,
                      device.isMobile && classes.btnMobile
                    )}
                  >
                    <ArrowIcon className={classes.optionIcon} />
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    accountState: state.tseOms.accountState,
    underCautionInstruments: state.tseOms.underCautionInstruments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
    fetchDraftOrders: () => dispatch(actions.fetchDraftOrders()),
  };
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(TradeForm)
);
