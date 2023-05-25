import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EditIcon from "../UI/icons/edit";
import DeleteIcon from "../UI/icons/delete";
import Table from "../UI/Table/Table";
import TradeCount from "./tradeCount/tradeCount";
import TradeStatus from "./tradeStatus/tradeStatus";
import CopyIcon from "../UI/icons/copy";
import InfoIcon from "../UI/icons/info";
import clsx from "clsx";
import { comma, toJalaliDateTime, getOptions } from "../../shared/utility";
import TseOmsService from "../../services/tseOmsService";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import OrderInfoModal from "./orderInfoModal/orderInfoModal";
import Dialog from "../UI/dialog/dialog";
import OrderValidityTypes from "../../enums/orderValidityTypes";
import OrdersItem from "./ordersItem/ordersItem";
import useDevice from "../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    padding: `0 8px`,
  },
  item: {},
  table: {
    "& td, & th": {
      border: "none",
      fontSize: "inherit",
    },
    "& th": {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.box,
      color: theme.palette.text.secondary,
    },
  },
  tableRow: {
    backgroundColor: theme.palette.background.paper,
    // borderBottom: `4px solid ${theme.palette.background.box}`,
    // transition: "0.3s",
    height: 39,
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.box,
    },
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },
  operationsIcon: {
    width: 20,
    height: 20,
    margin: `0px ${theme.spacing(0.5)}px`,
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
  delete: {
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },
  paperWidthSm: {
    maxWidth: 740,
  },

  rootMobile: {
    height: "100%",
    overflow: "hidden scroll",
    padding: 0,
  },
  operationsIconMobile: {
    width: 28,
    height: 28,
    fill: theme.palette.primary.main,
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
  deleteMobile: {
    fill: theme.palette.color.red,
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },
}));

