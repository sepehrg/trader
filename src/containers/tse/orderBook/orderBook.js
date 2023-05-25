import React, { useEffect, useState, useReducer, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  toJalaliDateTime,
  toJalaliDate,
  comma,
  updateObject,
} from "../../../shared/utility";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TradeStatus from "../../../components/ordersTable/tradeStatus/tradeStatus";
import InfoIcon from "../../../components/UI/icons/info";
import Table from "../../../components/UI/Table/Table";
import TseOmsService from "../../../services/tseOmsService";
import Button from "../../../components/UI/Button/Button";
import DateFilter from "../../../components/UI/dateFilter/dateFilter";
import InstrumentLookup from "../../../components/UI/instrumentLookup/instrumentLookup";
import Dialog from "../../../components/UI/dialog/dialog";
import OrderInfoModal from "../../../components/ordersTable/orderInfoModal/orderInfoModal";
import NotebookIcon from "../../../components/UI/icons/notebook";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";
import SearchIcon from "../../../components/UI/icons/search";
import Input from "../../../components/UI/Input/Input";
import DropDownList from "../../../components/UI/DropDownList/DropDownList";
import OrderBookItem from "./orderBookItem/orderBookItem";
import Chip from "../../../components/UI/chip/chip";
import Link from "../../../components/UI/Link/Link";
import FilterIcon from "../../../components/UI/icons/filter";
import Spinner from "../../../components/UI/spinner/spinner";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import Tour from "../../../components/UI/tour/tour";
import steps from "../../../enums/tourSteps";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    height: "100%",
    padding: 10,
    flexFlow: "nowrap",
  },
  header: {
    padding: 10,
    display: "flex",
    // alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginRight: 5,
    paddingTop: 4,
    whiteSpace: "nowrap",
  },
  forScroll: {
    height: "calc(100% - 62px - 48px)",
    overflowY: "scroll",
  },
  table: {
    borderCollapse: "collapse",
    flexWrap: "nowrap",
    "& td, & $th": {
      border: "none",
      fontSize: "inherit",
    },
    "& th": {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.default,
    },
    "& thead, & tbody tr": {
      width: "100%",
    },
  },
  tableRow: {
    backgroundColor: theme.palette.background.box,
    // borderBottom: `3px solid ${theme.palette.background.default}`,
    // transition: "0.3s",
    height: 39,
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.paper,
    },
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },
  tableRowMobile: {
    backgroundColor: theme.palette.background.default,
  },
  date: {
    direction: "ltr",
  },
  filter: {
    padding: 12,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  searchBtn: {
    height: "100%",
    width: "100%",
    minWidth: 100,
    padding: 0,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  toolbarBtn: {
    margin: `auto 3px`,
    cursor: "pointer",
    "&:hover $toolbarIcon": {
      fill: theme.palette.primary.main,
    },
  },
  toolbarIcon: {
    height: 20,
    width: 20,
  },
  main: {
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  searchIcon: {
    fill: theme.palette.primary.main,
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  submit: {
    minWidth: 140,
    maxWidth: 200,
    height: 50,
    marginRight: "auto",
  },
  filterBtn: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
    fontSize: 11,
    marginRight: 10,
    "&:before": {
      content: "''",
      width: 2,
      height: 25,
      backgroundColor: theme.palette.border.secondary,
      display: "flex",
      marginLeft: 15,
    },
  },
  containerFilter: {
    display: "flex",
  },
  dialogContent: {
    padding: 16,
  },

  rootMobile: {
    padding: 0,
  },
  scrollMobile: {
    height: "100%",
    overflow: "hidden scroll",
    padding: 10,
  },
  filterMobile: {
    height: 42,
  },
  filterInnerMobile: {
    backgroundColor: theme.palette.background.box,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    padding: "0px 10px",
    flexWrap: "nowrap",
  },
  filterChip: {
    margin: "auto",
    display: "flex",
  },
  filterChipMobile: {
    alignItems: "center",
    display: "flex",
    overflow: "auto hidden",
    flexWrap: "nowrap",
  },
  filterBtnMobile: {
    alignItems: "center",
    display: "flex",
    flexWrap: "nowrap",
    fontSize: 12,
  },
  acceptBtnMobile: {
    backgroundColor: theme.palette.color.blue,
    fontSize: 14,
    height: 40,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: theme.palette.color.blue,
    },
  },
  cancelBtnMobile: {
    backgroundColor: theme.palette.color.red,
    fontSize: 14,
    height: 40,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: theme.palette.color.red,
    },
  },
  dialogContentMobile: {
    padding: "0 16px 28px 16px",
  },
  tableMobile: {
    "& td": {
      padding: "0 !important",
    },
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  fullHeight: {
    height: "100%",
  },
  box: {
    height: "100%",
    padding: "0 8px 8px 8px",
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    flexDirection: "column",
  },
  boxMobile: {
    flexDirection: "column",
  },
}));