const OrdersTable = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const device = useDevice();

  const [currentOrderId, setCurrentOrderId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkedOrders, setCheckedOrders] = useState([]);

  useEffect(() => {
    if (props.showCheckbox) {
      // console.log(checkedOrders);
      cancelBatchOrder(checkedOrders);
    }
  }, [props.deleteClicked]);

  useEffect(() => {
    setLoading(true);
    props.fetchOrders(props.onlineGroup);
  }, [props.refreshClicked]);

  useEffect(() => {
    setLoading(false);
  }, [props.orders]);

  const orderInfoModalToggle = (row) => {
    setModalIsOpen(!modalIsOpen);
    setCurrentOrderId(row.Id);
  };

  const editOrder = (row) => {
    const order = getOrderFromRow(row, true);
    props.openTradeModal(row.Isin, row.OrderSideId - 1, order);
  };

  const copyOrder = (row) => {
    const order = getOrderFromRow(row, false);
    // console.log(order);
    TseOmsService.registerOrder(order, (status, data) => {
      if (status) {
        props.notifySuccess("سفارش ارسال شد");
      }
    });
  };

  const getOrderFromRow = (row, includeId) => {
    const order = {
      Price: row.Price,
      Quantity: row.Quantity,
      OrderPaymentGateway: row.OrderPaymentGatewayId,
      OrderValidityType: row.OrderValidityTypeId,
      OrderValidityDate: row.OrderValidityDate,
      DisclosedQuantity: row.DisclosedQuantity,
    };
    if (includeId) order.OrderId = row.Id;
    return order;
  };

  const cancelOrder = (row) => {
    const request = { OrderId: row.Id };
    TseOmsService.cancelOrder(request, (status, data) => {
      if (data.Success) props.notifySuccess("حذف سفارش ارسال شد");
    });
  };

  const cancelBatchOrder = (ids) => {
    if (ids.length > 0) {
      const request = { OrderId: ids };
      TseOmsService.cancelBatchOrder(request, (status, data) => {
        if (data.Success) props.notifySuccess("حذف سفارش ارسال شد");
      });
    } else props.notifyError("سفارشی انتخاب نشده است");
  };

  const formatEntryDate = (date) => {
    const jalaliDate = toJalaliDateTime(date);
    return (
      // <Tooltip placement="top" title={jalaliDate}>
      jalaliDate.split(" ")[1]
      // {/* </Tooltip> */}
    );
  };

  const formatValidityType = (orderValidityTypeId, orderValidityDate) => {
    let type = getOptions(OrderValidityTypes).filter(
      (type) => type.value === orderValidityTypeId
    )[0].text;
    if (orderValidityDate)
      type += "\n" + toJalaliDateTime(orderValidityDate).split(" ")[0];
    return type;
  };

  const schema = {
    columns: [
      {
        field: "Id",
        hide: true,
      },
      {
        field: "Customer",
        title: "مشتری",
        hide: !props.onlineGroup,
      },
      {
        field: "InstrumentPersianCode",
        title: "نماد",
      },
      {
        field: "Id",
        title: "ردیف",
        format: (value) => comma(value),
      },
      {
        field: "OrderSideId",
        title: "طرف سفارش",
        format: (value) => (value === 1 ? "خرید" : "فروش"),
      },
      {
        field: "Price",
        title: "قیمت",
        format: (value) => comma(value),
      },
      {
        field: "Quantity",
        title: "تعداد معامله شده",
        format: (value, remainingQuantity) => (
          <TradeCount
            quantity={value}
            remainingQuantity={remainingQuantity}
          ></TradeCount>
        ),
        additionals: ["RemainingQuantity"],
      },
      {
        field: "OrderValidityTypeId",
        title: "اعتبار",
        format: (value, orderValidityDate) =>
          formatValidityType(value, orderValidityDate),
        additionals: ["OrderValidityDate"],
      },
      {
        field: "OrderPaymentGatewayTitle",
        title: "محل تامین اعتبار",
      },
      {
        field: "OrderBookTypeTitle",
        title: "نوع سفارش",
      },
      {
        field: "EntryDate",
        title: "زمان",
        format: (value) => formatEntryDate(value),
      },
      {
        field: "OrderStatusId",
        title: "وضعیت",
        format: (value) => <TradeStatus status={value}></TradeStatus>,
        width: 150,
      },
    ],
    operations: [
      {
        title: "ویرایش سفارش",
        icon: (
          <EditIcon
            className={clsx(
              classes.operationsIcon,
              device.isMobile && classes.operationsIconMobile
            )}
          />
        ),
        action: (row) => editOrder(row),
      },
      {
        title: "حذف سفارش",
        icon: (
          <DeleteIcon
            className={clsx(
              classes.operationsIcon,
              device.isMobile && classes.operationsIconMobile,
              device.isNotMobile ? classes.delete : classes.deleteMobile
            )}
          />
        ),
        tooltipColor: theme.palette.color.red,
        action: (row) => cancelOrder(row),
      },
      {
        title: "کپی از سفارش",
        icon: (
          <CopyIcon
            className={clsx(
              classes.operationsIcon,
              device.isMobile && classes.operationsIconMobile
            )}
          />
        ),
        action: (row) => copyOrder(row),
      },
      {
        title: "اطلاعات سفارش",
        icon: <InfoIcon className={classes.operationsIcon} />,
        action: (row) => orderInfoModalToggle(row),
      },
    ],
  };

  return (
    <Grid
      container
      className={clsx(classes.root, device.isMobile && classes.rootMobile)}
    >
      {modalIsOpen && (
        <Dialog
          title="اطلاعات سفارش"
          open={modalIsOpen}
          onClose={() => setModalIsOpen(!modalIsOpen)}
          maxWidth="md"
        >
          <OrderInfoModal orderId={currentOrderId} />
        </Dialog>
      )}

      {device.isNotMobile ? (
        <Grid item>
          <Table
            className={classes.table}
            rowClassName={classes.tableRow}
            data={props.orders}
            schema={schema}
            onCheckedItemsChange={setCheckedOrders}
            showCheckbox={props.showCheckbox}
            operationsWidth={150}
            loading={loading}
            highlight
          ></Table>
        </Grid>
      ) : (
        <Grid item>
          {props.orders?.map((item, i) => (
            <OrdersItem
              data={item}
              key={item.Id}
              formatValidityType={formatValidityType}
              orderInfoModalToggle={() => orderInfoModalToggle(item)}
              operations={schema.operations}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.tseOms.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openTradeModal: (isin, side, order) =>
      dispatch(actions.openTradeModal(isin, side, order)),
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
    fetchOrders: (type) => dispatch(actions.fetchOrders(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);