const OrderBook = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const scroller = useRef();

  const [isFetching, setIsFetching] = useInfiniteScroll(getOrders, scroller);
  const [doneFetching, setDoneFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState("");
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [orders, setOrders] = useState({ Result: [] });

  const pageSize = Math.round(
    device.isNotMobile
      ? (window.innerHeight - (70 + 20 + 44 + 62 + 36 + 52 + 15)) / 43
      : (window.innerHeight - (45 + 26 + 45 + 48)) / 99
  );

  const initialState = {
    take: pageSize,
    page: 1,
    startDate: new Date(new Date().setDate(new Date().getDate() - 31)),
    endDate: new Date(),
    instrument: null,
    price: "",
    quantity: "",
    orderSideId: "",
    orderStatusId: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "take":
        return updateObject(state, {
          take: action.take,
        });
      case "page":
        return updateObject(state, {
          page: action.page,
        });
      case "startDate":
        return updateObject(state, {
          startDate: action.startDate,
        });
      case "endDate":
        return updateObject(state, {
          endDate: action.endDate,
        });
      case "instrument":
        return updateObject(state, {
          instrument: action.instrument,
        });
      case "price":
        return updateObject(state, {
          price: action.price,
        });
      case "quantity":
        return updateObject(state, {
          quantity: action.quantity,
        });
      case "orderSideId":
        return updateObject(state, {
          orderSideId: action.orderSideId,
        });
      case "orderStatusId":
        return updateObject(state, {
          orderStatusId: action.orderStatusId,
        });
      case "reset":
        return initialState;
    }
  };
  const [filter, dispatch] = useReducer(reducer, initialState);

  const orderInfoModalToggle = (row) => {
    setInfoModalIsOpen(!infoModalIsOpen);
    setCurrentOrderId(row.Id);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    getOrders();
    setFilterModalIsOpen(false);
  };

  function getOrders() {
    if (!doneFetching) {
      const request = {
        optionalFilter: {
          take: filter.take,
          page: device.isNotMobile
            ? filter.page
            : orders.Result.length / filter.take + 1,
        },
        reportFilter: {
          dateFilter: {
            startDate: filter.startDate,
            endDate: filter.endDate,
          },
          searchItem: [],
        },
      };

      if (filter.instrument)
        request.reportFilter.searchItem.push({
          property: "isin",
          value: filter.instrument.Isin,
          operation: 0,
        });

      if (filter.price)
        request.reportFilter.searchItem.push({
          property: "price",
          value: filter.price,
          operation: 0,
        });

      if (filter.quantity)
        request.reportFilter.searchItem.push({
          property: "quantity",
          value: filter.quantity,
          operation: 0,
        });

      if (filter.orderSideId)
        request.reportFilter.searchItem.push({
          property: "orderSideId",
          value: filter.orderSideId,
          operation: 0,
        });

      if (filter.orderStatusId)
        request.reportFilter.searchItem.push({
          property: "orderStatusId",
          value: filter.orderStatusId,
          operation: 0,
        });

      setIsLoading(true);
      TseOmsService.getOrderBookInfos(request, (status, data) => {
        setIsLoading(false);
        if (data?.Success) {
          if (device.isNotMobile) setOrders(data);
          else {
            setOrders({
              Result: [...orders.Result, ...data.Result],
              TotalRecords: data.TotalRecords,
            });
            if (data.Result.length === data.TotalRecords) setDoneFetching(true);
          }
          setIsFetching(false);
          setIsLoading(false);
        }
      });
    }
  }

  const dateChangeHandler = (event, name) => {
    dispatch({ type: name, [name]: event._d });
  };

  const instrumentChangeHandler = (instrument) => {
    dispatch({ type: "instrument", instrument });
  };

  const searchItemChangeHandler = (e) => {
    dispatch({ type: e.target.name, [e.target.name]: e.target.value });
  };

  const pageChangeHandler = (page) => {
    dispatch({ type: "page", page });
  };

  const rowsPerPageChangeHandler = (take) => {
    dispatch({ type: "take", take });
  };

  useEffect(() => {
    getOrders();
  }, [filter.take, filter.page]);

  const formatDate = (date) => {
    return <div className={classes.date}>{toJalaliDateTime(date)}</div>;
  };

  const orderStates = [
    { value: 1, text: "پیش‌نویس" },
    { value: 2, text: "ذخیره شده" },
    { value: 4, text: "ارسال شده به هسته" },
    { value: 8, text: "در صف" },
    { value: 16, text: "خطا" },
    { value: 32, text: "لغو شده" },
    { value: 64, text: "قسمتی معامله شده" },
    { value: 128, text: "معامله کامل" },
    { value: 256, text: "حذف شده توسط هسته معاملات" },
    { value: 512, text: "حذف معامله توسط ناظر" },
    { value: 1024, text: "حذف برای اتمام اعتبار پایان روز" },
    { value: 2048, text: "اجرا و حذف فوری" },
  ];

  const schema = {
    columns: [
      {
        field: "EntryDate",
        title: "تاریخ",
        format: (value) => formatDate(value),
      },
      {
        field: "TrackingNumber",
        title: "کد پیگیری",
      },
      {
        field: "InstrumentPersianCode",
        title: "نماد",
      },
      {
        field: "OrderPaymentGatewayTitle",
        title: "محل تامین اعتبار",
      },
      {
        field: "Price",
        title: "قیمت",
        format: (value) => comma(value),
      },
      {
        field: "Quantity",
        title: "تعداد",
        format: (value) => comma(value),
      },
      {
        field: "DisclosedQuantity",
        title: "حجم نمایشی",
        format: (value) => comma(value),
      },
      {
        field: "RemainingQuantity",
        title: "حجم باقیمانده",
        format: (value) => comma(value),
      },
      {
        field: "OrderSideTitle",
        title: "طرف سفارش",
      },
      {
        field: "OrderValidityType",
        title: "اعتبار",
      },
      {
        field: "TradedQuantity",
        title: "تعداد معامله شده",
        format: (value, quantity, remaining) => comma(quantity - remaining),
        additionals: ["Quantity", "RemainingQuantity"],
      },
      {
        field: "PureAmount",
        title: "ارزش خالص",
        format: (value, quantity, price) => comma(quantity * price),
        additionals: ["Quantity", "Price"],
      },
      {
        field: "TotalAmount",
        title: "ارزش ناخالص",
        format: (value, quantity, price) => comma(quantity * price),
        additionals: ["Quantity", "Price"],
      },
      {
        field: "OrderStatusId",
        title: "وضعیت",
        format: (value, orderStatusTitle) => (
          <TradeStatus status={value} title={orderStatusTitle}></TradeStatus>
        ),
        additionals: ["OrderStatusTitle"],
      },
    ],
    operations: [
      {
        title: "اطلاعات سفارش",
        icon: <InfoIcon className={classes.operationsIcon} />,
        action: (row) => orderInfoModalToggle(row),
      },
    ],
  };

  const filterClose = () => {
    setFilterModalIsOpen(false);
  };

  const filterClear = () => {
    dispatch({ type: "reset" });
    setFilterModalIsOpen(false);
  };

  const dialogActions = [
    {
      title: "اعمال فیلتر",
      onClick: submitHandler,
      className: classes.acceptBtnMobile,
    },
    {
      title: "حذف فیلترها و بستن",
      onClick: filterClear,
      className: classes.cancelBtnMobile,
    },
  ];

  const deleteHandler = (field) => {
    dispatch({ type: field, [field]: "" });
    getOrders();
  };

  const openFilterModal = () => {
    setFilterModalIsOpen(true);
  };

  const chips = (
    <>
      <Chip
        label={"از: " + toJalaliDate(filter.startDate)}
        onClick={() => setFilterModalIsOpen(true)}
      />
      <Chip
        label={"تا: " + toJalaliDate(filter.endDate)}
        onClick={() => setFilterModalIsOpen(true)}
      />
      {filter.instrument && (
        <Chip
          label={filter.instrument.PersianCode}
          onClick={() => setFilterModalIsOpen(true)}
          onDelete={() => deleteHandler("instrument")}
        />
      )}
      {filter.orderSideId && (
        <Chip
          label={filter.orderSideId === 1 ? "خرید" : "فروش"}
          onClick={() => setFilterModalIsOpen(true)}
          onDelete={() => deleteHandler("orderSideId")}
        />
      )}
      {filter.orderStatusId && (
        <Chip
          label={orderStates[Math.log(filter.orderStatusId) / Math.log(2)].text}
          onClick={() => setFilterModalIsOpen(true)}
          onDelete={() => deleteHandler("orderStatusId")}
        />
      )}
      {filter.price && (
        <Chip
          label={"قیمت: " + filter.price}
          onClick={() => setFilterModalIsOpen(true)}
          onDelete={() => deleteHandler("price")}
        />
      )}
      {filter.quantity && (
        <Chip
          label={"تعداد: " + filter.quantity}
          onClick={() => setFilterModalIsOpen(true)}
          onDelete={() => deleteHandler("quantity")}
        />
      )}
    </>
  );

  return (
    <>
      <Grid
        container
        className={clsx(classes.root, device.isMobile && classes.rootMobile)}
      >
        <Grid
          item
          className={clsx(device.isNotMobile && classes.fullHeight)}
          data-tour="orderBook"
        >
          <Grid
            container
            className={clsx(
              device.isNotMobile ? classes.box : classes.boxMobile
            )}
          >
            <Dialog
              title="فیلتر دفتر سفارشات"
              open={filterModalIsOpen}
              onClose={filterClose}
              dialogActions={device.isMobile && dialogActions}
              fullWidth
              maxWidth="xs"
            >
              <Grid
                item
                className={clsx(
                  device.isMobile
                    ? classes.dialogContentMobile
                    : classes.dialogContent
                )}
              >
                <form onSubmit={submitHandler}>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <InstrumentLookup
                        onInstrumentChange={instrumentChangeHandler}
                        value=""
                        label="جستجوی نماد"
                      ></InstrumentLookup>
                    </Grid>
                    <Grid item xs={12}>
                      <DateFilter
                        onStartDateChange={dateChangeHandler}
                        onEndDateChange={dateChangeHandler}
                        startDate={filter.startDate}
                        endDate={filter.endDate}
                        input
                      ></DateFilter>
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        name="price"
                        label="قیمت"
                        onChange={searchItemChangeHandler}
                        value={filter.price}
                      ></Input>
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        name="quantity"
                        label="تعداد"
                        onChange={searchItemChangeHandler}
                        value={filter.quantity}
                      ></Input>
                    </Grid>
                    <Grid item xs={6}>
                      <DropDownList
                        label="طرف سفارش"
                        name="orderSideId"
                        options={[
                          { value: 1, text: "خرید" },
                          { value: 2, text: "فروش" },
                        ]}
                        textField="text"
                        valueField="value"
                        value={filter.orderSideId}
                        onChange={searchItemChangeHandler}
                      ></DropDownList>
                    </Grid>
                    <Grid item xs={6}>
                      <DropDownList
                        label="وضعیت سفارش"
                        name="orderStatusId"
                        options={orderStates}
                        textField="text"
                        valueField="value"
                        value={filter.orderStatusId}
                        onChange={searchItemChangeHandler}
                      ></DropDownList>
                    </Grid>
                    {device.isNotMobile && (
                      <Grid item className={classes.submit}>
                        <Button
                          type="submit"
                          variant="outlined"
                          className={classes.searchBtn}
                        >
                          <SearchIcon className={classes.searchIcon} />
                          جستجو
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </form>
              </Grid>
            </Dialog>
            {device.isNotMobile && (
              <>
                <Grid item>
                  <Grid container className={classes.main}>
                    <Grid item className={classes.header}>
                      <NotebookIcon className={classes.icon}></NotebookIcon>
                      <Typography variant="h2" className={classes.title}>
                        دفتر سفارشات
                      </Typography>
                    </Grid>
                    <Grid item className={classes.containerFilter}>
                      <Grid container>
                        <Grid item className={classes.filterChip}>
                          {chips}
                        </Grid>
                        <Grid item className={classes.filterBtn}>
                          <Link onClick={() => setFilterModalIsOpen(true)}>
                            فیلتر
                            <FilterIcon className={classes.searchIcon} />
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}

            {infoModalIsOpen && device.isNotMobile && (
              <Dialog
                title="اطلاعات سفارش"
                open={infoModalIsOpen}
                onClose={() => setInfoModalIsOpen(!infoModalIsOpen)}
                maxWidth="md"
              >
                <OrderInfoModal orderId={currentOrderId} />
              </Dialog>
            )}
            {device.isMobile && (
              <>
                {/* <Dialog
            title="فیلتر دفتر سفارشات"
            open={filterModalIsOpen}
            onClose={filterClose}
            dialogActions={dialogActions}
          >
            <Grid item className={classes.dialogContent}>
              <form onSubmit={submitHandler}>{searchForm}</form>
            </Grid>
          </Dialog> */}
                <Grid item className={classes.filterMobile}>
                  <Grid
                    container
                    className={classes.filterInnerMobile}
                    spacing={6}
                  >
                    <Grid item className={classes.filterBtnMobile} xs={2}>
                      <Link onClick={openFilterModal}>
                        <Grid
                          container
                          className={classes.filterBtnMobile}
                          spacing={2}
                        >
                          <Grid item>
                            <FilterIcon />
                          </Grid>
                          <Grid item className={classes.filterBtnMobile}>
                            فیلتر
                          </Grid>
                        </Grid>
                      </Link>
                    </Grid>
                    <Grid item xs={10} className={classes.filterChipMobile}>
                      {chips}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            {device.isNotMobile ? (
              <Grid item className={classes.forScroll}>
                <Table
                  className={classes.table}
                  rowClassName={classes.tableRow}
                  schema={schema}
                  data={orders.Result}
                  totalRecords={orders.TotalRecords}
                  loading={isLoading}
                  paging
                  rowsPerPage={filter.take}
                  onPageChange={pageChangeHandler}
                  onRowsPerPageChange={rowsPerPageChangeHandler}
                  pageSize={pageSize}
                ></Table>
              </Grid>
            ) : (
              <Grid item className={classes.scrollMobile} ref={scroller}>
                {orders.Result?.map((item) => (
                  <OrderBookItem data={item} key={item.Id} />
                ))}
                <div className={classes.spinner}>
                  {doneFetching ? (
                    <span>پایان لیست</span>
                  ) : (
                    (isLoading || isFetching) && <Spinner size={40} />
                  )}
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Tour
        steps={steps.orderBook}
        isOpen={props.isTourOpen}
        onRequestClose={() => props.setIsTourOpen(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isTourOpen: state.app.isTourOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsTourOpen: (state) => dispatch(actions.setIsTourOpen(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);
